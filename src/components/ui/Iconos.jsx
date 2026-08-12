/**
 * Todos los iconos del sitio, SVG en línea. Sin librerías de iconos.
 * Trazo de 1.75 para que se lean bien en móvil sin verse pesados.
 */
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const Svg = ({ children, className = 'h-6 w-6', ...props }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base} {...props}>
    {children}
  </svg>
)

export const IconoTelefono = (p) => (
  <Svg {...p}>
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />
  </Svg>
)

export const IconoWhatsapp = ({ className = 'h-6 w-6', ...p }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22.5l5.86-1.5a9.8 9.8 0 0 0 4.18.94h.01c5.43 0 9.83-4.4 9.83-9.84C21.88 6.4 17.47 2 12.04 2Zm0 17.94a8.2 8.2 0 0 1-4.16-1.13l-.3-.18-3.1.8.83-3.02-.2-.31a8.13 8.13 0 0 1-1.25-4.35c0-4.5 3.68-8.17 8.19-8.17 2.19 0 4.24.85 5.79 2.4a8.11 8.11 0 0 1 2.39 5.78c0 4.5-3.68 8.18-8.19 8.18Zm4.49-6.12c-.24-.13-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.77.97-.14.16-.28.18-.52.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.43.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.75-1.82-.2-.47-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.65 4.2 3.71.59.26 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.45-.6 1.66-1.17.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.46-.28Z" />
  </svg>
)

export const IconoFlecha = (p) => (
  <Svg {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
)

export const IconoCheck = (p) => (
  <Svg {...p}>
    <path d="m4.5 12.5 5 5 10-11" />
  </Svg>
)

export const IconoEquis = (p) => (
  <Svg {...p}>
    <path d="M6 6 18 18M18 6 6 18" />
  </Svg>
)

export const IconoMenu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const IconoEscudo = (p) => (
  <Svg {...p}>
    <path d="M12 3 5 6v6c0 4.2 2.9 7.8 7 9 4.1-1.2 7-4.8 7-9V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
)

export const IconoCorazon = (p) => (
  <Svg {...p}>
    <path d="M12 20s-7-4.3-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.7 12 20 12 20Z" />
  </Svg>
)

export const IconoGrafica = (p) => (
  <Svg {...p}>
    <path d="M4 19h16" />
    <path d="m5 15 4-5 3.5 3L19 5.5" />
    <path d="M19 10V5.5h-4.5" />
  </Svg>
)

export const IconoReloj = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 1.8" />
  </Svg>
)

export const IconoCasa = (p) => (
  <Svg {...p}>
    <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9.5Z" />
  </Svg>
)

export const IconoCalendario = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
  </Svg>
)

export const IconoDocumento = (p) => (
  <Svg {...p}>
    <path d="M14 3.5H7a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5Z" />
    <path d="M13.5 3.5V8h5M8.5 13h7M8.5 16.5h4.5" />
  </Svg>
)

export const IconoFlor = (p) => (
  <Svg {...p}>
    <path d="M12 21c-3.5-2.5-6-5.4-6-8.7A6 6 0 0 1 12 6a6 6 0 0 1 6 6.3c0 3.3-2.5 6.2-6 8.7Z" />
    <path d="M12 21V11" />
  </Svg>
)

export const IconoEstrella = ({ className = 'h-5 w-5', ...p }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" {...p}>
    <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />
  </svg>
)

export const IconoGlobo = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.2 2.4 3.3 5.3 3.3 8.5s-1.1 6.1-3.3 8.5c-2.2-2.4-3.3-5.3-3.3-8.5S9.8 5.9 12 3.5Z" />
  </Svg>
)

export const IconoChat = (p) => (
  <Svg {...p}>
    <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.42L4 20.5l1.2-3.4C4.15 15.9 3.5 14.3 3.5 12.5c0-3.6 3.8-6.5 8.5-6.5s8 2.9 8 6.5Z" />
  </Svg>
)

export const IconoUsuarios = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19.5c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" />
    <path d="M16 6.2a3 3 0 0 1 0 5.6M17.5 14.9c1.9.6 3.2 2.3 3.2 4.6" />
  </Svg>
)

export const IconoCandado = (p) => (
  <Svg {...p}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </Svg>
)

export const IconoCorreo = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7 8 5.5L20 7" />
  </Svg>
)

export const IconoUbicacion = (p) => (
  <Svg {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
)

export const IconoInstagram = ({ className = 'h-5 w-5', ...p }) => (
  <Svg className={className} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 7h.01" />
  </Svg>
)

export const IconoFacebook = ({ className = 'h-5 w-5', ...p }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.13-2.45-.13-2.42 0-4.08 1.48-4.08 4.2v2.34H7.5V13h2.67v8h3.33Z" />
  </svg>
)

/** Icono por clave de producto — lo usa la sección de servicios. */
export const ICONO_PRODUCTO = {
  vida: IconoEscudo,
  iul: IconoGrafica,
  termino: IconoReloj,
  anualidades: IconoCorazon,
  hipoteca: IconoCasa,
  finales: IconoFlor,
}

export default {
  IconoTelefono,
  IconoWhatsapp,
  IconoFlecha,
  IconoCheck,
  IconoEquis,
  IconoMenu,
  IconoEscudo,
  IconoCorazon,
  IconoGrafica,
  IconoReloj,
  IconoCasa,
  IconoCalendario,
  IconoDocumento,
  IconoFlor,
  IconoEstrella,
  IconoGlobo,
  IconoChat,
  IconoUsuarios,
  IconoCandado,
  IconoCorreo,
  IconoUbicacion,
  IconoInstagram,
  IconoFacebook,
  ICONO_PRODUCTO,
}
