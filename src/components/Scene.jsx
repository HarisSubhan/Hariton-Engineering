import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, Float } from '@react-three/drei'
import * as THREE from 'three'

const BLUE = '#3aa0ff', ORANGE = '#ff7a1a'

function Building({ reduced }) {
  const g = useRef()
  const floors = useMemo(() => Array.from({ length: 7 }, (_, i) => i), [])
  const pipe = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.6, -1.6, 0.9), new THREE.Vector3(-1.6, 1.2, 0.9),
    new THREE.Vector3(0.6, 1.2, 0.9), new THREE.Vector3(0.6, 2.2, 0.2)], false, 'catmullrom', 0.02), 80, 0.035, 8), [])
  useFrame(({ pointer }, dt) => {
    if (reduced) return
    const y = window.scrollY / Math.max(1, window.innerHeight)
    g.current.rotation.y += ((pointer.x * 0.6 + y * 0.8) - g.current.rotation.y) * Math.min(1, dt * 2)
    g.current.rotation.x += ((-pointer.y * 0.25) - g.current.rotation.x) * Math.min(1, dt * 2)
  })
  return (
    <Float speed={reduced ? 0 : 1.2} floatIntensity={0.6}>
      <group ref={g} position={[0, -0.3, 0]}>
        {floors.map(i => (
          <mesh key={i} position={[0, i * 0.55 - 1.6, 0]}>
            <boxGeometry args={[2.4 - i * 0.12, 0.5, 1.6 - i * 0.06]} />
            <meshBasicMaterial transparent opacity={0.04} color={BLUE} />
            <Edges color={BLUE} />
          </mesh>
        ))}
        <mesh geometry={pipe}><meshBasicMaterial color={ORANGE} /></mesh>
        <mesh position={[1.9, -1.4, 0]}>
          <boxGeometry args={[0.6, 0.5, 0.6]} /><meshBasicMaterial transparent opacity={0.05} color={ORANGE} /><Edges color={ORANGE} />
        </mesh>
      </group>
    </Float>
  )
}

function Particles({ reduced }) {
  const ref = useRef()
  const pos = useMemo(() => {
    const a = new Float32Array(600 * 3)
    for (let i = 0; i < a.length; i++) a[i] = (Math.random() - 0.5) * 14
    return a
  }, [])
  useFrame((_, dt) => { if (!reduced) ref.current.rotation.y += dt * 0.03 })
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={600} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.025} color="#8fb8e8" transparent opacity={0.7} />
    </points>
  )
}

export default function Scene() {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6.5], fov: 45 }} gl={{ antialias: true, powerPreference: 'high-performance' }} aria-hidden="true">
      <Particles reduced={reduced} />
      <Building reduced={reduced} />
    </Canvas>
  )
}
