import { useRef, useState } from 'react';
import { Mesh } from 'three';
import type { MeshProps } from '@react-three/fiber';
import { useRedstoneStore } from '../store/useRedstoneStore';

export function LeverBlock(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  
  const isPowered = useRedstoneStore((state) => state.isPowered);
  const togglePower = useRedstoneStore((state) => state.togglePower);

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={(e) => { 
        e.stopPropagation(); 
        togglePower();
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
    >
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial 
        color={isPowered ? '#10b981' : (hovered ? '#059669' : '#064e3b')} 
        emissive={isPowered ? '#10b981' : '#000000'}
        emissiveIntensity={isPowered ? 2 : 0}
        toneMapped={false}
      />
    </mesh>
  );
}