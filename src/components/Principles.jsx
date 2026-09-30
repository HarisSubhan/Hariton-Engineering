import { motion } from 'framer-motion'
const P = [
  ['We pick up the phone', 'A small team means you reach the engineer, not a queue. Questions get answered while they still matter.'],
  ['We coordinate before you build', 'Systems are modeled together in 3D so conflicts are solved on screen, not in the ceiling.'],
  ['We design for less energy', 'Right-sized systems and net-zero thinking from the first sketch, not added at the end.']
]
export default function Principles() {
  return (
    <section className="section">
      <h2>How we work</h2>
      <div className="grid">
        {P.map(([t, b], i) => (
          <motion.article key={t} className="glass card" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: i * 0.2 }}>
            <svg viewBox="0 0 60 60" className="ring" aria-hidden="true"><circle cx="30" cy="30" r="24" /><circle cx="30" cy="30" r="14" style={{ animationDelay: `${i * 0.8}s` }} /></svg>
            <h3>{t}</h3><p>{b}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
