import { useState } from 'react'
import { listarPendientes } from '../../config/site.js'
import { firebaseConfigurado } from '../../lib/firebase.js'
import { trackingActivo } from '../../lib/pixel.js'
import { IconoEquis } from './Iconos.jsx'

/**
 * Aviso de desarrollo con todo lo que falta por configurar.
 * Solo se renderiza con `import.meta.env.DEV`: NUNCA sale en producción.
 */
export function AvisoPlaceholders() {
  const [abierto, setAbierto] = useState(true)
  if (!import.meta.env.DEV) return null

  const pendientes = [...listarPendientes()]
  if (!firebaseConfigurado())
    pendientes.push('FIREBASE CONFIG sin pegar (src/lib/firebase.js) — el formulario no guarda')
  if (!trackingActivo)
    pendientes.push('TRACKING sin configurar — no se dispara ningún evento Lead real')

  if (!pendientes.length) return null

  if (!abierto) {
    return (
      <button
        type="button"
        onClick={() => setAbierto(true)}
        className="fixed bottom-3 left-3 z-[70] rounded-control bg-amber-400 px-3 py-2 text-xs font-bold text-amber-950 shadow-elevada"
      >
        ⚠ {pendientes.length} pendientes
      </button>
    )
  }

  return (
    <div className="fixed bottom-3 left-3 z-[70] max-h-[60vh] w-[min(24rem,calc(100vw-1.5rem))] overflow-auto rounded-tarjeta border-2 border-amber-500 bg-amber-50 p-4 text-amber-950 shadow-elevada">
      <div className="mb-2 flex items-start justify-between gap-3">
        <p className="font-titulo text-sm font-bold">
          ⚠ Solo en desarrollo — {pendientes.length} datos sin configurar
        </p>
        <button
          type="button"
          onClick={() => setAbierto(false)}
          aria-label="Cerrar aviso"
          className="shrink-0 rounded-control p-1 hover:bg-amber-200"
        >
          <IconoEquis className="h-4 w-4" />
        </button>
      </div>
      <ul className="space-y-1.5 text-[13px] leading-snug">
        {pendientes.map((p) => (
          //
          <li key={p} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-amber-300 pt-2 text-[12px] leading-snug">
        Este aviso no aparece en producción. Los valores marcadores se omiten
        automáticamente del JSON-LD.
      </p>
    </div>
  )
}

export default AvisoPlaceholders
