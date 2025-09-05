'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeShoeProps {
  scrollProgress?: number;
  variant?: 'jordan' | 'airmax' | 'dunk';
}

export function ThreeShoe({ scrollProgress = 0, variant = 'jordan' }: ThreeShoeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const shoeGroupRef = useRef<THREE.Group | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const createNikeShoe = (shoeType: string) => {
    const shoeGroup = new THREE.Group();

    // Nike shoe colors based on variant
    const colors = {
      jordan: { primary: 0x000000, secondary: 0xffffff, accent: 0xff0000 },
      airmax: { primary: 0x1a1a1a, secondary: 0xffffff, accent: 0x00ff00 },
      dunk: { primary: 0x2c2c2c, secondary: 0xffffff, accent: 0x0066ff }
    };
    const colorScheme = colors[shoeType as keyof typeof colors] || colors.jordan;

    // Main shoe body - more refined shape
    const bodyGeometry = new THREE.BoxGeometry(2.8, 1.2, 1.0);
    // Round the edges
    bodyGeometry.translate(0, 0, 0);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: colorScheme.primary,
      roughness: 0.3,
      metalness: 0.1
    });
    const shoeBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    shoeBody.position.set(0, 0.1, 0);
    shoeBody.castShadow = true;
    shoeGroup.add(shoeBody);

    // Toe box
    const toeGeometry = new THREE.SphereGeometry(0.6, 16, 8, 0, Math.PI);
    const toeMaterial = new THREE.MeshStandardMaterial({ 
      color: colorScheme.primary,
      roughness: 0.2,
      metalness: 0.1
    });
    const toe = new THREE.Mesh(toeGeometry, toeMaterial);
    toe.position.set(1.2, 0.1, 0);
    toe.rotation.z = Math.PI / 2;
    toe.castShadow = true;
    shoeGroup.add(toe);

    // Nike Air Max style air bubble (for airmax variant)
    if (shoeType === 'airmax') {
      const airBubbleGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const airBubbleMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xcccccc,
        transparent: true,
        opacity: 0.7,
        roughness: 0.1,
        metalness: 0.8
      });
      const airBubble = new THREE.Mesh(airBubbleGeometry, airBubbleMaterial);
      airBubble.position.set(-0.8, -0.3, 0);
      airBubble.scale.set(1, 0.6, 1);
      shoeGroup.add(airBubble);
    }

    // Sole - multi-layered
    const soleMainGeometry = new THREE.BoxGeometry(3.2, 0.4, 1.3);
    const soleMainMaterial = new THREE.MeshStandardMaterial({ 
      color: colorScheme.secondary,
      roughness: 0.4
    });
    const soleMain = new THREE.Mesh(soleMainGeometry, soleMainMaterial);
    soleMain.position.set(0, -0.5, 0);
    soleMain.castShadow = true;
    shoeGroup.add(soleMain);

    // Sole details
    const soleDetailGeometry = new THREE.BoxGeometry(3.0, 0.2, 1.1);
    const soleDetailMaterial = new THREE.MeshStandardMaterial({ 
      color: colorScheme.accent,
      roughness: 0.3
    });
    const soleDetail = new THREE.Mesh(soleDetailGeometry, soleDetailMaterial);
    soleDetail.position.set(0, -0.35, 0);
    shoeGroup.add(soleDetail);

    // Nike Swoosh
    const swooshGeometry = new THREE.RingGeometry(0.2, 0.3, 3, 1, 0, Math.PI);
    const swooshMaterial = new THREE.MeshStandardMaterial({ 
      color: colorScheme.secondary,
      side: THREE.DoubleSide
    });
    const swoosh = new THREE.Mesh(swooshGeometry, swooshMaterial);
    swoosh.position.set(0.3, 0.2, 0.52);
    swoosh.rotation.z = -Math.PI / 4;
    swoosh.scale.set(1.5, 0.8, 1);
    shoeGroup.add(swoosh);

    // Lace holes
    for (let i = 0; i < 6; i++) {
      const holeGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.1);
      const holeMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
      const hole = new THREE.Mesh(holeGeometry, holeMaterial);
      hole.position.set(-0.8 + i * 0.3, 0.4, 0.48);
      hole.rotation.x = Math.PI / 2;
      shoeGroup.add(hole);
    }

    // Shoelaces
    const laceGeometry = new THREE.CylinderGeometry(0.015, 0.015, 2.5);
    const laceMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const lace1 = new THREE.Mesh(laceGeometry, laceMaterial);
    lace1.position.set(0, 0.45, 0.48);
    lace1.rotation.z = Math.PI / 2;
    shoeGroup.add(lace1);

    // Heel counter
    const heelGeometry = new THREE.BoxGeometry(0.8, 1.0, 1.0);
    const heelMaterial = new THREE.MeshStandardMaterial({ 
      color: colorScheme.primary,
      roughness: 0.2
    });
    const heel = new THREE.Mesh(heelGeometry, heelMaterial);
    heel.position.set(-1.4, 0.1, 0);
    heel.castShadow = true;
    shoeGroup.add(heel);

    return shoeGroup;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 2, -8);
    scene.add(rimLight);

    // Create Nike shoe
    const shoeGroup = createNikeShoe(variant);
    shoeGroup.scale.set(0.8, 0.8, 0.8);
    shoeGroupRef.current = shoeGroup;
    scene.add(shoeGroup);

    // Ground plane for shadows
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.ShadowMaterial({ 
      opacity: 0.15,
      transparent: true
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (shoeGroupRef.current && cameraRef.current) {
        // Base rotation
        shoeGroupRef.current.rotation.y += 0.005;
        
        // Scroll-based effects
        const scrollEffect = scrollProgress * Math.PI * 2;
        
        // Dynamic camera movement based on scroll
        cameraRef.current.position.x = 4 + Math.sin(scrollEffect * 0.5) * 2;
        cameraRef.current.position.y = 3 + Math.cos(scrollEffect * 0.3) * 1;
        cameraRef.current.position.z = 6 + Math.sin(scrollEffect * 0.4) * 1.5;
        cameraRef.current.lookAt(0, 0, 0);
        
        // Shoe floating animation
        shoeGroupRef.current.position.y = Math.sin(Date.now() * 0.003 + scrollEffect) * 0.3;
        
        // Scale effect based on scroll
        const scaleEffect = 0.8 + scrollProgress * 0.3;
        shoeGroupRef.current.scale.set(scaleEffect, scaleEffect, scaleEffect);
        
        // Additional rotation based on scroll
        shoeGroupRef.current.rotation.x = Math.sin(scrollEffect * 0.2) * 0.2;
        shoeGroupRef.current.rotation.z = Math.cos(scrollEffect * 0.15) * 0.1;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      
      cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [scrollProgress, variant]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}