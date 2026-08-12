import site from '../config/site.js'
import { t } from '../i18n/index.jsx'
import { useContador } from '../hooks/useContador.js'
import Reveal from './ui/Reveal.jsx'

/**
 * Cifras con contador animado al entrar en pantalla.
 *
 * ⚠️ HONESTIDAD: aquí NO hay "familias protegidas" ni "años de experiencia"
 * inventados. Mario es una persona con nombre y apellido; una cifra falsa a su
 * nombre es ponerle en la boca algo que no dijo.
 *
 * Las cuatro cifras son verdaderas por construcción o vienen del BLOQUE 0:
 *   · tipos de protección  → se cuenta desde site.productos, no está escrito
 *   · $0 la consulta       → es la oferta
 *   · 100% remoto          → no hay oficina
 *   · 50 estados           → PENDIENTE: la licencia de seguros es estatal, así
 *                            que sale con aviso hasta que Mario lo confirme
 * Nada de esto entra en el JSON-LD.
 */
function Cifra({ numero, prefijo, sufijo, etiqueta, pendiente, indice }) {
  const { ref, valor } = useContador(numero)
  return (
    <Reveal indice={indice} className="text-center">
      <p
        ref={ref}
        className="font-titulo text-4xl font-bold tabular-nums text-marca-700 sm:text-[2.75rem]"
      >
        {prefijo}
        {valor}
        {sufijo}
        {pendiente ? <span className="align-super text-lg text-acento-500">*</span> : null}
      </p>
      <p className="mt-1.5 text-sm font-medium leading-snug text-tinta-600">{etiqueta}</p>
    </Reveal>
  )
}

export function BarraEstadisticas() {
  const hayPendiente = site.estadisticas.some((c) => c.pendiente)

  return (
    <section className="border-b border-tinta-100 bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-contenido px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {site.estadisticas.map((c, i) => (
            //
            <Cifra
              key={c.clave}
              numero={c.numero}
              prefijo={c.prefijo}
              sufijo={c.sufijo}
              pendiente={c.pendiente}
              etiqueta={t.estadisticas.items[c.clave].etiqueta}
              indice={i}
            />
          ))}
        </div>

        {hayPendiente ? (
          <p className="mt-7 text-center text-[12px] leading-snug text-tinta-400">
            * {t.estadisticas.aviso}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default BarraEstadisticas
