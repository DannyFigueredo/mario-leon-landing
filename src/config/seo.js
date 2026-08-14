/**
 * 🔎 SEO — se genera CON CÓDIGO en tiempo de build, no a mano.
 * ---------------------------------------------------------------------------
 * Lo consume el plugin de Vite (vite.config.js) para escribir los meta, el
 * Open Graph, la Twitter Card, el JSON-LD, robots.txt y sitemap.xml.
 *
 * ⚠️ ESTE NEGOCIO NO TIENE SEDE FÍSICA. Eso cambia el SEO respecto a un
 * negocio local:
 *   · NO se emite `address` en el JSON-LD. Declarar una dirección postal que
 *     no existe para "salir en el mapa" es publicar un dato falso.
 *   · `areaServed` es el país entero, no una ciudad.
 *   · El titular de la página no lleva ciudad: no hay SEO local que ganar.
 *
 * ⚠️ Todo campo que siga siendo un marcador se omite del JSON-LD, y no hay
 * `aggregateRating` porque no existen reseñas reales verificadas.
 */
import site, { esMarcador } from './site.js'
import t from '../i18n/es.js'

export const rutas = [
  { ruta: '/', prioridad: '1.0', frecuencia: 'weekly' },
  { ruta: '/privacidad', prioridad: '0.3', frecuencia: 'yearly' },
]

export const seo = {
  url: site.url,
  title: t.meta.title,
  description: t.meta.description,
  ogTitle: t.meta.ogTitle,
  ogDescription: t.meta.ogDescription,
  ogImage: `${site.url}/og-image.png`,
  ogLocale: t.ogLocale,
  lang: t.htmlLang,
  // `canonical` solo si la URL es la que de verdad sirve la página (dominio
  // propio / Vercel en `site.dominio`, o el proyecto de Firebase Hosting).
  canonical: site.urlConfirmada ? site.url : null,
}

/**
 * JSON-LD. Tipo `InsuranceAgency` (subtipo de FinancialService →
 * LocalBusiness), que es el más específico del rubro. Sin dirección postal.
 */
export function construirJsonLd() {
  const datos = {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: site.nombre,
    description: t.meta.description,
    slogan: t.slogan,
    knowsLanguage: ['es'],
    availableLanguage: ['Spanish'],
  }

  if (site.urlConfirmada) {
    datos.url = site.url
    datos.image = `${site.url}/og-image.png`
  }

  datos.telephone = site.telefonoE164
  if (!esMarcador(site.correo)) datos.email = site.correo

  // Sin sede física: se declara el país servido y nada más.
  datos.areaServed = {
    '@type': 'Country',
    name: site.paisNombre,
  }

  // Horario: solo si Mario lo confirmó.
  if (site.horario.confirmado) {
    datos.openingHoursSpecification = [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: site.horario.dias,
        opens: site.horario.abre,
        closes: site.horario.cierra,
      },
    ]
  }

  const redes = [site.redes.instagram, site.redes.facebook].filter((r) => !esMarcador(r))
  if (redes.length) datos.sameAs = redes

  datos.hasOfferCatalog = {
    '@type': 'OfferCatalog',
    name: t.servicios.titulo,
    itemListElement: site.productos.map((p) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: t.servicios.items[p.clave].nombre,
        description: t.servicios.items[p.clave].resumen,
      },
    })),
  }

  /* ─────────────────────────────────────────────────────────────────────
   * aggregateRating — DELIBERADAMENTE FUERA.
   *
   * Los testimonios de la página son de EJEMPLO. Publicar un rating
   * inventado en datos estructurados —y encima a nombre de una persona
   * real— es declarar reseñas que no existen.
   *
   * Para activarlo cuando haya reseñas reales y verificables:
   *
   *   datos.aggregateRating = {
   *     '@type': 'AggregateRating',
   *     ratingValue: '4.9',   // ← la media REAL
   *     reviewCount: '37',    // ← el número REAL de reseñas
   *     bestRating: '5',
   *   }
   *
   * Y pon `site.testimoniosSonEjemplo = false` en src/config/site.js.
   * ───────────────────────────────────────────────────────────────────── */

  return datos
}

export default seo
