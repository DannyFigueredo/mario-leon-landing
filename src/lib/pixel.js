/**
 * 📊 MEDICIÓN DE CONVERSIONES — Meta Pixel y/o Google Ads.
 * ---------------------------------------------------------------------------
 * Cada rama va GUARDADA por la existencia de su ID: sin ID configurado en
 * src/config/site.js no se carga ningún script, no se pone ninguna cookie y no
 * se dispara ningún evento. Esto evita cargar rastreadores "vacíos" y evita
 * que la política de privacidad prometa algo que no ocurre.
 *
 * El evento que importa es `Lead`, y siempre va ETIQUETADO con su origen
 * (`whatsapp-hero`, `llamada-footer`, `whatsapp-servicio-iul`, `formulario`…)
 * para poder ver en el panel de anuncios qué CTA está trabajando.
 */
import site, { esMarcador } from '../config/site.js'

const plataforma = site.tracking.plataforma
const usaMeta =
  (plataforma === 'meta' || plataforma === 'ambas') &&
  !esMarcador(site.tracking.metaPixelId)
const usaGoogle =
  (plataforma === 'google' || plataforma === 'ambas') &&
  !esMarcador(site.tracking.googleAdsId)

let metaCargado = false
let googleCargado = false

/** ¿Hay alguna plataforma realmente configurada? */
export const trackingActivo = usaMeta || usaGoogle

function cargarMeta() {
  if (metaCargado || !usaMeta || typeof window === 'undefined') return
  metaCargado = true
  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */
  window.fbq('init', site.tracking.metaPixelId)
  window.fbq('track', 'PageView')
}

function cargarGoogle() {
  if (googleCargado || !usaGoogle || typeof window === 'undefined') return
  googleCargado = true
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${site.tracking.googleAdsId}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', site.tracking.googleAdsId)
}

/** Llamar una sola vez al arrancar la app. */
export function iniciarTracking() {
  cargarMeta()
  cargarGoogle()
}

/**
 * Dispara el evento de contacto cualificado.
 * @param {string} origen  ej. 'whatsapp-hero', 'llamada-barra', 'formulario'
 * @param {object} extra   datos adicionales (producto, idioma…)
 */
export function trackLead(origen, extra = {}) {
  const datos = { content_name: origen, origen, ...extra }

  if (usaMeta && typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', datos)
  }

  if (usaGoogle && typeof window !== 'undefined' && window.gtag) {
    const etiqueta = site.tracking.googleAdsLabel
    if (!esMarcador(etiqueta)) {
      window.gtag('event', 'conversion', {
        send_to: `${site.tracking.googleAdsId}/${etiqueta}`,
        ...datos,
      })
    }
    window.gtag('event', 'generate_lead', datos)
  }

  if (import.meta.env.DEV) {
    // En desarrollo no se dispara nada real: dejamos rastro en consola para
    // poder comprobar que cada CTA manda su origen correcto.
    console.info('[lead]', origen, extra, trackingActivo ? '' : '(sin tracking configurado)')
  }
}

export default { iniciarTracking, trackLead, trackingActivo }
