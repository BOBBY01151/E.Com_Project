import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Center } from '@react-three/drei'
import * as THREE from 'three'

const FloatingModel = () => {
  const groupRef = useRef()
  const meshRef = useRef()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      
      // Rotation based on scroll
      const progress = Math.min(scrollY / 1000, 1)
      groupRef.current.rotation.y = progress * Math.PI * 2
      
      // Scale animation based on scroll
      const scale = 1 + progress * 0.5
      groupRef.current.scale.set(scale, scale, scale)
      
      // Position animation
      groupRef.current.position.y += progress * 2
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main geometric model */}
      <Center>
        <Float
          speed={1.5}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh ref={meshRef} castShadow receiveShadow>
            {/* DNA Helix-like structure */}
            <group>
              {/* Helix strands */}
              {Array.from({ length: 20 }, (_, i) => {
                const angle = (i / 20) * Math.PI * 4
                const radius = 1.5
                const height = (i - 10) * 0.3
                
                return (
                  <group key={i}>
                    {/* First strand */}
                    <mesh
                      position={[
                        Math.cos(angle) * radius,
                        height,
                        Math.sin(angle) * radius
                      ]}
                      castShadow
                    >
                      <sphereGeometry args={[0.1, 8, 8]} />
                      <meshStandardMaterial 
                        color="#4F46E5" 
                        emissive="#4F46E5"
                        emissiveIntensity={0.2}
                        metalness={0.8}
                        roughness={0.2}
                      />
                    </mesh>
                    
                    {/* Second strand */}
                    <mesh
                      position={[
                        Math.cos(angle + Math.PI) * radius,
                        height,
                        Math.sin(angle + Math.PI) * radius
                      ]}
                      castShadow
                    >
                      <sphereGeometry args={[0.1, 8, 8]} />
                      <meshStandardMaterial 
                        color="#EC4899" 
                        emissive="#EC4899"
                        emissiveIntensity={0.2}
                        metalness={0.8}
                        roughness={0.2}
                      />
                    </mesh>
                    
                    {/* Connection lines */}
                    {i < 19 && (
                      <>
                        <mesh>
                          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                          <meshStandardMaterial 
                            color="#8B5CF6" 
                            transparent
                            opacity={0.6}
                          />
                        </mesh>
                        <mesh position={[0, 0.15, 0]}>
                          <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                          <meshStandardMaterial 
                            color="#8B5CF6" 
                            transparent
                            opacity={0.6}
                          />
                        </mesh>
                      </>
                    )}
                  </group>
                )
              })}
            </group>
          </mesh>
        </Float>
      </Center>

      {/* Orbiting particles */}
      <OrbitingParticles />
      
      {/* Central core */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#F59E0B" 
          emissive="#F59E0B"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

const OrbitingParticles = () => {
  const particlesRef = useRef()

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.5
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 3
        
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#10B981" 
              emissive="#10B981"
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default FloatingModel
