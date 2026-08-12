import site, { esMarcador } from '../config/site.js'
import { useIdioma } from '../i18n/index.jsx'
import { IconoEscudo, IconoFlecha } from './ui/Iconos.jsx'

/**
 * Página /privacidad.
 *
 * ⚠️ ES UNA PLANTILLA. Debe revisarla el dueño o su abogado antes de publicar:
 * un agente de seguros con licencia en Florida puede tener obligaciones
 * estatales adicionales sobre los datos de sus clientes que este texto no
 * cubre. El aviso amarillo de arriba lo dice también en la propia página.
 */
export function Privacidad({ irA }) {
  const { t } = useIdioma()

  const volver = (e) => {
    if (!irA) return
    e.preventDefault()
    irA('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-tinta-100 bg-white">
        <div className="mx-auto flex max-w-contenido items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a href="/" onClick={volver} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-control bg-marca-700 text-white">
              <IconoEscudo className="h-5 w-5" />
            </span>
            <span className="font-titulo text-[15px] font-bold text-marca-800 sm:text-base">
              {site.nombre}
            </span>
          </a>
        </div>
      </header>

      <div>
        <main className="mx-auto max-w-lectura px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="font-titulo text-3xl font-bold tracking-tight text-tinta-900 sm:text-4xl">
            {t.privacidad.titulo}
          </h1>
          <p className="mt-2 text-sm text-tinta-500">
            {t.privacidad.actualizado}: {t.privacidad.fecha}
          </p>

          <div className="mt-6 rounded-tarjeta border-2 border-amber-400 bg-amber-50 p-4 text-[13px] leading-relaxed text-amber-900">
            {t.privacidad.aviso}
          </div>

          <div className="mt-10 space-y-8">
            {t.privacidad.secciones.map((s) => (
              //
              <section key={s.titulo}>
                <h2 className="font-titulo text-xl font-bold text-tinta-900">{s.titulo}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-tinta-600">{s.texto}</p>
              </section>
            ))}
          </div>

          <div className="mt-10 rounded-tarjeta border border-tinta-200 bg-superficie-100 p-5 text-[15px] leading-relaxed text-tinta-700">
            <p className="font-titulo font-semibold text-tinta-900">{site.nombre}</p>
            {!esMarcador(site.correo) ? <p className="mt-1">{site.correo}</p> : null}
            {!esMarcador(site.telefono) ? <p>{site.telefono}</p> : null}
            <p className="mt-1">
              {site.paisNombre}
            </p>
          </div>

          <a
            href="/"
            onClick={volver}
            className="mt-10 inline-flex items-center gap-2 rounded-control bg-marca-700 px-5 py-3 font-titulo font-semibold text-white hover:bg-marca-800"
          >
            {t.privacidad.volver}
            <IconoFlecha className="h-4 w-4" />
          </a>
        </main>
      </div>
    </div>
  )
}

export default Privacidad
