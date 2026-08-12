import { useState } from 'react'
import site from '../config/site.js'
import { useIdioma } from '../i18n/index.jsx'
import { guardarCotizacion } from '../lib/firebase.js'
import { trackLead } from '../lib/pixel.js'
import Reveal from './ui/Reveal.jsx'
import { Boton, BotonWhatsapp, BotonLlamar } from './ui/Botones.jsx'
import { IconoCheck, IconoCandado, IconoWhatsapp } from './ui/Iconos.jsx'

const ESTADO = { LISTO: 'listo', ENVIANDO: 'enviando', OK: 'ok', ERROR: 'error' }

const claseCampo =
  'w-full rounded-control border border-tinta-300 bg-white px-4 py-3 text-[15px] text-tinta-900 ' +
  'placeholder:text-tinta-400 focus:border-marca-600 focus:outline focus:outline-2 ' +
  'focus:outline-offset-1 focus:outline-marca-600'

/**
 * Sección final a todo lo ancho + formulario.
 *
 * Campos: nombre, teléfono, tipo de seguro y rango de edad (opcional).
 * NO se pregunta por condiciones de salud: eso es para la consulta con el
 * agente, no para un lead de landing page.
 */
export function CtaFinal() {
  const { t, idioma } = useIdioma()
  const [estado, setEstado] = useState(ESTADO.LISTO)
  const [errores, setErrores] = useState({})
  const [datos, setDatos] = useState({
    nombre: '',
    telefono: '',
    producto: '',
    edad: '',
    empresa: '', // honeypot: humano invisible, bot rellenable
  })

  const cambiar = (campo) => (e) => {
    setDatos((d) => ({ ...d, [campo]: e.target.value }))
    setErrores((x) => ({ ...x, [campo]: undefined }))
  }

  const validar = () => {
    const e = {}
    if (datos.nombre.trim().length < 2) e.nombre = t.ctaFinal.form.errorNombre
    if (datos.telefono.replace(/\D/g, '').length < 7)
      e.telefono = t.ctaFinal.form.errorTelefono
    if (!datos.producto) e.producto = t.ctaFinal.form.errorProducto
    setErrores(e)
    return Object.keys(e).length === 0
  }

  const enviar = async (ev) => {
    ev.preventDefault()
    if (estado === ESTADO.ENVIANDO) return
    if (!validar()) return

    // Honeypot: si viene relleno es un bot. Fingimos éxito y no guardamos nada
    // ni disparamos conversión (ensuciaría las métricas de la campaña).
    if (datos.empresa.trim() !== '') {
      setEstado(ESTADO.OK)
      return
    }

    setEstado(ESTADO.ENVIANDO)
    const resultado = await guardarCotizacion({
      nombre: datos.nombre,
      telefono: datos.telefono,
      producto: datos.producto,
      edad: datos.edad,
      idioma,
      origen: 'formulario-landing',
    })

    if (resultado.ok) {
      trackLead('formulario', { tipo: 'formulario', producto: datos.producto, idioma })
      setEstado(ESTADO.OK)
    } else {
      setEstado(ESTADO.ERROR)
    }
  }

  // La consulta inicial (`destacada`) NO va en el desplegable: el formulario
  // ES la solicitud de esa consulta, sería una opción circular.
  const opcionesProducto = [
    ...site.productos
      .filter((p) => !p.destacada)
      .map((p) => ({ valor: p.clave, texto: t.servicios.items[p.clave].nombre })),
    { valor: 'orientacion', texto: t.ctaFinal.form.productoNoSe },
  ]

  return (
    <section id="cotizar" className="scroll-mt-16 bg-marca-800 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-contenido px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-3 font-titulo text-xs font-semibold uppercase tracking-[0.18em] text-acento-300">
                {t.nav.contacto}
              </p>
              <h2 className="font-titulo text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
                {t.ctaFinal.titulo}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
                {t.ctaFinal.subtitulo}
              </p>
            </Reveal>

            <Reveal indice={1}>
              <ul className="mt-7 space-y-3">
                {t.ctaFinal.beneficios.map((b) => (
                  //
                  <li key={b} className="flex items-start gap-3 text-[15px] text-white/90">
                    <IconoCheck className="mt-0.5 h-5 w-5 shrink-0 text-acento-300" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal indice={2} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BotonWhatsapp origen="cta-final" mensaje={t.ctaFinal.waMensaje} tamano="lg" />
              <BotonLlamar origen="cta-final" variante="contornoClaro" tamano="lg" />
            </Reveal>
          </div>

          <Reveal tipo="derecha" className="rounded-bloque bg-white p-6 shadow-elevada sm:p-8">
            {estado === ESTADO.OK ? (
              <div className="py-4 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-control bg-marca-50 text-marca-700">
                  <IconoCheck className="h-7 w-7" />
                </span>
                <h3 className="font-titulo text-2xl font-bold text-tinta-900">
                  {t.ctaFinal.gracias.titulo}
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-tinta-600">
                  {t.ctaFinal.gracias.texto}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <BotonWhatsapp
                    origen="gracias"
                    mensaje={t.ctaFinal.gracias.waMensaje}
                    tamano="lg"
                    bloque
                  >
                    {t.ctaFinal.gracias.cta}
                  </BotonWhatsapp>
                  <button
                    type="button"
                    onClick={() => {
                      setDatos({ nombre: '', telefono: '', producto: '', edad: '', empresa: '' })
                      setEstado(ESTADO.LISTO)
                    }}
                    className="text-sm font-semibold text-tinta-500 underline underline-offset-4 hover:text-marca-700"
                  >
                    {t.ctaFinal.gracias.otro}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="campo-nombre" className="mb-1.5 block font-titulo text-sm font-semibold text-tinta-800">
                      {t.ctaFinal.form.nombre}
                    </label>
                    <input
                      id="campo-nombre"
                      name="nombre"
                      type="text"
                      autoComplete="name"
                      value={datos.nombre}
                      onChange={cambiar('nombre')}
                      placeholder={t.ctaFinal.form.nombrePlaceholder}
                      className={claseCampo}
                      aria-invalid={Boolean(errores.nombre)}
                    />
                    {errores.nombre ? (
                      <p className="mt-1.5 text-[13px] font-medium text-red-600">{errores.nombre}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="campo-telefono" className="mb-1.5 block font-titulo text-sm font-semibold text-tinta-800">
                      {t.ctaFinal.form.telefono}
                    </label>
                    <input
                      id="campo-telefono"
                      name="telefono"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={datos.telefono}
                      onChange={cambiar('telefono')}
                      placeholder={t.ctaFinal.form.telefonoPlaceholder}
                      className={claseCampo}
                      aria-invalid={Boolean(errores.telefono)}
                    />
                    {errores.telefono ? (
                      <p className="mt-1.5 text-[13px] font-medium text-red-600">{errores.telefono}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="campo-producto" className="mb-1.5 block font-titulo text-sm font-semibold text-tinta-800">
                      {t.ctaFinal.form.producto}
                    </label>
                    <select
                      id="campo-producto"
                      name="producto"
                      value={datos.producto}
                      onChange={cambiar('producto')}
                      className={claseCampo}
                      aria-invalid={Boolean(errores.producto)}
                    >
                      <option value="">{t.ctaFinal.form.productoPlaceholder}</option>
                      {opcionesProducto.map((o) => (
                        //
                        <option key={o.valor} value={o.valor}>
                          {o.texto}
                        </option>
                      ))}
                    </select>
                    {errores.producto ? (
                      <p className="mt-1.5 text-[13px] font-medium text-red-600">{errores.producto}</p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="campo-edad" className="mb-1.5 block font-titulo text-sm font-semibold text-tinta-800">
                      {t.ctaFinal.form.edad}
                    </label>
                    <select
                      id="campo-edad"
                      name="edad"
                      value={datos.edad}
                      onChange={cambiar('edad')}
                      className={claseCampo}
                    >
                      <option value="">{t.ctaFinal.form.edadPlaceholder}</option>
                      {t.ctaFinal.form.rangosEdad.map((r) => (
                        //
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Honeypot anti-spam. NO se envía a Firestore. */}
                  <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                    <label htmlFor="campo-empresa">No rellenar</label>
                    <input
                      id="campo-empresa"
                      name="empresa"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={datos.empresa}
                      onChange={cambiar('empresa')}
                    />
                  </div>
                </div>

                {estado === ESTADO.ERROR ? (
                  <div className="mt-4 rounded-control border border-red-200 bg-red-50 p-3 text-[13px] leading-relaxed text-red-800">
                    <p>{t.ctaFinal.form.errorEnvio}</p>
                    <a
                      href={`https://wa.me/${String(site.whatsapp).replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackLead('whatsapp-error-formulario', { tipo: 'whatsapp' })}
                      className="mt-2 inline-flex items-center gap-1.5 font-semibold text-whatsapp-oscuro underline underline-offset-2"
                    >
                      <IconoWhatsapp className="h-4 w-4" />
                      {t.ctaFinal.gracias.cta}
                    </a>
                  </div>
                ) : null}

                <Boton
                  variante="marca"
                  tamano="lg"
                  bloque
                  className="mt-6"
                  onClick={enviar}
                  disabled={estado === ESTADO.ENVIANDO}
                >
                  {estado === ESTADO.ENVIANDO ? t.ctaFinal.form.enviando : t.ctaFinal.form.enviar}
                </Boton>

                <p className="mt-4 flex gap-2 text-[12px] leading-relaxed text-tinta-500">
                  <IconoCandado className="mt-0.5 h-4 w-4 shrink-0 text-tinta-400" />
                  <span>{t.ctaFinal.form.legal}</span>
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default CtaFinal
