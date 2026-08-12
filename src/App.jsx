import { useCallback, useEffect, useState } from 'react'
import { iniciarTracking } from './lib/pixel.js'
import BarraSuperior from './components/BarraSuperior.jsx'
import Hero from './components/Hero.jsx'
import BarraEstadisticas from './components/BarraEstadisticas.jsx'
import BarraConfianza from './components/BarraConfianza.jsx'
import Servicios from './components/Servicios.jsx'
import PorQueElegirnos from './components/PorQueElegirnos.jsx'
import Proceso from './components/Proceso.jsx'
import Testimonios from './components/Testimonios.jsx'
import CtaFinal from './components/CtaFinal.jsx'
import PieDePagina from './components/PieDePagina.jsx'
import BotonesFlotantes from './components/BotonesFlotantes.jsx'
import Privacidad from './components/Privacidad.jsx'
import AvisoPlaceholders from './components/ui/AvisoPlaceholders.jsx'

/**
 * Router mínimo con la History API: solo hay dos rutas y no merece la pena
 * arrastrar una dependencia de routing en una landing de conversión.
 * El rewrite SPA de firebase.json manda cualquier ruta a /index.html.
 */
function useRuta() {
  const [ruta, setRuta] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname
  )

  useEffect(() => {
    const alVolver = () => setRuta(window.location.pathname)
    window.addEventListener('popstate', alVolver)
    return () => window.removeEventListener('popstate', alVolver)
  }, [])

  const irA = useCallback((destino) => {
    window.history.pushState({}, '', destino)
    setRuta(destino)
    window.scrollTo({ top: 0 })
  }, [])

  return { ruta, irA }
}

function Landing({ irA }) {
  return (
    <>
      <BarraSuperior />
      <main>
        <Hero />
        <BarraEstadisticas />
        <BarraConfianza />
        <Servicios />
        <PorQueElegirnos />
        <Proceso />
        <Testimonios />
        <CtaFinal />
      </main>
      <PieDePagina irA={irA} />
      <BotonesFlotantes />
    </>
  )
}

export default function App() {
  const { ruta, irA } = useRuta()

  useEffect(() => {
    iniciarTracking()
  }, [])

  const esPrivacidad = ruta.replace(/\/+$/, '') === '/privacidad'

  return (
    <>
      {esPrivacidad ? <Privacidad irA={irA} /> : <Landing irA={irA} />}
      <AvisoPlaceholders />
    </>
  )
}
