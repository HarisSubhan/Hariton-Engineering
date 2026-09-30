import { motion } from 'framer-motion'
import { team } from '../data.js'
export default function Team() {
  return (
    <section id="team" className="section">
      <h2>The people on your project</h2>
      <div className="grid">
        {team.map(t => (
          <article key={t.name} className="member">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <motion.circle cx="60" cy="60" r="54" fill="none" stroke="#3aa0ff" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: 'easeInOut' }} />
              <text x="60" y="70" textAnchor="middle" fontSize="30" fill="#eaf1fb">{t.name.split(' ').map(n => n[0]).join('')}</text>
            </svg>
            <h3>{t.name}</h3><p className="role">{t.role}</p><p>{t.bio}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
