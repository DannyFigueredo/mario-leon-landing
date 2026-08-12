import { imagenes } from '../config/images.js'
import { useIdioma } from '../i18n/index.jsx'
import Reveal from './ui/Reveal.jsx'
import TituloSeccion from './ui/TituloSeccion.jsx'
import SmartImage from './ui/SmartImage.jsx'
import AntesDespues from './ui/AntesDespues.jsx'
import { BotonDiagnostico, BotonWhatsapp } from './ui/Botones.jsx'
import { IconoCheck, IconoEscudo } from './ui/Iconos.jsx'

/**
 * El bloque que más trabaja de la página.
 *
 * Cada punto TACHA primero el miedo (texto pequeño, tachado) y debajo lo
 * responde con el diferenciador real: diagnosticamos primero, trabajamos para
 * el cliente. Los miedos salen literales de lo que dice el dueño que escucha.
 */
export function PorQueElegirnos() {
  const { t } = useIdioma()

  return (
    <section id="por-que" className="scroll-mt-20 bg-superficie-100 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-contenido px-4 sm:px-6 lg:px-8">
        <TituloSeccion
          antetitulo={t.nav.porQue}
          titulo={t.porQue.titulo}
          subtitulo={t.porQue.subtitulo}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-12">
          <ul className="space-y-4">
            {t.porQue.items.map((item, i) => (
              //
              <Reveal as="li" key={item.miedo} indice={i} className="rounded-tarjeta border border-tinta-200 bg-white p-5 shadow-tarjeta sm:p-6">
                <p className="text-[13px] font-medium leading-snug text-tinta-400 line-through decoration-tinta-300">
                  “{item.miedo}”
                </p>
                <h3 className="mt-2.5 flex items-start gap-2.5 font-titulo text-lg font-bold leading-snug text-marca-800">
                  <IconoCheck className="mt-1 h-5 w-5 shrink-0 text-acento-600" />
                  <span>{item.respuesta}</span>
                </h3>
                <p className="mt-2 pl-[1.9rem] text-[15px] leading-relaxed text-tinta-600">
                  {item.detalle}
                </p>
              </Reveal>
            ))}
          </ul>

          {/* Columna lateral: la celda se deja en `stretch` (trampa 4) y el
              sticky se aplica al div interno, no a la celda del grid. */}
          <div className="lg:h-full">
            <div className="lg:sticky lg:top-24">
              <Reveal tipo="derecha">
                <SmartImage
                  src={imagenes.llamada.src}
                  alt={imagenes.llamada.alt}
                  className="h-56 w-full rounded-bloque shadow-tarjeta sm:h-72 lg:h-64"
                />
              </Reveal>

              <Reveal tipo="derecha" indice={1} className="mt-6 rounded-bloque bg-marca-700 p-6 text-white shadow-elevada">
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-control bg-white/15 text-acento-300">
                  <IconoEscudo className="h-5 w-5" />
                </span>
                <h3 className="font-titulo text-lg font-bold">{t.porQue.compromiso.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                  {t.porQue.compromiso.texto}
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <BotonDiagnostico origen="por-que" variante="acento" bloque />
                  <BotonWhatsapp origen="por-que" mensaje={t.porQue.waMensaje} bloque>
                    {t.porQue.cta}
                  </BotonWhatsapp>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <AntesDespues
            titulo={t.porQue.comparacion.titulo}
            sin={t.porQue.comparacion.sin}
            con={t.porQue.comparacion.con}
          />
        </div>
      </div>
    </section>
  )
}

export default PorQueElegirnos
