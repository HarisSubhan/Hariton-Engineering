import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { services } from '../data.js'
const C = { mech: '#3aa0ff', elec: '#ff7a1a', plumb: '#5ce1e6', fire: '#ff6b6b', '3d': '#c9d6ea' }
const F = [74, 174, 274]
function L({ id, a, children }) {
  const on = a === id || a === '3d'
  return <g stroke={C[id]} fill="none" strokeWidth="1.6" className={a === id ? 'flow' : ''} style={{ opacity: on ? 1 : 0.18, transition: 'opacity .6s' }}>{children}</g>
}
function Cutaway({ a }) {
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label="Cutaway of a building showing mechanical, electrical, plumbing and fire systems" className="cutaway">
      <g stroke="#4a6289" fill="none" strokeWidth="1.5"><rect x="60" y="60" width="280" height="300" /><path d="M60 160H340M60 260H340" /></g>
      <L id="mech" a={a}><rect x="140" y="34" width="80" height="24" />{F.map(y => <rect key={y} x="90" y={y} width="220" height="14" rx="2" />)}<rect x="170" y="60" width="14" height="228" /></L>
      <L id="elec" a={a}><rect x="68" y="300" width="26" height="44" /><path d="M81 300V80" />{F.map(y => [140, 230, 290].map(x => <circle key={x + y} cx={x} cy={y + 34} r="4" />))}</L>
      <L id="plumb" a={a}><path d="M322 60V350" />{F.map(y => <path key={y} d={`M322 ${y + 60}H262v10`} />)}</L>
      <L id="fire" a={a}>{F.map(y => <g key={y}><path d={`M100 ${y + 26}H300`} />{[130, 200, 270].map(x => <g key={x}><path d={`M${x} ${y + 26}v8`} /><circle cx={x} cy={y + 38} r="3" /></g>)}</g>)}<circle cx="300" cy="46" r="8" /></L>
      {a === '3d' && F.map(y => <circle key={y} cx="177" cy={y + 7} r="9" fill="none" stroke="#ff7a1a" strokeWidth="2" className="pulse" />)}
    </svg>
  )
}
export default function Services() {
  const [a, setA] = useState('mech')
  return (
    <section id="services" className="section svc">
      <h2>See what is behind the walls</h2>
      <p>Pick a system. Each one is designed on its own and checked against all the others.</p>
      <div className="svc-grid">
        <Cutaway a={a} />
        <ul className="svc-list">
          {services.map(s => (
            <li key={s.id}>
              <button aria-pressed={a === s.id} onClick={() => setA(s.id)} onMouseEnter={() => setA(s.id)} style={{ '--c': C[s.id] }}><i />{s.name}</button>
              <AnimatePresence initial={false}>{a === s.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="svc-body">
                  <p>{s.body}</p><small>{s.items.join(', ')}</small>
                </motion.div>)}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
