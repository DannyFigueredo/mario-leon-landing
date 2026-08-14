/**
 * 🖼️ ARCHIVO #3 QUE TIENES QUE EDITAR (si quieres cambiar fotos)
 * ---------------------------------------------------------------------------
 * Fuente: Pexels (licencia libre, también uso comercial, sin atribución
 * obligatoria). Cada ID fue verificado — la URL final devuelve HTTP 200 — y
 * cada foto fue revisada visualmente antes de entrar aquí.
 *
 * CRITERIO DE CASTING: la audiencia es gente de 50 años en adelante, latina, y
 * el servicio es REMOTO. Por eso las fotos son de personas mayores reales en
 * su casa o al aire libre, y de conversaciones por teléfono y videollamada.
 * Nada de oficinas de rascacielos ni de gente de 25 años con traje.
 *
 * ⚠️ REGLA: ninguna foto puede contradecir los SERVICIOS QUE NO HACE. Aquí no
 * hay coches, ni hospitales, ni carteles de "se vende", ni gráficas de bolsa.
 *
 * Para cambiar una foto: busca en pexels.com, copia el número del ID de la URL
 * (pexels.com/photo/lo-que-sea-12345678/) y sustitúyelo abajo.
 */

const pexels = (id, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

export const srcSetPexels = (id, anchos = [640, 960, 1280, 1920]) =>
  anchos.map((w) => `${pexels(id, w)} ${w}w`).join(', ')

/**
 * 👤 LA FOTO DEL ASESOR — la única que NO es de banco de imágenes.
 * ---------------------------------------------------------------------------
 * ✅ Ya está puesta: `public/asesor.jpg`, 800×923 px y 77 KB. Sale del retrato
 * original (1167×1347 PNG, 2,1 MB), guardado en `assets-fuente/` por si hay que
 * volver a generarla. El original NO se sirve: 2 MB en el hero, que carga con
 * prioridad, castigan justo a quien entra con datos móviles.
 *
 * Para cambiarla:
 *   1. Guarde el archivo como `public/asesor.jpg` (así, en minúsculas).
 *      ⚠️ En `public/`, NUNCA en `dist/`: `dist/` es la salida del build, está
 *      en .gitignore y se borra entera en cada `npm run build`.
 *   2. Deje `FOTO_ASESOR_CONFIRMADA = true`.
 *
 * Recomendado: retrato VERTICAL, entre 4:5 y 6:7, ~800 px de ancho, con la cara
 * en el tercio superior —el hero recorta con `object-top`— y sin texto encima.
 * Si el archivo faltara, el hero muestra una silueta con los colores de la
 * marca: nunca una foto de otra persona haciéndose pasar por él.
 */
export const FOTO_ASESOR = '/asesor.jpg'
export const FOTO_ASESOR_CONFIRMADA = true

export const IDS = {
  hero: 21906852, // pareja mayor latina sonriendo, al aire libre
  iul: 8439746, // pareja mayor revisando algo en el portátil, sonriendo
  termino: 8972500, // hombre mayor paseando con su hija adulta
  finales: 33663528, // pareja mayor abrazada, con cariño
  anualidades: 4894658, // pareja jubilada al aire libre, tranquila
  consulta: 27086989, // hombre mayor en casa, al teléfono y con el portátil
  llamada: 8899563, // hombre mayor sonriendo mientras habla por teléfono
  documento: 8439683, // pareja mayor leyendo un documento juntos
  tranquilidad: 31899597, // pareja mayor riendo al aire libre
}

export const imagenes = {
  asesor: {
    src: FOTO_ASESOR,
    alt: 'Mario Fernando Leon, agente de seguros de vida, mirando a cámara',
  },

  hero: {
    id: IDS.hero,
    src: pexels(IDS.hero, 1920),
    srcSet: srcSetPexels(IDS.hero),
    sizes: '100vw',
    alt: 'Pareja mayor sonriendo tranquila al aire libre, protegida por su seguro de vida',
  },

  // Una por cada línea de producto. La clave coincide con site.productos.
  servicios: {
    iul: {
      id: IDS.iul,
      src: pexels(IDS.iul, 900),
      alt: 'Pareja mayor revisando sus opciones en el portátil, sonriendo',
    },
    termino: {
      id: IDS.termino,
      src: pexels(IDS.termino, 900),
      alt: 'Hombre mayor paseando y conversando con su hija adulta',
    },
    finales: {
      id: IDS.finales,
      src: pexels(IDS.finales, 900),
      alt: 'Pareja mayor abrazada con cariño en su casa',
    },
    anualidades: {
      id: IDS.anualidades,
      src: pexels(IDS.anualidades, 900),
      alt: 'Pareja jubilada caminando tranquila al aire libre',
    },
    consulta: {
      id: IDS.consulta,
      src: pexels(IDS.consulta, 1200),
      alt: 'Hombre mayor en su casa hablando por teléfono mientras mira el portátil',
    },
  },

  llamada: {
    id: IDS.llamada,
    src: pexels(IDS.llamada, 1200),
    alt: 'Hombre mayor sonriendo mientras conversa por teléfono desde su casa',
  },
  documento: {
    id: IDS.documento,
    src: pexels(IDS.documento, 1200),
    alt: 'Pareja mayor leyendo juntos un documento, sin prisa',
  },
  tranquilidad: {
    id: IDS.tranquilidad,
    src: pexels(IDS.tranquilidad, 1200),
    alt: 'Pareja mayor riendo al aire libre, tranquila',
  },
}

export default imagenes
