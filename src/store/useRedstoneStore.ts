import { create } from 'zustand';
import { play8BitSound } from '../utils/audioEngine';

export type Position3D = [number, number, number];

interface RedstoneState {
  isPowered: boolean;
  blocks: Position3D[];
  togglePower: () => void;
  addBlock: (position: Position3D) => void;
  removeBlock: (position: Position3D) => void;
}

export const useRedstoneStore = create<RedstoneState>((set) => ({
  isPowered: false,
  
  blocks: [],
  
  togglePower: () => set((state) => {
    play8BitSound('lever');
    return { isPowered: !state.isPowered };
  }),
  
  addBlock: (pos) => set((state) => {
    const exists = state.blocks.some(b => b[0] === pos[0] && b[1] === pos[1] && b[2] === pos[2]);
    if (exists) return state; 
    
    play8BitSound('place');
    return { blocks: [...state.blocks, pos] };
  }),

  removeBlock: (pos) => set((state) => {
    play8BitSound('break');
    return {
      blocks: state.blocks.filter(b => !(b[0] === pos[0] && b[1] === pos[1] && b[2] === pos[2]))
    };
  }),
}));