import t from './es.js'
import site, { esMarcador } from '../config/site.js'

/**
 * El sitio es de UN SOLO IDIOMA (español). No hay contexto, ni estado, ni
 * conmutador: el copy sigue centralizado en `es.js` y esta capa solo lo
 * reparte a los componentes.
 *
 * Se mantiene la forma `useIdioma()` porque es lo que usan los componentes; si
 * algún día hiciera falta inglés, aquí es donde se vuelve a meter el contexto.
 */
export { t }

export const useIdioma = () => ({ t, idioma: 'es' })

export const useT = () => t

/** Texto del horario. */
export const horarioTexto = () => site.horario.texto

/** Descripción de la licencia, con el número solo si está confirmado. */
export const licenciaTexto = () =>
  esMarcador(site.licencia.numero)
    ? `${site.licencia.descripcion} · número de licencia pendiente de publicar`
    : `${site.licencia.descripcion} · Lic. ${site.licencia.numero}`

export default t
