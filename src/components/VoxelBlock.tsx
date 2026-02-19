import { useRef } from 'react';
import { Mesh } from 'three';
import type { MeshProps } from '@react-three/fiber';
import { useRedstoneStore } from '../store/useRedstoneStore';

export function VoxelBlock(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  
  // Este componente solo LEE el estado global. No lo modifica.
  const isPowered = useRedstoneStore((state) => state.isPowered);

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      {/* Si isPowered es true, se vuelve rojo neón. Si no, se queda en Bedrock Grey */}
      <meshStandardMaterial 
        color={isPowered ? '#ff3b30' : '#27272a'} 
        emissive={isPowered ? '#ff3b30' : '#000000'} // Emite luz roja si está encendido
        emissiveIntensity={isPowered ? 2.5 : 0} // Fuerza del brillo
        toneMapped={false} // Evita que R3F apague los colores ultrabrillantes
      />
    </mesh>
  );
}