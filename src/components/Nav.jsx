import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
const links = ['services', 'about', 'team', 'contact']
export default function Nav() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    const on = () => { const y = window.scrollY; setHidden(y > last && y > 120); last = y }
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.header className="nav" animate={{ y: hidden ? '-110%' : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 30 }}>
      <a href="#top" className="logo">Hariton Engineering</a>
      <nav aria-label="Primary">
        {links.map(l => <a key={l} href={`#${l}`}>{l[0].toUpperCase() + l.slice(1)}</a>)}
        <a className="btn small" href="tel:+16264494223">(626) 449-4223</a>
      </nav>
    </motion.header>
  )
}
