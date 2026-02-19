import { create } from 'zustand';

// Definimos la interfaz (TypeScript) de nuestro estado global
interface RedstoneState {
  isPowered: boolean;
  togglePower: () => void;
}

// Creamos el store. Esto es accesible desde CUALQUIER componente de la app.
export const useRedstoneStore = create<RedstoneState>((set) => ({
  isPowered: false, // Estado inicial: Apagado
  togglePower: () => set((state) => ({ isPowered: !state.isPowered })),
}));