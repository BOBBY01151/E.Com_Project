import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

// Initialize DRACO loader for compressed models
export const initDRACOLoader = () => {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/') // Path to DRACO decoder files
  return dracoLoader
}

// Performance monitoring
export const createPerformanceMonitor = () => {
  const stats = {
    fps: 0,
    memory: 0,
    triangles: 0
  }

  let frameCount = 0
  let lastTime = performance.now()

  const updateStats = (renderer, scene) => {
    frameCount++
    const currentTime = performance.now()
    
    if (currentTime - lastTime >= 1000) {
      stats.fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
      stats.memory = renderer.info.memory.geometries
      stats.triangles = renderer.info.render.triangles
      
      frameCount = 0
      lastTime = currentTime
    }

    return stats
  }

  return { updateStats }
}

// Level of Detail (LOD) helper
export const createLOD = (highResMesh, mediumResMesh, lowResMesh) => {
  const lod = new THREE.LOD()
  
  lod.addLevel(highResMesh, 0)    // High detail for close view
  lod.addLevel(mediumResMesh, 50) // Medium detail for medium distance
  lod.addLevel(lowResMesh, 100)   // Low detail for far view
  
  return lod
}

// Frustum culling helper
export const createFrustumCuller = (camera) => {
  const frustum = new THREE.Frustum()
  const matrix = new THREE.Matrix4()
  
  return (object) => {
    matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    frustum.setFromProjectionMatrix(matrix)
    return frustum.intersectsObject(object)
  }
}

// Texture optimization
export const optimizeTexture = (texture) => {
  texture.generateMipmaps = true
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.anisotropy = 16
  texture.flipY = false
  return texture
}

// Geometry optimization
export const optimizeGeometry = (geometry) => {
  geometry.computeBoundingSphere()
  geometry.computeBoundingBox()
  return geometry
}

// Material optimization
export const createOptimizedMaterial = (type = 'standard') => {
  const material = new THREE[`Mesh${type}Material`]()
  
  // Enable material optimizations
  material.side = THREE.FrontSide
  material.transparent = false
  material.alphaTest = 0.5
  
  return material
}

// Scene optimization
export const optimizeScene = (scene) => {
  scene.traverse((object) => {
    if (object.isMesh) {
      // Optimize geometry
      if (object.geometry) {
        optimizeGeometry(object.geometry)
      }
      
      // Optimize materials
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(mat => {
            if (mat.map) optimizeTexture(mat.map)
          })
        } else {
          if (object.material.map) optimizeTexture(object.material.map)
        }
      }
      
      // Enable frustum culling
      object.frustumCulled = true
    }
  })
}

// Memory management
export const disposeObject = (object) => {
  if (object.geometry) {
    object.geometry.dispose()
  }
  
  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach(material => {
        if (material.map) material.map.dispose()
        material.dispose()
      })
    } else {
      if (object.material.map) object.material.map.dispose()
      object.material.dispose()
    }
  }
}

// Adaptive quality based on performance
export const createAdaptiveQuality = (renderer) => {
  let currentQuality = 1
  const targetFPS = 60
  const minQuality = 0.5
  const maxQuality = 2
  
  const adjustQuality = (fps) => {
    if (fps < targetFPS - 10 && currentQuality > minQuality) {
      currentQuality = Math.max(minQuality, currentQuality - 0.1)
      renderer.setPixelRatio(currentQuality)
    } else if (fps > targetFPS + 10 && currentQuality < maxQuality) {
      currentQuality = Math.min(maxQuality, currentQuality + 0.1)
      renderer.setPixelRatio(currentQuality)
    }
  }
  
  return { adjustQuality, getCurrentQuality: () => currentQuality }
}
