import { motion } from 'framer-motion'
import { soportaIntersectionObserver } from '../../lib/entorno.js'
import { aparecer, aparecerZoom, aparecerDesde, enPantalla, prefiereMenosMovimiento } from '../../lib/animaciones.js'

const VARIANTES = {
  arriba: aparecer,
  zoom: aparecerZoom,
  izquierda: aparecerDesde('izquierda'),
  derecha: aparecerDesde('derecha'),
}

/**
 * Envoltorio de animación al entrar en pantalla.
 *
 * ⚠️ TRAMPA 12: si no existe `IntersectionObserver` (webview de Instagram /
 * Facebook), NO se monta ningún componente de motion con `whileInView`:
 * se renderiza el contenido tal cual, visible y sin animar. La landing sigue
 * mostrando todas sus secciones y todos sus CTAs.
 *
 * Lo mismo si el usuario tiene `prefers-reduced-motion: reduce`.
 */
export function Reveal({
  children,
  tipo = 'arriba',
  indice = 0,
  className = '',
  as = 'div',
  ...props
}) {
  const Etiqueta = as

  if (!soportaIntersectionObserver || prefiereMenosMovimiento()) {
    return (
      <Etiqueta className={className} {...props}>
        {children}
      </Etiqueta>
    )
  }

  const Motion = motion[as] || motion.div
  return (
    <Motion
      className={className}
      variants={VARIANTES[tipo] || aparecer}
      custom={indice}
      {...enPantalla}
      {...props}
    >
      {children}
    </Motion>
  )
}

export default Reveal
