import { useRef, useState } from 'react';
import { Mesh } from 'three';
import type { MeshProps } from '@react-three/fiber';
import { useRedstoneStore } from '../store/useRedstoneStore';

export function LeverBlock(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  
  // Conectamos este bloque a la función de encendido/apagado global
  const { isPowered, togglePower } = useRedstoneStore();

  return (
    <mesh
      {...props}
      ref={meshRef}
      onClick={(e) => { 
        e.stopPropagation(); 
        togglePower(); // <--- Dispara el cambio de estado global
      }}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
    >
      {/* Geometría un poco más grande (1.2) para denotar que es un control */}
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      {/* Colores: Esmeralda brillante si está encendido, verde oscuro si está apagado */}
      <meshStandardMaterial 
        color={isPowered ? '#10b981' : (hovered ? '#059669' : '#064e3b')} 
        emissive={isPowered ? '#10b981' : '#000000'}
        emissiveIntensity={isPowered ? 2 : 0}
        toneMapped={false}
      />
    </mesh>
  );
}