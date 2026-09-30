import { Suspense, lazy, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Lenis from 'lenis'
import Nav from './components/Nav.jsx'
import Services from './components/Services.jsx'
import Story from './components/Story.jsx'
import Principles from './components/Principles.jsx'
import Team from './components/Team.jsx'
import Contact from './components/Contact.jsx'
const Scene = lazy(() => import('./components/Scene.jsx'))

export default function App() {
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), reduce ? 0 : 900)
    if (reduce) return () => clearTimeout(t)
    const lenis = new Lenis({ lerp: 0.1 })
    let id; const raf = time => { lenis.raf(time); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { clearTimeout(t); cancelAnimationFrame(id); lenis.destroy() }
  }, [reduce])
  const words = 'We make it work.'.split(' ')
  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <motion.div className="preloader" initial={false} animate={{ opacity: ready ? 0 : 1, pointerEvents: 'none' }} transition={{ duration: 0.6 }} aria-hidden="true">Hariton</motion.div>
      <Nav />
      <main id="main">
        <section id="top" className="hero">
          <div className="scene"><Suspense fallback={null}><Scene /></Suspense></div>
          <div className="hero-copy">
            <h1>{words.map((w, i) => (
              <motion.span key={i} className="word" initial={{ y: '100%' }} animate={ready ? { y: 0 } : {}} transition={{ type: 'spring', stiffness: 120, damping: 18, delay: reduce ? 0 : 0.15 * i }}>{w}&nbsp;</motion.span>
            ))}</h1>
            <p>Quietly integrating the systems that turn designs into high-performing buildings. Sustainable MEP engineering from Pasadena, since 2005.</p>
            <a className="btn" href="#contact">Start a project</a>
          </div>
        </section>
        <Story />
        <Services />
        <Principles />
        <Team />
        <Contact />
      </main>
      <footer className="footer">
        <div><strong>Hariton Engineering Inc.</strong><p>Pasadena, California</p><a href="tel:+16264494223">(626) 449-4223</a></div>
        <div><strong>Services</strong><p>Mechanical, Electrical, Plumbing, Low Voltage, Fire Protection, Fire Alarm, Arc Flash, Utility and 3D Coordination</p></div>
        <div><strong>Service areas</strong><p>California and Hawaii</p></div>
      </footer>
    </>
  )
}
