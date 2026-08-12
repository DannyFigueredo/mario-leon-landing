/**
 * ✨ PALANCA DE ESTÉTICA #3 — INTENSIDAD DE ANIMACIÓN
 * ---------------------------------------------------------------------------
 * Ningún componente tiene números de animación sueltos: todos salen de aquí,
 * y aquí todo sale de `tema.animationIntensity` (src/config/theme.js).
 *
 *   sutil → poco desplazamiento, duración larga, escalonado lento
 *   media → equilibrado
 *   alta  → más desplazamiento, más rápido, escalonado corto
 *
 * ⚠️ Trampa 6 (Framer Motion): la `transition` que va DENTRO de una variante
 * gana sobre la prop `transition`. Por eso el `delay` del escalonado se
 * inyecta dentro de la variante `visible`, con una función `custom`.
 */
import { tema } from '../config/theme.js'

export const INTENSIDADES = {
  sutil: { desplazamiento: 16, duracion: 0.6, stagger: 0.1, escala: 0.99 },
  media: { desplazamiento: 26, duracion: 0.45, stagger: 0.07, escala: 0.97 },
  alta: { desplazamiento: 40, duracion: 0.35, stagger: 0.05, escala: 0.94 },
}

export const intensidad = INTENSIDADES[tema.animationIntensity] || INTENSIDADES.media

const suavizado = [0.16, 1, 0.3, 1] // easeOutExpo suave

/** ¿El usuario pidió menos movimiento a nivel de sistema? */
export const prefiereMenosMovimiento = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const base = (extra = {}) => ({
  duration: intensidad.duracion,
  ease: suavizado,
  ...extra,
})

/** Aparecer desde abajo. `custom` = índice para escalonar. */
export const aparecer = {
  oculto: { opacity: 0, y: intensidad.desplazamiento },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: base({ delay: i * intensidad.stagger }),
  }),
}

/** Aparecer desde un lado. `custom` = índice. */
export const aparecerDesde = (lado = 'izquierda') => ({
  oculto: { opacity: 0, x: lado === 'izquierda' ? -intensidad.desplazamiento : intensidad.desplazamiento },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: base({ delay: i * intensidad.stagger }),
  }),
})

/** Aparecer con un leve zoom — para tarjetas y fotos. */
export const aparecerZoom = {
  oculto: { opacity: 0, scale: intensidad.escala, y: intensidad.desplazamiento * 0.6 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: base({ delay: i * intensidad.stagger }),
  }),
}

/** Contenedor que escalona a sus hijos sin necesidad de `custom`. */
export const contenedor = {
  oculto: {},
  visible: {
    transition: {
      staggerChildren: intensidad.stagger,
      delayChildren: intensidad.stagger,
    },
  },
}

/** Hijo de `contenedor`. */
export const hijo = {
  oculto: { opacity: 0, y: intensidad.desplazamiento },
  visible: { opacity: 1, y: 0, transition: base() },
}

/** Micro-interacción de los botones. */
export const pulsoBoton = {
  whileHover: { scale: tema.animationIntensity === 'sutil' ? 1.015 : 1.04 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 380, damping: 24 },
}

/** Config estándar para `whileInView`. */
export const enPantalla = {
  initial: 'oculto',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.15, margin: '0px 0px -60px 0px' },
}

export default {
  aparecer,
  aparecerDesde,
  aparecerZoom,
  contenedor,
  hijo,
  pulsoBoton,
  enPantalla,
  intensidad,
}
