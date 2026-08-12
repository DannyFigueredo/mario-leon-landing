/**
 * ⚠️ TRAMPA 12 — la más cara de todas.
 * El webview de Instagram/Facebook (que es justo por donde entra el tráfico de
 * Meta Ads) puede no tener `IntersectionObserver`. Si un componente lo usa sin
 * comprobarlo, la excepción tumba el árbol de React entero y la landing queda
 * EN BLANCO: cero CTAs, cero contactos, y el anuncio pagando igual.
 *
 * Todo lo que dependa de IntersectionObserver pasa por aquí y, si no existe,
 * degrada mostrando el contenido SIN animar.
 */
export const soportaIntersectionObserver =
  typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined'

/** ¿Estamos dentro de un webview de app (Instagram, Facebook, TikTok)? */
export const esWebviewDeApp = () => {
  if (typeof navigator === 'undefined') return false
  return /(FBAN|FBAV|Instagram|Line|TikTok)/i.test(navigator.userAgent || '')
}

export default { soportaIntersectionObserver, esWebviewDeApp }
