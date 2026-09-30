import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
const TEXT = 'The best building systems are the ones nobody notices. Air that is simply comfortable. Light that is simply there. Water that simply works. Behind that calm is careful engineering, coordinated early and delivered quietly.'
function W({ w, p, a, b }) { const o = useTransform(p, [a, b], [0.15, 1]); return <motion.span style={{ opacity: o }}>{w} </motion.span> }
export default function Story() {
  const ref = useRef(null), reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const words = TEXT.split(' ')
  return (
    <section id="about" ref={ref} className="story">
      <div className="story-in">
        <p>{words.map((w, i) => reduce ? <span key={i}>{w} </span> : <W key={i} w={w} p={scrollYProgress} a={(i / words.length) * 0.8} b={(i / words.length) * 0.8 + 0.08} />)}</p>
        <small>Founded in 2005 in Pasadena. Licensed in California and Hawaii. LEED AP BD+C.</small>
      </div>
    </section>
  )
}
