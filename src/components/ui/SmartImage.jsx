import { useState } from 'react'
import { tema } from '../../config/theme.js'

/**
 * Imagen con:
 *   · `loading="lazy"` + `decoding="async"` (salvo `priority`, para el hero)
 *   · skeleton mientras carga y fade-in al terminar
 *   · FALLBACK automático a un SVG con los colores de la marca si la URL falla
 *
 * ⚠️ Trampa 5: dentro de un grid, el contenedor lleva ALTURA FIJA (o una clase
 * de aspect-ratio) y la imagen va `absolute inset-0 h-full w-full object-cover`.
 *
 * ⚠️ Trampa 7: el wrapper NO añade `relative` si por props ya viene una clase
 * de posición (`absolute`/`fixed`). Tailwind emite `relative` DESPUÉS de
 * `absolute` en la hoja de estilos, así que `relative` ganaría y el contenedor
 * se saldría de su sitio — que es justo lo que pasaba con la foto del hero.
 */
const TIENE_POSICION = /(^|\s)(absolute|fixed|sticky|static)(\s|$)/
export function SmartImage({
  src,
  srcSet,
  sizes,
  alt = '',
  priority = false,
  className = '',
  imgClassName = '',
  posicion = 'object-center',
  fallback = 'marca', // 'marca' (escudo) | 'persona' (silueta, para retratos)
}) {
  const [estado, setEstado] = useState('cargando') // cargando | ok | error

  const marca = tema.colores.marca
  const acento = tema.colores.acento

  const posicionWrapper = TIENE_POSICION.test(className) ? '' : 'relative'

  return (
    <div
      className={['overflow-hidden bg-superficie-200', posicionWrapper, className]
        .filter(Boolean)
        .join(' ')}
    >
      {estado === 'cargando' ? (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-superficie-200 to-superficie-300"
          aria-hidden="true"
        />
      ) : null}

      {estado === 'error' ? (
        // Fallback de marca: nunca se ve un hueco roto ni un icono de imagen rota.
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label={alt}
        >
          <defs>
            <linearGradient id="grad-smart" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={marca[700]} />
              <stop offset="100%" stopColor={marca[900]} />
            </linearGradient>
          </defs>
          <rect width="400" height="300" fill="url(#grad-smart)" />
          <g
            transform="translate(200 150)"
            fill="none"
            stroke={acento[400]}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          >
            {fallback === 'persona' ? (
              // Silueta neutra: mientras no esté la foto real del asesor, no se
              // pone la cara de otra persona en su lugar.
              <>
                <circle cx="0" cy="-26" r="22" />
                <path d="M-40 44c0-22 17.9-38 40-38s40 16 40 38" />
              </>
            ) : (
              <>
                <path d="M0-42 -30-30v24c0 16.8 11.6 31.2 30 36 18.4-4.8 30-19.2 30-36v-24L0-42Z" />
                <path d="m-12-6 8 8 16-16" />
              </>
            )}
          </g>
        </svg>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setEstado('ok')}
          onError={() => setEstado('error')}
          className={[
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            posicion,
            estado === 'ok' ? 'opacity-100' : 'opacity-0',
            imgClassName,
          ]
            .filter(Boolean)
            .join(' ')}
        />
      )}
    </div>
  )
}

export default SmartImage
