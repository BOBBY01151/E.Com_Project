import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Center, useGLTF } from '@react-three/drei'
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
      
      // Rotation based on scroll - rolling animation
      const progress = Math.min(scrollY / 1000, 1)
      groupRef.current.rotation.y = progress * Math.PI * 4 // Multiple rotations for rolling effect
      groupRef.current.rotation.x = progress * Math.PI * 2 // Forward/backward roll
      
      // Scale animation based on scroll
      const scale = 1 + progress * 0.3
      groupRef.current.scale.set(scale, scale, scale)
      
      // Position animation - move up as we scroll
      groupRef.current.position.y += progress * 1.5
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main 3D Human Model */}
      <Center>
        <Float
          speed={1.5}
          rotationIntensity={0.3}
          floatIntensity={0.5}
        >
          <HumanModel ref={meshRef} />
        </Float>
      </Center>

      {/* Fashion items orbiting around the model */}
      <OrbitingFashionItems />
      
      {/* Glow effect around the model */}
      <GlowEffect />
    </group>
  )
}

const HumanModel = ({ ref }) => {
  // Create a simple humanoid figure using basic geometries
  return (
    <group ref={ref}>
      {/* Head */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700"
          emissiveIntensity={0.1}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Body/Torso */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.6, 1.5, 8]} />
        <meshStandardMaterial 
          color="#4169E1" 
          emissive="#4169E1"
          emissiveIntensity={0.1}
          metalness={0.2}
          roughness={0.7}
        />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.8, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700"
          emissiveIntensity={0.1}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      <mesh position={[0.8, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700"
          emissiveIntensity={0.1}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
        <meshStandardMaterial 
          color="#2E8B57" 
          emissive="#2E8B57"
          emissiveIntensity={0.1}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      <mesh position={[0.2, -0.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
        <meshStandardMaterial 
          color="#2E8B57" 
          emissive="#2E8B57"
          emissiveIntensity={0.1}
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.2, -1.3, 0.1]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.8]} />
        <meshStandardMaterial 
          color="#8B4513" 
          emissive="#8B4513"
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      <mesh position={[0.2, -1.3, 0.1]} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.8]} />
        <meshStandardMaterial 
          color="#8B4513" 
          emissive="#8B4513"
          emissiveIntensity={0.1}
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

const OrbitingFashionItems = () => {
  const itemsRef = useRef()

  useFrame((state) => {
    if (itemsRef.current) {
      itemsRef.current.rotation.y = state.clock.elapsedTime * 0.3
      itemsRef.current.rotation.x = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={itemsRef}>
      {/* Shirt */}
      <mesh
        position={[2, 1.5, 0]}
        scale={[0.8, 0.8, 0.8]}
      >
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#FF6B6B" 
          emissive="#FF6B6B"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Pants */}
      <mesh
        position={[2, 0, 0]}
        scale={[0.8, 0.8, 0.8]}
      >
        <boxGeometry args={[0.5, 1, 0.1]} />
        <meshStandardMaterial 
          color="#4ECDC4" 
          emissive="#4ECDC4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Shoes */}
      <mesh
        position={[2, -1, 0]}
        scale={[0.8, 0.8, 0.8]}
      >
        <boxGeometry args={[0.4, 0.2, 0.6]} />
        <meshStandardMaterial 
          color="#45B7D1" 
          emissive="#45B7D1"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Hat */}
      <mesh
        position={[2, 2.8, 0]}
        scale={[0.8, 0.8, 0.8]}
      >
        <cylinderGeometry args={[0.3, 0.3, 0.2, 8]} />
        <meshStandardMaterial 
          color="#96CEB4" 
          emissive="#96CEB4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Bag */}
      <mesh
        position={[-2, 0.5, 0]}
        scale={[0.8, 0.8, 0.8]}
      >
        <boxGeometry args={[0.3, 0.5, 0.2]} />
        <meshStandardMaterial 
          color="#FFEAA7" 
          emissive="#FFEAA7"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Watch */}
      <mesh
        position={[-2, 1.8, 0]}
        scale={[0.8, 0.8, 0.8]}
      >
        <torusGeometry args={[0.2, 0.05, 8, 16]} />
        <meshStandardMaterial 
          color="#DDA0DD" 
          emissive="#DDA0DD"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

const GlowEffect = () => {
  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial 
        color="#4F46E5" 
        emissive="#4F46E5"
        emissiveIntensity={0.2}
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default FloatingModel
