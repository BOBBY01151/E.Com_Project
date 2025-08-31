import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import FloatingModel from './FloatingModel'
import ParticleSystem from './ParticleSystem'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const Scene3D = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [isLowPower, setIsLowPower] = useState(false)

  // Detect low-powered devices
  useEffect(() => {
    const checkDeviceCapability = () => {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      
      if (!gl) {
        setIsLowPower(true)
        return
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        const isLowPowerGPU = /intel|radeon|mali|adreno/i.test(renderer.toLowerCase())
        setIsLowPower(isLowPowerGPU)
      }
    }

    checkDeviceCapability()
  }, [])

  if (isLowPower) {
    return <FallbackBackground />
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        <CameraController />
        <FloatingModel />
        <ParticleSystem />
        <Environment preset="city" />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        {!isMobile && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  )
}

const CameraController = () => {
  const { camera } = useThree()
  const cameraRef = useRef()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.updateMatrixWorld()
    }

    // Camera animation based on scroll
    const progress = Math.min(scrollY / 1000, 1) // Normalize scroll to 0-1
    const radius = 8
    const angle = progress * Math.PI * 2
    
    camera.position.x = Math.cos(angle) * radius
    camera.position.z = Math.sin(angle) * radius + 5
    camera.position.y = Math.sin(progress * Math.PI) * 2
    
    // Camera always looks at the center
    camera.lookAt(0, 0, 0)
  })

  return null
}

const FallbackBackground = () => {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-dots-pattern"></div>
      </div>
    </div>
  )
}

export default Scene3D
