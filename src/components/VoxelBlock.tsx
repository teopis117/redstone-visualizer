import { useRef } from 'react';
import { Mesh } from 'three';
import type { MeshProps } from '@react-three/fiber';
import { useRedstoneStore } from '../store/useRedstoneStore';
import type { Position3D } from '../store/useRedstoneStore';

export function VoxelBlock(props: MeshProps) {
  const meshRef = useRef<Mesh>(null!);
  const isPowered = useRedstoneStore((state) => state.isPowered);
  const removeBlock = useRedstoneStore((state) => state.removeBlock);

  return (
    <mesh 
      {...props} 
      ref={meshRef}
      onContextMenu={(e) => {
        e.stopPropagation();
        if (props.position) {
          removeBlock(props.position as Position3D);
        }
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={isPowered ? '#ff3b30' : '#27272a'} 
        emissive={isPowered ? '#ff3b30' : '#000000'}
        emissiveIntensity={isPowered ? 2.5 : 0}
        toneMapped={false}
      />
    </mesh>
  );
}