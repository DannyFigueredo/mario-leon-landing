/**
 * 🎨 PALANCA DE ESTÉTICA #1 — PRESETS DE TEMA
 * ---------------------------------------------------------------------------
 * Para cambiar la estética del sitio (colores, redondeo e intensidad de las
 * animaciones) cambia UNA SOLA LÍNEA: `PRESET_ACTIVO`.
 *
 * Este archivo lo consumen DOS sitios:
 *   1. tailwind.config.js  → genera marca-*, acento-*, tinta-*, superficie-*
 *      y los radios rounded-control / rounded-tarjeta / rounded-bloque
 *   2. src/lib/animaciones.js → lee `animationIntensity`
 *
 * Después de cambiarlo hay que reiniciar `npm run dev` (Tailwind lee este
 * archivo al arrancar).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * LA PALETA ES LA QUE DIO EL CLIENTE, LOS CUATRO COLORES, SIN INVENTAR NINGUNO:
 *
 *   #272757  color principal   → marca-700  (CTAs, botones, títulos fuertes)
 *   #0F0E47  color de contraste→ marca-900  (footer, texto de máximo contraste)
 *   #505081  secundario        → marca-600  (secciones intermedias)
 *   #8686AC  secundario        → marca-400  (acentos suaves, bordes, hover)
 *
 * Es una paleta MONOCROMA: los cuatro colores son el mismo azul-morado a
 * distinta luminosidad. Eso da un resultado sobrio y financiero, pero obliga a
 * tener cuidado con el contraste (ver ROLES abajo).
 *
 * ROLES DE COLOR:
 *   marca      → CTAs, fondos de sección oscuros, acentos fuertes
 *   acento     → detalles: viñetas, iconos, subrayados, badges. El paso 700
 *                (#505081) es el más claro que aún pasa AA como texto sobre
 *                blanco (7,3:1). #8686AC sobre blanco da 3,1:1: sirve para
 *                bordes, iconos y fondos, NUNCA para texto de cuerpo.
 *   tinta      → texto y estructura
 *   superficie → fondos suaves alternos entre secciones
 */

export const PRESET_ACTIVO = 'sereno' // 👈 CAMBIA SOLO ESTA LÍNEA

/** Rampa de la marca: contiene los 4 colores del cliente, en su sitio. */
const RAMPA_CLIENTE = {
  50: '#F2F2F7',
  100: '#E4E4EE',
  200: '#C9C9DC',
  300: '#A8A8C6',
  400: '#8686AC', // ← secundario del cliente
  500: '#6A6A93',
  600: '#505081', // ← secundario del cliente
  700: '#272757', // ← COLOR PRINCIPAL
  800: '#1C1B50',
  900: '#0F0E47', // ← COLOR DE CONTRASTE
}

/** Acentos: la misma familia, desplazada para que el paso 700 pase AA. */
const ACENTO_CLIENTE = {
  50: '#F4F4F8',
  100: '#E9E9F1',
  200: '#D5D5E4',
  300: '#B9B9D1',
  400: '#9E9EBE',
  500: '#8686AC', // ← secundario del cliente
  600: '#6B6B96',
  700: '#505081', // ← secundario del cliente (7,3:1 sobre blanco → AA ✅)
  800: '#3A3A64',
  900: '#272757',
}

const TINTA_CLIENTE = {
  50: '#F6F6F9',
  100: '#ECECF2',
  200: '#D8D8E3',
  300: '#B4B4C6',
  400: '#8484A0',
  500: '#5E5E7C',
  600: '#42425C',
  700: '#2C2C44',
  800: '#1B1A38',
  900: '#0F0E47', // ← COLOR DE CONTRASTE del cliente
}

export const PRESETS = {
  /* ------------------------------------------------------------------ */
  sereno: {
    nombre: 'Sereno (paleta del cliente)',
    descripcion:
      'La paleta exacta que dio el cliente. Esquinas poco redondeadas y animaciones sutiles: tono profesional y sin prisa, pensado para una audiencia de 50+.',
    animationIntensity: 'sutil',
    borderRadius: {
      control: '0.5rem',
      tarjeta: '0.875rem',
      bloque: '1.25rem',
    },
    colores: {
      marca: RAMPA_CLIENTE,
      acento: ACENTO_CLIENTE,
      tinta: TINTA_CLIENTE,
      superficie: {
        50: '#FFFFFF',
        100: '#F7F7FB',
        200: '#EFEFF6',
        300: '#E4E4EF',
      },
    },
  },

  /* ------------------------------------------------------------------ */
  // Variante para probar sin cambiar de marca: MISMOS cuatro colores, más
  // aire y más blanco. No inventa ningún color nuevo.
  serenoClaro: {
    nombre: 'Sereno claro (misma paleta, más aire)',
    descripcion:
      'Los mismos cuatro colores del cliente, pero con los fondos de sección casi blancos y las esquinas algo más redondeadas. Útil para probar una versión más ligera sin salirse de la marca.',
    animationIntensity: 'media',
    borderRadius: {
      control: '0.75rem',
      tarjeta: '1.125rem',
      bloque: '1.5rem',
    },
    colores: {
      marca: RAMPA_CLIENTE,
      acento: ACENTO_CLIENTE,
      tinta: TINTA_CLIENTE,
      superficie: {
        50: '#FFFFFF',
        100: '#FBFBFD',
        200: '#F5F5FA',
        300: '#ECECF4',
      },
    },
  },
}

/**
 * Para crear un preset nuevo: copia un bloque entero, cámbiale la clave,
 * ajusta las escalas y apunta `PRESET_ACTIVO` a la clave nueva.
 * Si el cliente cambia de colores de marca, lo que hay que tocar son
 * `RAMPA_CLIENTE`, `ACENTO_CLIENTE` y `TINTA_CLIENTE` de arriba, una vez.
 */
export const tema = PRESETS[PRESET_ACTIVO] || PRESETS.sereno

/** Verde oficial de WhatsApp. NO es un color de marca: solo para WhatsApp. */
export const VERDE_WHATSAPP = '#25D366'

export default tema
