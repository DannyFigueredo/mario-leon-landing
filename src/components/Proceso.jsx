import { imagenes } from '../config/images.js'
import { useIdioma } from '../i18n/index.jsx'
import Reveal from './ui/Reveal.jsx'
import TituloSeccion from './ui/TituloSeccion.jsx'
import SmartImage from './ui/SmartImage.jsx'
import { BotonDiagnostico, BotonWhatsapp } from './ui/Botones.jsx'
import { IconoChat, IconoDocumento, IconoEscudo, IconoCheck } from './ui/Iconos.jsx'

const ICONOS = [IconoChat, IconoDocumento, IconoEscudo]

/**
 * Proceso en 3 pasos, adaptado a seguros.
 *
 * Los micro-datos de cada paso son GARANTÍAS ("sin costo", "sin presión",
 * "acompañamiento incluido"), nunca promesas de tiempo tipo "en minutos":
 * una póliza de vida no se emite en minutos y prometerlo sería mentir.
 */
export function Proceso() {
  const { t } = useIdioma()

  const fotos = [imagenes.llamada, imagenes.documento, imagenes.tranquilidad]

  return (
    <section id="proceso" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-contenido px-4 sm:px-6 lg:px-8">
        <TituloSeccion
          antetitulo={t.nav.proceso}
          titulo={t.proceso.titulo}
          subtitulo={t.proceso.subtitulo}
        />

        <ol className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
          {t.proceso.pasos.map((paso, i) => {
            const Icono = ICONOS[i]
            const foto = fotos[i]
            return (
              //
              <Reveal
                as="li"
                key={paso.numero}
                indice={i}
                className="relative flex h-full flex-col overflow-hidden rounded-tarjeta border border-tinta-200 bg-white shadow-tarjeta"
              >
                <SmartImage
                  src={foto.src}
                  alt={foto.alt}
                  className="h-40 w-full"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-[8.25rem] flex h-12 w-12 items-center justify-center rounded-control bg-marca-700 font-titulo text-lg font-bold text-white shadow-elevada"
                >
                  {paso.numero}
                </span>

                <div className="flex flex-1 flex-col p-5 pt-10 sm:p-6 sm:pt-11">
                  <div className="mb-2 flex items-center gap-2.5">
                    <Icono className="h-5 w-5 shrink-0 text-acento-600" />
                    <h3 className="font-titulo text-lg font-bold text-tinta-900">{paso.titulo}</h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-tinta-600">{paso.texto}</p>
                  <p className="mt-auto pt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-control bg-marca-50 px-3 py-1.5 text-xs font-semibold text-marca-700">
                      <IconoCheck className="h-3.5 w-3.5" />
                      {paso.garantia}
                    </span>
                  </p>
                </div>
              </Reveal>
            )
          })}
        </ol>

        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BotonDiagnostico origen="proceso" tamano="lg">
            {t.proceso.cta}
          </BotonDiagnostico>
          <BotonWhatsapp
            origen="proceso"
            mensaje={t.proceso.waMensaje}
            variante="contorno"
            tamano="lg"
          >
            {t.hero.ctaWhatsapp}
          </BotonWhatsapp>
        </Reveal>
      </div>
    </section>
  )
}

export default Proceso
