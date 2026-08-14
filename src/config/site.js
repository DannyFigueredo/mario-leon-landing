/**
 * ⚙️ ARCHIVO #1 QUE TIENES QUE EDITAR
 * ---------------------------------------------------------------------------
 * TODOS los datos del negocio viven aquí. Ningún componente tiene un teléfono,
 * un horario ni una zona escritos a mano.
 *
 * Los valores que empiezan por `TODO_` son MARCADORES: se ven en pantalla para
 * que la maqueta no quede rota, pero:
 *   · se omiten automáticamente del JSON-LD y de cualquier dato estructurado,
 *   · aparecen listados en el aviso amarillo que solo se ve en `npm run dev`.
 *
 * Los campos marcados `SUGERIDO` los inferí del rubro y del tono de Mario;
 * hay que confirmarlos con él antes de publicar (lista completa en el README).
 */

import { FOTO_ASESOR_CONFIRMADA } from './images.js'

/* ─── MARCADORES ─────────────────────────────────────────────────────────── */
export const TODO_EMAIL = 'correo-pendiente@ejemplo.com'
export const TODO_LICENCIA = 'PENDIENTE'
export const TODO_META_PIXEL_ID = ''
export const TODO_GOOGLE_ADS_ID = ''
export const TODO_GOOGLE_ADS_LABEL = ''
export const TODO_FIREBASE_PROJECT_ID = 'PENDIENTE-PROJECT-ID'
export const TODO_INSTAGRAM = ''
export const TODO_FACEBOOK = ''

const MARCADORES = new Set(
  [
    TODO_EMAIL,
    TODO_LICENCIA,
    TODO_META_PIXEL_ID,
    TODO_GOOGLE_ADS_ID,
    TODO_GOOGLE_ADS_LABEL,
    TODO_FIREBASE_PROJECT_ID,
    TODO_INSTAGRAM,
    TODO_FACEBOOK,
  ].filter((v) => v !== '')
)

/** ¿Este valor sigue sin rellenar? */
export const esMarcador = (valor) =>
  valor === undefined || valor === null || valor === '' || MARCADORES.has(valor)

/* ─── NEGOCIO ────────────────────────────────────────────────────────────── */
export const site = {
  nombre: 'Mario Fernando Leon',
  nombreCorto: 'Mario Leon',
  rubro: 'Seguros de vida y protección financiera familiar',

  // ✅ Datos reales confirmados.
  telefono: '+1 (407) 953-5960',
  telefonoE164: '+14079535960',
  whatsapp: '14079535960', // mismo número que el teléfono
  correo: TODO_EMAIL,

  horario: {
    // SUGERIDO — pendiente de que Mario lo confirme.
    texto: 'Con cita previa, de lunes a viernes',
    dias: ['Mo', 'Tu', 'We', 'Th', 'Fr'],
    abre: '09:00',
    cierra: '18:00',
    confirmado: false, // ← mientras sea false, NO entra en el JSON-LD
  },

  /**
   * SIN oficina física y SIN ciudad fija: atiende de forma remota en todo
   * Estados Unidos, por teléfono y videollamada.
   *
   * ⚠️ Esto cambia el SEO: no hay SEO local que valga, no se declara ninguna
   * dirección postal en el JSON-LD y el titular NO lleva ciudad. Inventar una
   * dirección para "posicionar mejor" sería declarar una sede que no existe.
   */
  remoto: true,
  pais: 'US',
  paisNombre: 'Estados Unidos',
  cobertura: {
    texto: 'Todo Estados Unidos, por teléfono y videollamada',
    // ⚠️ PENDIENTE: la licencia de seguros es estatal. Si Mario solo puede
    // operar en ciertos estados, hay que listarlos aquí y corregir el copy.
    confirmada: false,
    estados: null, // ej. ['Florida', 'Texas', 'Georgia'] cuando se confirme
  },

  licencia: {
    // ⚠️ En seguros el número de licencia es de revelación obligatoria.
    // NO se inventa: se queda como marcador hasta que Mario lo confirme.
    descripcion: 'Agente de seguros de vida con licencia',
    numero: TODO_LICENCIA,
  },

  redes: {
    instagram: TODO_INSTAGRAM,
    facebook: TODO_FACEBOOK,
  },

  firebaseProjectId: TODO_FIREBASE_PROJECT_ID,

  /**
   * 🌐 EL DOMINIO PÚBLICO — de aquí salen el `canonical`, el `og:url` y el
   * `sitemap.xml`. Póngalo SIN barra final, con `https://`.
   *
   * Déjelo vacío solo si sirve la página desde Firebase Hosting: entonces se
   * deduce `https://<projectId>.web.app`. Si la sirve desde Vercel (o desde un
   * dominio propio), escríbalo aquí — si no, el sitemap y el canonical
   * apuntarían a una dirección que no es la que sirve la página.
   *
   *   dominio: 'https://mario-leon.vercel.app'
   *   dominio: 'https://seguros-marioleon.com'
   */
  dominio: '',

  get url() {
    if (!esMarcador(this.dominio)) return this.dominio.replace(/\/$/, '')
    return esMarcador(this.firebaseProjectId)
      ? 'https://ejemplo.web.app'
      : `https://${this.firebaseProjectId}.web.app`
  },

  /** ¿`url` es de verdad la dirección que sirve la página? */
  get urlConfirmada() {
    return !esMarcador(this.dominio) || !esMarcador(this.firebaseProjectId)
  },

  tracking: {
    plataforma: 'meta', // 'meta' | 'google' | 'ambas'
    metaPixelId: TODO_META_PIXEL_ID,
    googleAdsId: TODO_GOOGLE_ADS_ID,
    googleAdsLabel: TODO_GOOGLE_ADS_LABEL,
  },

  /**
   * Líneas de producto. `clave` enlaza con el copy y con el desplegable del
   * formulario. La consulta inicial va marcada como `destacada`: no es un
   * producto, es la oferta de entrada, y se muestra como tarjeta ancha.
   */
  productos: [
    { clave: 'iul' },
    { clave: 'termino' },
    { clave: 'finales' },
    { clave: 'anualidades' },
    { clave: 'consulta', destacada: true },
  ],

  /**
   * Cifras de la barra superior.
   *
   * ⚠️ HONESTIDAD: aquí NO hay "familias protegidas" ni "años de experiencia"
   * inventados. Mario es una persona con nombre y apellido: publicar una cifra
   * falsa a su nombre es ponerle en la boca algo que no dijo.
   *
   * Las cuatro cifras que quedan son verdaderas por construcción o vienen del
   * BLOQUE 0. La de estados lleva `pendiente: true` porque depende de en qué
   * estados tiene licencia — hasta que se confirme, se muestra con aviso.
   */
  estadisticas: [
    { clave: 'tipos', numero: 4, sufijo: '', prefijo: '' },
    { clave: 'costo', numero: 0, sufijo: '', prefijo: '$' },
    { clave: 'remoto', numero: 100, sufijo: '%', prefijo: '' },
    { clave: 'estados', numero: 50, sufijo: '', prefijo: '', pendiente: true },
  ],

  // ⚠️ TESTIMONIOS DE EJEMPLO — no son clientes reales de Mario.
  testimoniosSonEjemplo: true,
}

