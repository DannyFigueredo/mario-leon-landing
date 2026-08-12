import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import site, { telHref, esMarcador } from '../config/site.js'
import { useIdioma } from '../i18n/index.jsx'
import { trackLead } from '../lib/pixel.js'
import { BotonDiagnostico } from './ui/Botones.jsx'
import { IconoMenu, IconoEquis, IconoTelefono, IconoEscudo } from './ui/Iconos.jsx'

const ENLACES = [
  { href: '#servicios', clave: 'servicios' },
  { href: '#por-que', clave: 'porQue' },
  { href: '#proceso', clave: 'proceso' },
  { href: '#testimonios', clave: 'testimonios' },
]

/**
 * Barra fija. Transparente sobre el hero, sólida al bajar.
 * `position: fixed` — no depende de ningún ancestro, así que ningún
 * `overflow` la puede romper (a diferencia de sticky, trampa 3).
 */
export function BarraSuperior() {
  const { t } = useIdioma()
  const [bajado, setBajado] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const alScroll = () => setBajado(window.scrollY > 40)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuAbierto])

  const solida = bajado || menuAbierto

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        solida ? 'bg-white/95 shadow-barra backdrop-blur' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-contenido items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          aria-label={t.nav.irAlInicio}
          className="flex shrink-0 items-center gap-2.5"
        >
          <span
            className={[
              'flex h-9 w-9 items-center justify-center rounded-control transition-colors',
              solida ? 'bg-marca-700 text-white' : 'bg-white/15 text-white ring-1 ring-white/40',
            ].join(' ')}
          >
            <IconoEscudo className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span
              className={[
                'block font-titulo text-[15px] font-bold tracking-tight sm:text-base',
                solida ? 'text-marca-800' : 'text-white',
              ].join(' ')}
            >
              {site.nombre}
            </span>
            <span
              className={[
                'hidden text-[11px] font-medium sm:block',
                solida ? 'text-tinta-500' : 'text-white/75',
              ].join(' ')}
            >
              En todo Estados Unidos
            </span>
          </span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {ENLACES.map((e) => (
            //
            <a
              key={e.href}
              href={e.href}
              className={[
                'rounded-control px-3 py-2 text-sm font-medium transition-colors',
                solida
                  ? 'text-tinta-600 hover:bg-superficie-100 hover:text-marca-700'
                  : 'text-white/90 hover:bg-white/10 hover:text-white',
              ].join(' ')}
            >
              {t.nav[e.clave]}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-3">

          <a
            href={telHref()}
            onClick={() => trackLead('llamada-barra', { tipo: 'llamada' })}
            className={[
              'hidden items-center gap-2 rounded-control px-3 py-2 text-sm font-semibold transition-colors md:inline-flex',
              solida
                ? 'text-marca-800 hover:bg-superficie-100'
                : 'text-white hover:bg-white/10',
            ].join(' ')}
          >
            <IconoTelefono className="h-4 w-4" />
            <span>{esMarcador(site.telefono) ? t.nav.llamar : site.telefono}</span>
          </a>

          <BotonDiagnostico
            origen="barra"
            tamano="sm"
            variante={solida ? 'marca' : 'claro'}
            className="hidden sm:inline-flex"
          />

          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            aria-label={menuAbierto ? t.nav.cerrarMenu : t.nav.abrirMenu}
            aria-expanded={menuAbierto}
            className={[
              'inline-flex h-10 w-10 items-center justify-center rounded-control transition-colors lg:hidden',
              solida ? 'text-marca-800 hover:bg-superficie-100' : 'text-white hover:bg-white/10',
            ].join(' ')}
          >
            {menuAbierto ? <IconoEquis /> : <IconoMenu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuAbierto ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-tinta-100 bg-white lg:hidden"
          >
            <nav className="mx-auto flex max-w-contenido flex-col gap-1 px-4 py-4 sm:px-6">
              {ENLACES.map((e) => (
                //
                <a
                  key={e.href}
                  href={e.href}
                  onClick={() => setMenuAbierto(false)}
                  className="rounded-control px-3 py-3 font-titulo text-base font-medium text-tinta-700 hover:bg-superficie-100"
                >
                  {t.nav[e.clave]}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-tinta-100 pt-4">
                <BotonDiagnostico origen="menu-movil" bloque onClick={() => setMenuAbierto(false)} />
                <a
                  href={telHref()}
                  onClick={() => {
                    trackLead('llamada-menu-movil', { tipo: 'llamada' })
                    setMenuAbierto(false)
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-control border-2 border-marca-700 px-4 py-3 font-titulo font-semibold text-marca-800"
                >
                  <IconoTelefono className="h-5 w-5" />
                  {esMarcador(site.telefono) ? t.nav.llamar : site.telefono}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default BarraSuperior
