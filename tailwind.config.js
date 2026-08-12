import { tema, PRESETS, VERDE_WHATSAPP } from './src/config/theme.js'

/**
 * 🎨 PALANCA DE ESTÉTICA #2 — TOKENS DE TAILWIND
 * Los colores y los radios NO se escriben aquí: se importan del preset activo
 * de src/config/theme.js. Para cambiar la estética, cambia el preset allí.
 *
 * Además del preset activo, las escalas 50-900 de LOS TRES presets quedan
 * disponibles como `preset-confianza-*`, `preset-calido-*`, `preset-moderno-*`
 * por si quieres comparar dos paletas sin cambiar el preset.
 */
const escalasDeTodosLosPresets = Object.fromEntries(
  Object.entries(PRESETS).flatMap(([clave, p]) =>
    Object.entries(p.colores).map(([rol, escala]) => [
      `preset-${clave}-${rol}`,
      escala,
    ])
  )
)

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Roles del preset ACTIVO — es lo que usan los componentes.
        marca: tema.colores.marca,
        acento: tema.colores.acento,
        tinta: tema.colores.tinta,
        superficie: tema.colores.superficie,
        whatsapp: {
          DEFAULT: VERDE_WHATSAPP,
          oscuro: '#1DA851',
        },
        ...escalasDeTodosLosPresets,
      },
      borderRadius: {
        // 3 tokens, sección 5.1. Nunca uses radios sueltos en los componentes.
        control: tema.borderRadius.control,
        tarjeta: tema.borderRadius.tarjeta,
        bloque: tema.borderRadius.bloque,
      },
      fontFamily: {
        titulo: ['Poppins', 'system-ui', 'sans-serif'],
        texto: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        tarjeta: '0 1px 2px rgba(14,19,28,.04), 0 8px 24px -12px rgba(14,19,28,.18)',
        elevada: '0 2px 4px rgba(14,19,28,.05), 0 20px 45px -20px rgba(14,19,28,.28)',
        barra: '0 1px 0 rgba(14,19,28,.06), 0 10px 30px -20px rgba(14,19,28,.35)',
      },
      // ⚠️ Trampa 1: NUNCA repitas una clave entre backgroundImage y
      // backgroundSize — generan la misma clase bg-* y chocan.
      backgroundImage: {
        // Degradado del hero: oscurece lo justo para que el texto blanco pase
        // AA sobre cualquier foto, sin llegar a matar la imagen.
        'degradado-hero':
          'linear-gradient(180deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.30) 42%, rgba(0,0,0,.72) 100%)',
        'degradado-marca':
          'linear-gradient(135deg, var(--tw-gradient-stops))',
      },
      maxWidth: {
        contenido: '80rem',
        lectura: '46rem',
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [],
}
