import site from '../config/site.js'
import { imagenes } from '../config/images.js'
import { t } from '../i18n/index.jsx'
import SmartImage from './ui/SmartImage.jsx'
import Reveal from './ui/Reveal.jsx'
import TituloSeccion from './ui/TituloSeccion.jsx'
import { BotonWhatsapp, BotonDiagnostico } from './ui/Botones.jsx'
import { IconoCheck, IconoCorazon, IconoGrafica, IconoReloj, IconoFlor, IconoChat } from './ui/Iconos.jsx'

const ICONO_PRODUCTO = {
  iul: IconoGrafica,
  termino: IconoReloj,
  finales: IconoFlor,
  anualidades: IconoCorazon,
  consulta: IconoChat,
}

/**
 * Cuatro líneas de producto + la consulta inicial, que va marcada como
 * `destacada` en site.js y se muestra como tarjeta ANCHA con el color de
 * marca: no es un producto, es la oferta de entrada.
 *
 * Cada tarjeta lleva su PROPIO mensaje prellenado de WhatsApp, para saber por
 * qué producto escriben.
 *
 * El texto es de BENEFICIO, no ficha técnica, y en ningún punto hay cifras de
 * rendimiento, tasas ni retornos.
 */
export function Servicios() {
  return (
    <section id="servicios" className="scroll-mt-20 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-contenido px-4 sm:px-6 lg:px-8">
        <TituloSeccion
          antetitulo={t.nav.servicios}
          titulo={t.servicios.titulo}
          subtitulo={t.servicios.subtitulo}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.productos.map((producto, i) => {
            const p = t.servicios.items[producto.clave]
            const Icono = ICONO_PRODUCTO[producto.clave]
            const foto = imagenes.servicios[producto.clave]

            // La tarjeta destacada ocupa dos columnas y va en horizontal.
            if (producto.destacada) {
              return (
                //
                <Reveal
                  key={producto.clave}
                  indice={1}
                  tipo="zoom"
                  className="flex h-full flex-col overflow-hidden rounded-tarjeta bg-marca-700 text-white shadow-elevada sm:col-span-2 lg:flex-row"
                >
                  <SmartImage
                    src={foto.src}
                    alt={foto.alt}
                    className="h-44 w-full lg:h-auto lg:w-2/5 lg:shrink-0"
                  />
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-white/15 text-white">
                        <Icono className="h-5 w-5" />
                      </span>
                      <h3 className="font-titulo text-xl font-bold leading-tight">{p.nombre}</h3>
                    </div>
                    <p className="font-titulo text-[15px] font-semibold text-acento-300">
                      {p.resumen}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/85">
                      {p.descripcion}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {p.puntos.map((punto) => (
                        //
                        <li key={punto} className="flex items-center gap-2 text-sm text-white/90">
                          <IconoCheck className="h-4 w-4 shrink-0 text-acento-300" />
                          <span>{punto}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                      <BotonDiagnostico origen="servicio-consulta" variante="claro" />
                      <BotonWhatsapp
                        origen={`servicio-${producto.clave}`}
                        mensaje={p.waMensaje}
                      >
                        {t.servicios.ctaTarjeta}
                      </BotonWhatsapp>
                    </div>
                  </div>
                </Reveal>
              )
            }

            return (
              //
              <Reveal
                key={producto.clave}
                indice={i % 3}
                tipo="zoom"
                className="flex h-full flex-col overflow-hidden rounded-tarjeta border border-tinta-200 bg-white shadow-tarjeta transition-shadow duration-300 hover:shadow-elevada"
              >
                <SmartImage src={foto.src} alt={foto.alt} className="h-44 w-full" />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-marca-50 text-marca-700">
                      <Icono className="h-5 w-5" />
                    </span>
                    <h3 className="font-titulo text-lg font-bold leading-tight text-tinta-900">
                      {p.nombre}
                    </h3>
                  </div>

                  <p className="font-titulo text-[15px] font-semibold text-marca-700">
                    {p.resumen}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-tinta-600">
                    {p.descripcion}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {p.puntos.map((punto) => (
                      //
                      <li key={punto} className="flex items-start gap-2 text-sm text-tinta-700">
                        <IconoCheck className="mt-0.5 h-4 w-4 shrink-0 text-acento-600" />
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-1">
                    <BotonWhatsapp
                      origen={`servicio-${producto.clave}`}
                      mensaje={p.waMensaje}
                      tamano="sm"
                      bloque
                    >
                      {t.servicios.ctaTarjeta}
                    </BotonWhatsapp>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-4 rounded-bloque border border-tinta-200 bg-superficie-100 p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="font-titulo text-lg font-semibold text-tinta-800">{t.servicios.cierre}</p>
          <BotonDiagnostico origen="servicios" tamano="md" className="shrink-0">
            {t.servicios.cierreCta}
          </BotonDiagnostico>
        </Reveal>
      </div>
    </section>
  )
}

export default Servicios
