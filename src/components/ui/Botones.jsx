import { motion } from 'framer-motion'
import { pulsoBoton } from '../../lib/animaciones.js'
import { trackLead } from '../../lib/pixel.js'
import site, { telHref, waHref } from '../../config/site.js'
import { IconoWhatsapp, IconoTelefono, IconoFlecha } from './Iconos.jsx'
import { useIdioma } from '../../i18n/index.jsx'

/**
 * Botones de la landing. TODOS los que generan contacto disparan `Lead`
 * etiquetado con su `origen`, para poder ver en el panel de anuncios qué CTA
 * está trabajando.
 *
 * Radios: siempre `rounded-control` (token de theme.js), nunca un radio suelto.
 */

const TAMANOS = {
  sm: 'px-4 py-2.5 text-sm gap-2',
  md: 'px-5 py-3 text-[15px] gap-2.5',
  lg: 'px-6 py-4 text-base gap-3 sm:px-8',
}

const VARIANTES = {
  // Color de marca: el CTA que manda.
  marca:
    'bg-marca-700 text-white hover:bg-marca-800 focus-visible:outline-marca-700 shadow-tarjeta',
  // Verde SOLO para WhatsApp (nunca como acento decorativo).
  whatsapp:
    'bg-whatsapp text-white hover:bg-whatsapp-oscuro focus-visible:outline-whatsapp',
  // Sobre fondos oscuros.
  claro:
    'bg-white text-marca-800 hover:bg-acento-50 focus-visible:outline-white shadow-tarjeta',
  contorno:
    'border-2 border-marca-700 text-marca-800 hover:bg-marca-50 focus-visible:outline-marca-700',
  contornoClaro:
    'border-2 border-white/70 text-white hover:bg-white/10 focus-visible:outline-white',
  acento:
    'bg-acento-500 text-marca-900 hover:bg-acento-400 focus-visible:outline-acento-500 shadow-tarjeta',
}

const claseBase =
  'inline-flex items-center justify-center rounded-control font-titulo font-semibold ' +
  'transition-colors duration-200 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none'

function Contenido({ children, icono: Icono, iconoFinal: IconoFinal }) {
  return (
    <>
      {Icono ? <Icono className="h-5 w-5 shrink-0" /> : null}
      <span>{children}</span>
      {IconoFinal ? <IconoFinal className="h-4 w-4 shrink-0" /> : null}
    </>
  )
}

/** Botón/enlace genérico. */
export function Boton({
  children,
  variante = 'marca',
  tamano = 'md',
  href,
  onClick,
  icono,
  iconoFinal,
  className = '',
  bloque = false,
  ...props
}) {
  const clases = [
    claseBase,
    TAMANOS[tamano],
    VARIANTES[variante],
    bloque ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const contenido = (
    <Contenido icono={icono} iconoFinal={iconoFinal}>
      {children}
    </Contenido>
  )

  if (href) {
    return (
      <motion.a href={href} onClick={onClick} className={clases} {...pulsoBoton} {...props}>
        {contenido}
      </motion.a>
    )
  }
  return (
    <motion.button type="button" onClick={onClick} className={clases} {...pulsoBoton} {...props}>
      {contenido}
    </motion.button>
  )
}

/** CTA principal: lleva al formulario. `origen` es obligatorio para medir. */
export function BotonDiagnostico({
  origen,
  children,
  variante = 'marca',
  tamano = 'md',
  ...props
}) {
  const { t } = useIdioma()
  return (
    <Boton
      href="#cotizar"
      variante={variante}
      tamano={tamano}
      iconoFinal={IconoFlecha}
      onClick={() => trackLead(`cta-${origen}`, { tipo: 'formulario' })}
      {...props}
    >
      {children || t.nav.cta}
    </Boton>
  )
}

/** CTA de WhatsApp con mensaje prellenado. */
export function BotonWhatsapp({
  origen,
  mensaje,
  children,
  variante = 'whatsapp',
  tamano = 'md',
  ...props
}) {
  const { t, idioma } = useIdioma()
  return (
    <Boton
      href={waHref(mensaje || t.flotantes.waMensaje)}
      target="_blank"
      rel="noopener noreferrer"
      variante={variante}
      tamano={tamano}
      icono={IconoWhatsapp}
      onClick={() => trackLead(`whatsapp-${origen}`, { tipo: 'whatsapp', idioma })}
      {...props}
    >
      {children || t.hero.ctaWhatsapp}
    </Boton>
  )
}

/** CTA de llamada. */
export function BotonLlamar({
  origen,
  children,
  variante = 'contorno',
  tamano = 'md',
  mostrarNumero = true,
  ...props
}) {
  const { t, idioma } = useIdioma()
  return (
    <Boton
      href={telHref()}
      variante={variante}
      tamano={tamano}
      icono={IconoTelefono}
      onClick={() => trackLead(`llamada-${origen}`, { tipo: 'llamada', idioma })}
      {...props}
    >
      {children || (mostrarNumero ? site.telefono : t.nav.llamar)}
    </Boton>
  )
}

export default { Boton, BotonDiagnostico, BotonWhatsapp, BotonLlamar }
