/**
 * 🔥 ARCHIVO #4 QUE TIENES QUE EDITAR
 * ---------------------------------------------------------------------------
 * Pega aquí el config que devuelve:
 *
 *     firebase apps:create WEB "A-lianz Landing"
 *     firebase apps:sdkconfig WEB
 *
 * Mientras `firebaseConfig` tenga valores PEGA_AQUI_*, el formulario NO puede
 * guardar. En ese caso:
 *   · en desarrollo (`npm run dev`) se simula el envío para poder ver la
 *     pantalla de gracias,
 *   · en producción se muestra el error y se ofrece WhatsApp, para que el
 *     contacto no se pierda en silencio.
 *
 * ⚠️ Trampa 9: el SDK de Firebase se carga con `import()` DINÁMICO dentro de la
 * función de guardado, nunca arriba del archivo. Así el bundle inicial no
 * arrastra ~200 KB que el 95% de las visitas no llega a usar.
 */

// ⚠️ Este config tiene que ser el del proyecto de MARIO, no el de ningún otro
// cliente. Si aquí quedara pegado el de otro proyecto, los contactos de esta
// landing se guardarían en la base de datos de otra persona.
export const firebaseConfig = {
  apiKey: 'PEGA_AQUI_API_KEY',
  authDomain: 'PEGA_AQUI_PROJECT_ID.firebaseapp.com',
  projectId: 'PEGA_AQUI_PROJECT_ID',
  storageBucket: 'PEGA_AQUI_PROJECT_ID.firebasestorage.app',
  messagingSenderId: 'PEGA_AQUI_SENDER_ID',
  appId: 'PEGA_AQUI_APP_ID',
}

/** ¿Ya está pegado el config real? */
export const firebaseConfigurado = () =>
  !Object.values(firebaseConfig).some(
    (v) => typeof v === 'string' && v.includes('PEGA_AQUI')
  )

let appPromesa = null

async function obtenerFirestore() {
  if (!appPromesa) {
    appPromesa = (async () => {
      const [{ initializeApp, getApps }, firestore] = await Promise.all([
        import('firebase/app'),
        import('firebase/firestore'),
      ])
      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
      return { db: firestore.getFirestore(app), firestore }
    })()
  }
  return appPromesa
}

/** Normaliza y recorta: lo que se guarda tiene que pasar las reglas de Firestore. */
function limpiar(datos) {
  const texto = (v, max) => String(v ?? '').trim().slice(0, max)
  return {
    nombre: texto(datos.nombre, 80),
    telefono: texto(datos.telefono, 25),
    producto: texto(datos.producto, 40),
    edad: texto(datos.edad, 10),
    idioma: texto(datos.idioma, 5),
    origen: texto(datos.origen, 60),
    // Datos de campaña, útiles para saber qué anuncio trajo el contacto.
    referrer: texto(typeof document !== 'undefined' ? document.referrer : '', 200),
    url: texto(typeof window !== 'undefined' ? window.location.href : '', 200),
  }
}

/**
 * Guarda una solicitud de cotización en la colección `cotizaciones`.
 * @returns {Promise<{ok: boolean, motivo?: string, simulado?: boolean}>}
 */
export async function guardarCotizacion(datos) {
  const limpios = limpiar(datos)

  if (!firebaseConfigurado()) {
    if (import.meta.env.DEV) {
      console.warn(
        '[firebase] Config sin rellenar: se SIMULA el guardado.\n' +
          'Pega el config real en src/lib/firebase.js antes de publicar.',
        limpios
      )
      return { ok: true, simulado: true }
    }
    console.error('[firebase] Config sin rellenar: la cotización NO se guardó.')
    return { ok: false, motivo: 'sin-configurar' }
  }

  try {
    const { db, firestore } = await obtenerFirestore()
    await firestore.addDoc(firestore.collection(db, 'cotizaciones'), {
      ...limpios,
      creado: firestore.serverTimestamp(),
    })
    return { ok: true }
  } catch (error) {
    console.error('[firebase] No se pudo guardar la cotización:', error)
    return { ok: false, motivo: 'error-red' }
  }
}

export default { guardarCotizacion, firebaseConfigurado, firebaseConfig }
