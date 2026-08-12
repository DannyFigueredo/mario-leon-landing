import { motion } from 'framer-motion'
import site from '../config/site.js'
import { imagenes } from '../config/images.js'
import { useIdioma } from '../i18n/index.jsx'
import { intensidad, prefiereMenosMovimiento } from '../lib/animaciones.js'
import { soportaIntersectionObserver } from '../lib/entorno.js'
import SmartImage from './ui/SmartImage.jsx'
import { BotonDiagnostico, BotonWhatsapp } from './ui/Botones.jsx'
import { IconoCheck, IconoEscudo, IconoReloj } from './ui/Iconos.jsx'

/**
 * Hero. El titular pone el BENEFICIO primero y la ciudad después (SEO local).
 *
 * La urgencia es de protección y de prima por edad — nunca de emergencia.
 * No se usa `whileInView` aquí: el hero se ve al cargar, así que anima con
 * `animate` y funciona igual sin IntersectionObserver.
 */
export function Hero() {
  const { t } = useIdioma()
  const anima = soportaIntersectionObserver && !prefiereMenosMovimiento()

  const entrada = (i) =>
    anima
      ? {
          initial: { opacity: 0, y: intensidad.desplazamiento },
          animate: { opacity: 1, y: 0 },
          transition: { duration: intensidad.duracion, delay: i * intensidad.stagger, ease: [0.16, 1, 0.3, 1] },
        }
      : {}

  return (
    <section id="inicio" className="relative isolate min-h-[92vh] overflow-hidden sm:min-h-[88vh]">
      <SmartImage
        src={imagenes.hero.src}
        srcSet={imagenes.hero.srcSet}
        sizes={imagenes.hero.sizes}
        alt={imagenes.hero.alt}
        priority
        className="absolute inset-0 h-full w-full"
        posicion="object-[50%_35%]"
      />
      {/* Degradado para que el texto se lea siempre, sea cual sea la foto. */}
      <div className="absolute inset-0 bg-degradado-hero" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-marca-900/30 mix-blend-multiply"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[92vh] max-w-contenido flex-col justify-center px-4 pb-24 pt-28 sm:min-h-[88vh] sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            {...entrada(0)}
            className="mb-5 inline-flex items-center gap-2 rounded-control border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:text-[13px]"
          >
            <IconoEscudo className="h-4 w-4 text-acento-300" />
            {t.hero.insignia}
          </motion.p>

          <motion.h1
            {...entrada(1)}
            className="font-titulo text-[2.1rem] font-bold leading-[1.08] tracking-tight text-white xs:text-[2.4rem] sm:text-5xl lg:text-6xl"
          >
            {t.hero.titulo}{' '}
            <span className="relative whitespace-nowrap text-acento-300">
              {t.hero.tituloResaltado}
            </span>{' '}
            {t.hero.tituloFin}
          </motion.h1>

          <motion.p
            {...entrada(2)}
            className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg"
          >
            {t.hero.subtitulo}
          </motion.p>

          <motion.p
            {...entrada(3)}
            className="mt-4 flex max-w-2xl gap-3 rounded-tarjeta border border-acento-400/30 bg-marca-900/40 p-4 text-sm leading-relaxed text-white/85 backdrop-blur-sm"
          >
            <IconoReloj className="mt-0.5 h-5 w-5 shrink-0 text-acento-300" />
            <span>{t.hero.urgencia}</span>
          </motion.p>

          <motion.div {...entrada(4)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BotonDiagnostico origen="hero" variante="claro" tamano="lg" className="sm:min-w-[16rem]" />
            <BotonWhatsapp origen="hero" mensaje={t.hero.waMensaje} tamano="lg" />
          </motion.div>

          <motion.ul {...entrada(5)} className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {t.hero.insignias.map((insignia) => (
              //
              <li key={insignia} className="flex items-center gap-2 text-[13px] font-medium text-white/85 sm:text-sm">
                <IconoCheck className="h-4 w-4 shrink-0 text-acento-300" />
                {insignia}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
      <span className="sr-only">
        {site.nombre} — {site.rubro}. {site.cobertura.texto}.
      </span>
    </section>
  )
}

export default Hero
