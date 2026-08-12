/**
 * Prueba de humo de Firestore. Ejecuta: node scripts/prueba-firestore.mjs
 *
 * Comprueba tres cosas contra el proyecto REAL:
 *   1. una cotización válida se guarda (y devuelve su ID),
 *   2. una cotización con un producto fuera de la lista es RECHAZADA,
 *   3. leer la colección desde el cliente es RECHAZADO.
 *
 * Los puntos 2 y 3 son los que demuestran que firestore.rules está activo y
 * que la lista de teléfonos de tus clientes no es pública.
 */
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'
import { firebaseConfig } from '../src/lib/firebase.js'

const db = getFirestore(initializeApp(firebaseConfig))
const col = collection(db, 'cotizaciones')

const base = {
  nombre: 'PRUEBA AUTOMATICA - borrar',
  telefono: '3055550123',
  edad: '31-40',
  idioma: 'es',
  origen: 'prueba-humo',
  referrer: '',
  url: 'https://ejemplo.web.app/',
}

let fallos = 0

// 1. Escritura válida
try {
  const ref = await addDoc(col, { ...base, producto: 'iul', creado: serverTimestamp() })
  console.log('✅ 1/3 cotización válida guardada — id:', ref.id)
} catch (e) {
  fallos++
  console.error('❌ 1/3 la cotización válida NO se guardó:', e.code || e.message)
}

// 2. Producto fuera de la lista permitida → debe rechazarse
try {
  await addDoc(col, { ...base, producto: 'seguro-de-auto', creado: serverTimestamp() })
  fallos++
  console.error('❌ 2/3 se guardó un producto inválido: las reglas NO están filtrando')
} catch (e) {
  console.log('✅ 2/3 producto inválido rechazado —', e.code)
}

// 3. Lectura desde el cliente → debe rechazarse
try {
  const snap = await getDocs(col)
  fallos++
  console.error(`❌ 3/3 se pudo LEER la colección (${snap.size} docs): los leads son públicos`)
} catch (e) {
  console.log('✅ 3/3 lectura desde el cliente rechazada —', e.code)
}

console.log(fallos === 0 ? '\n✅ Firestore configurado correctamente.' : `\n❌ ${fallos} fallo(s).`)
process.exit(fallos === 0 ? 0 : 1)
