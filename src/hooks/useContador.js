import { useEffect, useRef, useState } from 'react'
import { soportaIntersectionObserver } from '../lib/entorno.js'
import { intensidad, prefiereMenosMovimiento } from '../lib/animaciones.js'

/**
 * Contador que sube de 0 al valor final cuando el elemento entra en pantalla.
 *
 * Sin IntersectionObserver (trampa 12) o con `prefers-reduced-motion`, el
 * número aparece directamente en su valor final: nunca se queda en 0 ni rompe.
 */
export function useContador(valorFinal, { duracion } = {}) {
  const ref = useRef(null)
  const [valor, setValor] = useState(() =>
    soportaIntersectionObserver && !prefiereMenosMovimiento() ? 0 : valorFinal
  )
  const yaCorrio = useRef(false)

  useEffect(() => {
    if (!soportaIntersectionObserver || prefiereMenosMovimiento()) {
      setValor(valorFinal)
      return undefined
    }
    const nodo = ref.current
    if (!nodo) return undefined

    const ms = (duracion ?? Math.max(1.1, intensidad.duracion * 2.2)) * 1000

    const animar = () => {
      if (yaCorrio.current) return
      yaCorrio.current = true
      const inicio = performance.now()
      const paso = (ahora) => {
        const t = Math.min(1, (ahora - inicio) / ms)
        // easeOutCubic: arranca rápido y frena al final
        const eased = 1 - Math.pow(1 - t, 3)
        setValor(Math.round(valorFinal * eased))
        if (t < 1) requestAnimationFrame(paso)
      }
      requestAnimationFrame(paso)
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            animar()
            observador.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    observador.observe(nodo)
    return () => observador.disconnect()
  }, [valorFinal, duracion])

  return { ref, valor }
}

export default useContador
