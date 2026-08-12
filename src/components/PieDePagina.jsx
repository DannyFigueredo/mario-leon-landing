import site, { telHref, esMarcador } from '../config/site.js'
import { useIdioma, horarioTexto, licenciaTexto } from '../i18n/index.jsx'
import { trackLead } from '../lib/pixel.js'
import { BotonWhatsapp, BotonLlamar } from './ui/Botones.jsx'
import {
  IconoEscudo,
  IconoTelefono,
  IconoCorreo,
  IconoReloj,
  IconoUbicacion,
  IconoInstagram,
  IconoFacebook,
} from './ui/Iconos.jsx'

/**
 * Pie oscuro. Repite contacto y CTAs (nadie debería tener que subir para
 * encontrarlos) y lista las zonas de servicio, que además ayuda al SEO local.
 *
 * El disclaimer de seguros es TEXTO DE PLANTILLA: debe revisarlo el dueño o su
 * abogado antes de publicar.
 */
export function PieDePagina({ irA }) {
  const { t } = useIdioma()
  const anio = new Date().getFullYear()
  const hayRedes = !esMarcador(site.redes.instagram) || !esMarcador(site.redes.facebook)

  return (
    <footer className="bg-marca-900 text-white/80">
      <div className="mx-auto max-w-contenido px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-control bg-white/10 text-acento-300">
                <IconoEscudo className="h-5 w-5" />
              </span>
              <span className="font-titulo text-lg font-bold text-white">{site.nombre}</span>
            </div>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed">{t.footer.descripcion}</p>
            <p className="mt-4 inline-flex items-start gap-2 rounded-control border border-white/15 bg-white/5 px-3 py-2 text-[13px] leading-snug text-white/75">
              <IconoEscudo className="mt-0.5 h-4 w-4 shrink-0 text-acento-300" />
              <span>{licenciaTexto(t)}</span>
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row lg:flex-col xl:flex-row">
              <BotonWhatsapp origen="footer" mensaje={t.flotantes.waMensaje} tamano="sm" />
              <BotonLlamar origen="footer" variante="contornoClaro" tamano="sm" />
            </div>
          </div>

          <div>
            <h3 className="font-titulo text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.contacto}
            </h3>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <a
                  href={telHref()}
                  onClick={() => trackLead('llamada-footer', { tipo: 'llamada' })}
                  className="flex items-start gap-2.5 hover:text-white"
                >
                  <IconoTelefono className="mt-0.5 h-4 w-4 shrink-0 text-acento-300" />
                  <span>{site.telefono}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconoCorreo className="mt-0.5 h-4 w-4 shrink-0 text-acento-300" />
                <span className="break-all">{site.correo}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconoReloj className="mt-0.5 h-4 w-4 shrink-0 text-acento-300" />
                <span>
                  <span className="block text-[13px] uppercase tracking-wide text-white/50">
                    {t.footer.horario}
                  </span>
                  {horarioTexto(t)}
                </span>
              </li>
            </ul>

            {hayRedes ? (
              <div className="mt-6">
                <h3 className="font-titulo text-sm font-bold uppercase tracking-wider text-white">
                  {t.footer.redes}
                </h3>
                <div className="mt-3 flex gap-2">
                  {!esMarcador(site.redes.instagram) ? (
                    <a
                      href={site.redes.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex h-9 w-9 items-center justify-center rounded-control border border-white/20 hover:bg-white/10"
                    >
                      <IconoInstagram />
                    </a>
                  ) : null}
                  {!esMarcador(site.redes.facebook) ? (
                    <a
                      href={site.redes.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex h-9 w-9 items-center justify-center rounded-control border border-white/20 hover:bg-white/10"
                    >
                      <IconoFacebook />
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <h3 className="font-titulo text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.servicios}
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {site.productos.map((p) => (
                //
                <li key={p.clave}>
                  <a href="#servicios" className="hover:text-white">
                    {t.servicios.items[p.clave].nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-titulo text-sm font-bold uppercase tracking-wider text-white">
              {t.footer.zonas}
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed">{t.footer.zonasTexto}</p>
            {/* Sin sede física: no hay lista de barrios ni de ciudades, solo
                la cobertura real. Y si Mario confirma que su licencia solo
                cubre ciertos estados, `site.cobertura.estados` los lista. */}
            <p className="mt-4 inline-flex items-start gap-2 rounded-control border border-white/15 px-3 py-2 text-[13px] leading-snug text-white/75">
              <IconoUbicacion className="mt-0.5 h-4 w-4 shrink-0 text-acento-300" />
              <span>
                {site.cobertura.texto}
                {site.cobertura.estados ? ` · ${site.cobertura.estados.join(', ')}` : ''}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-[12px] leading-relaxed text-white/55">{t.footer.disclaimer}</p>
          <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-acento-400/80">
            {t.footer.disclaimerNota}
          </p>

          <div className="mt-6 flex flex-col gap-3 text-[13px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {anio} {site.nombre}. {t.footer.derechos}
            </p>
            <a
              href="/privacidad"
              onClick={(e) => {
                if (irA) {
                  e.preventDefault()
                  irA('/privacidad')
                }
              }}
              className="font-medium underline underline-offset-4 hover:text-white"
            >
              {t.footer.privacidad}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PieDePagina
