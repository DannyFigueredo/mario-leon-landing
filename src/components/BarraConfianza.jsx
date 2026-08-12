import { t } from '../i18n/index.jsx'
import Reveal from './ui/Reveal.jsx'
import TituloSeccion from './ui/TituloSeccion.jsx'
import { IconoChat, IconoDocumento, IconoReloj, IconoEscudo } from './ui/Iconos.jsx'

/**
 * Barra de confianza.
 *
 * ⚠️ Aquí NO hay logos ni nombres de aseguradoras. El BLOQUE 0 no dice con qué
 * compañías trabaja Mario, y poner nombres de aseguradoras sin saberlo sería
 * inventarle acuerdos comerciales que quizá no tiene. Si Mario confirma con
 * qué carriers está nombrado, este es el sitio donde irían — como texto,
 * nunca como logo (los logos necesitan autorización de cada aseguradora).
 *
 * Mientras tanto, la confianza se construye con CÓMO trabaja, que es su
 * diferenciador real.
 */
const ICONOS = [IconoChat, IconoDocumento, IconoReloj, IconoEscudo]

export function BarraConfianza() {
  return (
    <section className="bg-superficie-200 py-16 sm:py-20">
      <div className="mx-auto max-w-contenido px-4 sm:px-6 lg:px-8">
        <TituloSeccion titulo={t.confianza.titulo} subtitulo={t.confianza.subtitulo} />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {t.confianza.items.map((item, i) => {
            const Icono = ICONOS[i] || IconoEscudo
            return (
              //
              <Reveal
                as="li"
                key={item.titulo}
                indice={i}
                className="flex h-full flex-col rounded-tarjeta border border-tinta-200 bg-white p-6 shadow-tarjeta"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-control bg-marca-700 text-white">
                  <Icono className="h-5 w-5" />
                </span>
                <h3 className="font-titulo text-lg font-bold leading-snug text-tinta-900">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-tinta-600">{item.texto}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default BarraConfianza
