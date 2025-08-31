# 3D Scroll-Based Landing Page

A modern, interactive 3D landing page built with React Three Fiber, GSAP, and ScrollTrigger. Features smooth scroll-based animations, performance optimizations, and responsive design.

## 🚀 Features

### Core Functionality
- **3D DNA Helix Model**: Interactive geometric model with scroll-based transformations
- **Scroll-Triggered Animations**: Camera movements and model transformations synchronized with scroll
- **Particle System**: Dynamic background particles for depth and atmosphere
- **Responsive Design**: Optimized for desktop and mobile devices
- **Performance Monitoring**: Automatic detection of low-powered devices with fallbacks

### Technical Features
- **React Three Fiber**: Modern React integration with Three.js
- **GSAP + ScrollTrigger**: Smooth scroll-based animations
- **Performance Optimizations**: 
  - DRACO compression support
  - Frustum culling
  - Level of Detail (LOD)
  - Adaptive quality based on FPS
  - Memory management
- **Mobile Optimization**: Reduced complexity on mobile devices
- **Fallback Support**: Static background for unsupported devices

## 📁 Component Structure

```
3DScene/
├── Scene3D.jsx           # Main 3D scene container
├── FloatingModel.jsx     # 3D model with animations
├── ParticleSystem.jsx    # Background particle effects
├── ScrollContent.jsx     # Scroll-synchronized content
├── ModelLoader.jsx       # Lazy loading wrapper
└── README.md            # This documentation
```

## 🛠️ Usage

### Basic Implementation

```jsx
import Landing3D from './pages/Landing3D'

function App() {
  return (
    <Routes>
      <Route path="/3d" element={<Landing3D />} />
    </Routes>
  )
}
```

### Custom Model Integration

```jsx
import { useGLTF } from '@react-three/drei'

const CustomModel = () => {
  const { nodes, materials } = useGLTF('/path/to/model.glb')
  
  return (
    <group>
      <mesh geometry={nodes.model.geometry} material={materials.model} />
    </group>
  )
}
```

## 🎨 Customization

### Model Colors and Materials

```jsx
// In FloatingModel.jsx
<meshStandardMaterial 
  color="#4F46E5"           // Primary color
  emissive="#4F46E5"        // Glow effect
  emissiveIntensity={0.2}   // Glow intensity
  metalness={0.8}           // Metallic appearance
  roughness={0.2}           // Surface roughness
/>
```

### Animation Parameters

```jsx
// Camera movement radius
const radius = 8

// Animation duration
duration: 20

// Scroll trigger settings
scrollTrigger: {
  trigger: '.hero-section',
  start: 'top top',
  end: 'bottom top',
  scrub: 1
}
```

### Particle System Configuration

```jsx
// Number of particles
const count = 2000

// Particle colors (HSL)
color.setHSL(Math.random() * 0.1 + 0.6, 0.8, 0.5)

// Particle size
size={0.1}
```

## ⚡ Performance Optimizations

### Automatic Quality Adjustment

The scene automatically adjusts quality based on device performance:

- **High-end devices**: Full quality with all effects
- **Mid-range devices**: Reduced particle count, simplified materials
- **Low-end devices**: Fallback to static background

### Memory Management

```jsx
import { disposeObject } from '../utils/threeUtils'

// Clean up when component unmounts
useEffect(() => {
  return () => {
    disposeObject(meshRef.current)
  }
}, [])
```

### DRACO Compression

For compressed 3D models:

```jsx
import { initDRACOLoader } from '../utils/threeUtils'

const dracoLoader = initDRACOLoader()
// Use with GLTFLoader for compressed models
```

## 📱 Responsive Design

### Mobile Optimizations

- Reduced particle count (500 vs 2000)
- Simplified materials
- Disabled orbit controls
- Optimized camera movements

### Breakpoint Detection

```jsx
const isMobile = useMediaQuery('(max-width: 768px)')

// Conditional rendering
{!isMobile && <OrbitControls enableZoom={false} />}
```

## 🔧 Configuration

### Environment Variables

```env
# Optional: Custom model paths
VITE_MODEL_PATH=/models/custom-model.glb
VITE_TEXTURE_PATH=/textures/custom-texture.jpg
```

### Performance Settings

```jsx
// Canvas performance settings
<Canvas
  gl={{ 
    antialias: true, 
    alpha: true,
    powerPreference: 'high-performance'
  }}
  dpr={[1, 2]}                    // Device pixel ratio
  performance={{ min: 0.5 }}      // Performance threshold
>
```

## 🐛 Troubleshooting

### Common Issues

1. **Low FPS on mobile devices**
   - Solution: Check device capability detection
   - Fallback to static background

2. **Model not loading**
   - Check file paths and CORS settings
   - Verify model format (glTF/GLB recommended)

3. **Scroll animations not working**
   - Ensure GSAP and ScrollTrigger are properly imported
   - Check trigger element classes

### Debug Mode

Enable debug information:

```jsx
// Add to Scene3D.jsx
const debug = true

if (debug) {
  console.log('Performance stats:', stats)
}
```

## 📈 Performance Monitoring

### Built-in Metrics

- FPS monitoring
- Memory usage tracking
- Triangle count
- Render time

### Custom Monitoring

```jsx
import { createPerformanceMonitor } from '../utils/threeUtils'

const performanceMonitor = createPerformanceMonitor()

useFrame(() => {
  const stats = performanceMonitor.updateStats(renderer, scene)
  // Handle performance data
})
```

## 🎯 Best Practices

1. **Model Optimization**
   - Use DRACO compression for large models
   - Implement LOD for complex geometries
   - Optimize textures and materials

2. **Animation Performance**
   - Use `useFrame` sparingly
   - Implement object pooling for particles
   - Cache expensive calculations

3. **Memory Management**
   - Dispose of geometries and materials
   - Clean up event listeners
   - Use object pooling for frequent creations

4. **Mobile Considerations**
   - Test on actual devices
   - Implement progressive enhancement
   - Provide meaningful fallbacks

## 🔮 Future Enhancements

- [ ] WebXR support for VR/AR
- [ ] Advanced shader effects
- [ ] Real-time lighting updates
- [ ] Audio-reactive animations
- [ ] Multi-model support
- [ ] Advanced particle systems
- [ ] Physics integration
- [ ] Network synchronization

## 📄 License

This component is part of the E-Commerce project and follows the same license terms.
