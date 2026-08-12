import site from '../config/site.js'
import { useIdioma } from '../i18n/index.jsx'
import Reveal from './ui/Reveal.jsx'
import TituloSeccion from './ui/TituloSeccion.jsx'
import { BotonDiagnostico } from './ui/Botones.jsx'
import { IconoEstrella, IconoUsuarios } from './ui/Iconos.jsx'

/**
 * Prueba social adaptada al rubro: nombre + zona + QUÉ PRODUCTO CONTRATÓ.
 *
 * ⚠️ HONESTIDAD: mientras `site.testimoniosSonEjemplo` sea `true`, se muestra
 * un aviso visible de que son de ejemplo, y NADA de esto entra en el JSON-LD
 * (ni rating ni número de reseñas). Sustituir por reseñas reales en i18n/*.js
 * y poner la bandera en `false`.
 */
function Estrellas() {
  return (
    <div className="flex gap-0.5 text-acento-500" aria-label="5/5">
      {[0, 1, 2, 3, 4].map((n) => (
        //
        <IconoEstrella key={n} className="h-4 w-4" />
      ))}
    </div>
  )
}

export function Testimonios() {
  const { t } = useIdioma()

  return (
    <section id="testimonios" className="scroll-mt-20 bg-superficie-100 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-contenido px-4 sm:px-6 lg:px-8">
        <TituloSeccion
          antetitulo={t.nav.testimonios}
          titulo={t.testimonios.titulo}
          subtitulo={t.testimonios.subtitulo}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.testimonios.items.map((item, i) => (
            //
            <Reveal
              key={item.nombre + item.zona}
              indice={i % 3}
              className="flex h-full flex-col rounded-tarjeta border border-tinta-200 bg-white p-6 shadow-tarjeta"
            >
              <Estrellas />
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-tinta-700">
                “{item.texto}”
              </p>
              <div className="mt-5 border-t border-tinta-100 pt-4">
                <p className="font-titulo text-[15px] font-bold text-tinta-900">
                  {item.nombre}
                </p>
                <p className="text-[13px] text-tinta-500">{item.zona}</p>
                <p className="mt-1.5 inline-block rounded-control bg-marca-50 px-2.5 py-1 text-[12px] font-semibold text-marca-700">
                  {item.producto}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-4 rounded-bloque border border-tinta-200 bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-marca-700 text-white">
              <IconoUsuarios className="h-5 w-5" />
            </span>
            <div>
              <Estrellas />
              <p className="mt-1 text-sm font-medium text-tinta-700">
                {t.testimonios.reputacion}
              </p>
            </div>
          </div>
          <BotonDiagnostico origen="testimonios" tamano="md" className="shrink-0" />
        </Reveal>

        {/* ⚠️ Aviso DELIBERADAMENTE visible, no un gris pequeñito al pie: son
            testimonios inventados publicados bajo el nombre de una persona
            real. En cuanto haya reseñas verdaderas, se sustituyen en
            i18n/es.js y se pone site.testimoniosSonEjemplo = false. */}
        {site.testimoniosSonEjemplo ? (
          <p className="mx-auto mt-8 max-w-lectura rounded-tarjeta border-2 border-amber-400 bg-amber-50 p-4 text-center text-[13px] font-semibold leading-relaxed text-amber-900">
            {t.testimonios.aviso}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default Testimonios
