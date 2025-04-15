
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Cross() {
  const meshRef = useRef<THREE.Group>(null);
  const [scale, setScale] = useState(0);
  
  useEffect(() => {
    // Animate scale on mount
    setScale(1);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the cross
      meshRef.current.rotation.y += 0.01;
      // Make it float up and down
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group ref={meshRef} scale={scale}>
      {/* Vertical bar */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial color={"#d4af37"} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Horizontal bar */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.6, 0.2, 0.2]} />
        <meshStandardMaterial color={"#d4af37"} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export const PrayerAnimation = () => {
  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <div className="w-64 h-64">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Cross />
        </Canvas>
      </div>
    </div>
  );
};