/* ─── HELPERS ────────────────────────────────────────────────────────────── */

export const telHref = () => `tel:${site.telefonoE164}`

export const waHref = (mensaje = '') => {
  const numero = String(site.whatsapp).replace(/\D/g, '')
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : ''
  return `https://wa.me/${numero}${texto}`
}

/** Todo lo que sigue sin rellenar o sin confirmar, para el aviso de desarrollo. */
export const listarPendientes = () => {
  const p = []
  if (esMarcador(site.correo)) p.push('CORREO (site.js → correo)')
  if (esMarcador(site.licencia.numero))
    p.push('NÚMERO DE LICENCIA (site.js → licencia.numero) — obligatorio revelarlo en seguros')
  if (!site.urlConfirmada)
    p.push(
      'DOMINIO PÚBLICO sin fijar (site.js → dominio) — sin él no hay canonical y el sitemap apunta a una URL de ejemplo'
    )
  if (esMarcador(site.firebaseProjectId))
    p.push(
      'FIREBASE PROJECT ID (site.js → firebaseProjectId y .firebaserc) — bloquea el deploy en Firebase Hosting y el guardado del formulario'
    )
  if (!FOTO_ASESOR_CONFIRMADA)
    p.push('FOTO DEL ASESOR sin poner (public/asesor.jpg) — el hero muestra una silueta')
  if (esMarcador(site.tracking.metaPixelId))
    p.push('META PIXEL ID (site.js → tracking.metaPixelId)')
  if (esMarcador(site.tracking.googleAdsId))
    p.push('GOOGLE ADS ID + LABEL (site.js → tracking)')
  if (esMarcador(site.redes.instagram) && esMarcador(site.redes.facebook))
    p.push('REDES SOCIALES (site.js → redes)')
  if (!site.horario.confirmado) p.push('HORARIO sin confirmar (site.js → horario)')
  if (!site.cobertura.confirmada)
    p.push('ESTADOS con licencia sin confirmar (site.js → cobertura) — la licencia es estatal')
  if (site.testimoniosSonEjemplo)
    p.push('TESTIMONIOS de ejemplo, no son clientes reales (i18n/es.js)')
  p.push('SERVICIOS, DIFERENCIADOR y MIEDOS: inferidos del rubro, confirmar con Mario')
  return p
}

export default site
