import Reveal from './Reveal.jsx'
import { IconoCheck, IconoEquis } from './Iconos.jsx'

/**
 * Comparación "sin plan / con plan". Es el argumento de neuroventa más directo
 * de la página: no compara productos, compara el día en que hace falta.
 *
 * Deliberadamente NO usa lenguaje de emergencia ni cifras de rendimiento.
 */
export function AntesDespues({ titulo, sin, con }) {
  return (
    <div>
      {titulo ? (
        <Reveal>
          <h3 className="mb-6 text-center font-titulo text-2xl font-bold text-tinta-900 sm:text-3xl">
            {titulo}
          </h3>
        </Reveal>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <Reveal tipo="izquierda">
          <div className="h-full rounded-tarjeta border border-tinta-200 bg-superficie-100 p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-tinta-200 text-tinta-600">
                <IconoEquis className="h-5 w-5" />
              </span>
              <h4 className="font-titulo text-lg font-semibold text-tinta-700">{sin.titulo}</h4>
            </div>
            <ul className="space-y-3">
              {sin.puntos.map((punto) => (
                // Comentarios con // dentro del map (trampa 8): un /* */ suelto
                // en posición de hijo se renderizaría como texto visible.
                <li key={punto} className="flex gap-3 text-[15px] leading-relaxed text-tinta-600">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tinta-400" />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal tipo="derecha">
          <div className="h-full rounded-tarjeta border-2 border-marca-700 bg-white p-6 shadow-tarjeta">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-marca-700 text-white">
                <IconoCheck className="h-5 w-5" />
              </span>
              <h4 className="font-titulo text-lg font-semibold text-marca-800">{con.titulo}</h4>
            </div>
            <ul className="space-y-3">
              {con.puntos.map((punto) => (
                //
                <li key={punto} className="flex gap-3 text-[15px] leading-relaxed text-tinta-700">
                  <IconoCheck className="mt-0.5 h-5 w-5 shrink-0 text-marca-600" />
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default AntesDespues
