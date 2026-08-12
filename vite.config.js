import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import site, { esMarcador } from './src/config/site.js'
import { seo, rutas, construirJsonLd } from './src/config/seo.js'
import { tema } from './src/config/theme.js'

/**
 * Plugin propio: todo el SEO se genera EN TIEMPO DE BUILD desde
 * src/config/site.js + src/config/seo.js. No hay meta escritos a mano.
 *
 * ⚠️ Trampa 15: los tokens de index.html usan __ENTRE_GUIONES__ y NO
 * %entre_porcentajes%, y se sustituyen con `transformIndexHtml` en
 * `order: 'pre'`.
 */
function pluginSeo() {
  const jsonLd = construirJsonLd()
  const themeColor = tema.colores.marca[700]

  const noscriptPixel = esMarcador(site.tracking.metaPixelId)
    ? ''
    : `<noscript><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${site.tracking.metaPixelId}&ev=PageView&noscript=1" /></noscript>`

  const reemplazos = {
    __LANG__: seo.lang,
    __TITULO__: seo.title,
    __DESCRIPCION__: seo.description,
    __NOMBRE__: site.nombre,
    __OG_TITULO__: seo.ogTitle,
    __OG_DESCRIPCION__: seo.ogDescription,
    __URL__: seo.url,
    __OG_IMAGE__: seo.ogImage,
    __OG_LOCALE__: seo.ogLocale,
    __THEME_COLOR__: themeColor,
    __CANONICAL__: seo.canonical ? `<link rel="canonical" href="${seo.canonical}" />` : '',
    __JSONLD__: JSON.stringify(jsonLd, null, 2),
    __PIXEL_NOSCRIPT__: noscriptPixel,
  }

  return {
    name: 'seo-mario-leon',

    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return Object.entries(reemplazos).reduce(
          (acc, [token, valor]) => acc.split(token).join(valor),
          html
        )
      },
    },

    generateBundle() {
      const base = seo.url.replace(/\/$/, '')
      const hoy = new Date().toISOString().slice(0, 10)

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: ['User-agent: *', 'Allow: /', '', `Sitemap: ${base}/sitemap.xml`, ''].join('\n'),
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...rutas.map((r) =>
            [
              '  <url>',
              `    <loc>${base}${r.ruta}</loc>`,
              `    <lastmod>${hoy}</lastmod>`,
              `    <changefreq>${r.frecuencia}</changefreq>`,
              `    <priority>${r.prioridad}</priority>`,
              '  </url>',
            ].join('\n')
          ),
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), pluginSeo()],
  build: {
    target: 'es2018',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/firebase') || id.includes('@firebase')) return 'firebase'
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion'))
            return 'motion'
          return undefined
        },
      },
    },
  },
})
