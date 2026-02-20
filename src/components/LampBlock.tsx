import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import type { MeshProps } from '@react-three/fiber';
import { useRedstoneStore } from '../store/useRedstoneStore';
import confetti from 'canvas-confetti';

export function LampBlock(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  const isPowered = useRedstoneStore((state) => state.isPowered);

  useEffect(() => {
    if (isPowered) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#10b981'],
        zIndex: 100
      });
    }
  }, [isPowered]);

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial 
        color={isPowered ? '#fbbf24' : '#451a03'} 
        emissive={isPowered ? '#fbbf24' : '#000000'}
        emissiveIntensity={isPowered ? 3 : 0}
        toneMapped={false}
      />
    </mesh>
  );
}