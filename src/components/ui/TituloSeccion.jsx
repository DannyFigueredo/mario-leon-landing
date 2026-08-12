import Reveal from './Reveal.jsx'

/**
 * Encabezado estándar de sección: antetítulo pequeño en color de acento,
 * título grande en Poppins y subtítulo en Inter.
 *
 * `sobreOscuro` invierte los colores para las secciones de fondo de marca.
 */
export function TituloSeccion({
  antetitulo,
  titulo,
  subtitulo,
  sobreOscuro = false,
  centrado = true,
  className = '',
}) {
  return (
    <div
      className={[
        'max-w-lectura',
        centrado ? 'mx-auto text-center' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {antetitulo ? (
        <Reveal>
          <p
            className={[
              'mb-3 font-titulo text-xs font-semibold uppercase tracking-[0.18em]',
              sobreOscuro ? 'text-acento-300' : 'text-acento-700',
            ].join(' ')}
          >
            {antetitulo}
          </p>
        </Reveal>
      ) : null}

      <Reveal indice={1}>
        <h2
          className={[
            'font-titulo text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]',
            sobreOscuro ? 'text-white' : 'text-tinta-900',
          ].join(' ')}
        >
          {titulo}
        </h2>
      </Reveal>

      {subtitulo ? (
        <Reveal indice={2}>
          <p
            className={[
              'mt-4 text-base leading-relaxed sm:text-lg',
              sobreOscuro ? 'text-white/80' : 'text-tinta-600',
            ].join(' ')}
          >
            {subtitulo}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}

export default TituloSeccion
