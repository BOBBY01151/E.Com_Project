import { Suspense, lazy } from 'react'
import { Html } from '@react-three/drei'

// Lazy load the 3D scene components
const Scene3D = lazy(() => import('./Scene3D'))

const ModelLoader = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Scene3D />
    </Suspense>
  )
}

const LoadingFallback = () => {
  return (
    <Html center>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading 3D Scene...</p>
      </div>
    </Html>
  )
}

export default ModelLoader
