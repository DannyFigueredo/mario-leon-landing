import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import site, { telHref, waHref, esMarcador } from '../config/site.js'
import { useIdioma } from '../i18n/index.jsx'
import { trackLead } from '../lib/pixel.js'
import { IconoWhatsapp, IconoTelefono, IconoEquis } from './ui/Iconos.jsx'

/**
 * Contacto siempre a un toque:
 *   · móvil     → barra fija inferior con WhatsApp + Llamar
 *   · escritorio→ burbuja de WhatsApp con globo de mensaje
 *
 * Aparecen tras pasar el hero, para no tapar los CTAs grandes de arriba.
 *
 * ⚠️ Trampa 16: nada de `will-change` en los ancestros de estos elementos —
 * crearía un bloque contenedor y `position: fixed` dejaría de funcionar.
 */
export function BotonesFlotantes() {
  const { t, idioma } = useIdioma()
  const [visible, setVisible] = useState(false)
  const [globoVisible, setGloboVisible] = useState(false)

  useEffect(() => {
    const alScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  useEffect(() => {
    if (!visible) return undefined
    const id = window.setTimeout(() => setGloboVisible(true), 1400)
    return () => window.clearTimeout(id)
  }, [visible])

  const enlaceWa = waHref(t.flotantes.waMensaje)

  return (
    <>
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-black/10 bg-white shadow-elevada sm:hidden"
          >
            <a
              href={enlaceWa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLead('whatsapp-barra-movil', { tipo: 'whatsapp', idioma })}
              className="flex items-center justify-center gap-2 bg-whatsapp py-4 font-titulo text-[15px] font-bold text-white"
            >
              <IconoWhatsapp className="h-5 w-5" />
              {t.flotantes.whatsapp}
            </a>
            <a
              href={telHref()}
              onClick={() => trackLead('llamada-barra-movil', { tipo: 'llamada', idioma })}
              className="flex items-center justify-center gap-2 bg-marca-700 py-4 font-titulo text-[15px] font-bold text-white"
            >
              <IconoTelefono className="h-5 w-5" />
              {esMarcador(site.telefono) ? t.flotantes.llamar : site.telefono}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="fixed bottom-6 right-6 z-40 hidden items-end gap-3 sm:flex"
          >
            <AnimatePresence>
              {globoVisible ? (
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  className="mb-1 flex max-w-[15rem] items-start gap-2 rounded-tarjeta bg-white px-4 py-3 text-[13px] font-medium leading-snug text-tinta-700 shadow-elevada"
                >
                  <span>{t.flotantes.globo}</span>
                  <button
                    type="button"
                    onClick={() => setGloboVisible(false)}
                    aria-label={t.flotantes.cerrarGlobo}
                    className="-mr-1 -mt-1 shrink-0 rounded-control p-1 text-tinta-400 hover:bg-superficie-100"
                  >
                    <IconoEquis className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <a
              href={enlaceWa}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.flotantes.whatsapp}
              onClick={() => trackLead('whatsapp-burbuja', { tipo: 'whatsapp', idioma })}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-whatsapp text-white shadow-elevada transition-transform duration-200 hover:scale-105"
            >
              <IconoWhatsapp className="h-7 w-7" />
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Reserva de espacio para que la barra móvil no tape el pie. */}
      {visible ? <div aria-hidden="true" className="h-14 sm:hidden" /> : null}
    </>
  )
}

export default BotonesFlotantes
