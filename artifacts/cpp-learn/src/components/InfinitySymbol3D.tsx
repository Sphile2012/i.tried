import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function InfinityTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create infinity symbol shape using parametric equation
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const tubeRadius = 0.3;
    const radialSegments = 16;
    const tubularSegments = 100;
    
    // Lemniscate of Bernoulli parametric equations
    for (let i = 0; i <= tubularSegments; i++) {
      const t = (i / tubularSegments) * Math.PI * 2;
      const scale = 2;
      const x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      const y = (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      points.push(new THREE.Vector3(x, y, 0));
    }
    
    // Create tube geometry along the path using CatmullRomCurve3
    const curve = new THREE.CatmullRomCurve3(points, true);
    return new THREE.TubeGeometry(curve, tubularSegments, tubeRadius, radialSegments, true);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <MeshDistortMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
      <InfinityTorus />
      <Environment preset="city" />
    </>
  );
}

export default function InfinitySymbol3D() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}