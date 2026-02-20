import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { VoxelBlock } from './components/VoxelBlock';
import { LeverBlock } from './components/LeverBlock';
import { LampBlock } from './components/LampBlock';
import { useRedstoneStore } from './store/useRedstoneStore';

function App() {
  const isPowered = useRedstoneStore((state) => state.isPowered);
  const blocks = useRedstoneStore((state) => state.blocks);
  const addBlock = useRedstoneStore((state) => state.addBlock);

  return (
    <div className="w-full h-full relative bg-[#09090b] overflow-hidden" style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}>
      
      {/* CAPA 2D: HUD EDTECH CON EL RETO */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
        <div className="flex justify-between items-start">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex items-center gap-5 pointer-events-auto">
            <img src="/minecraft-logo.png" alt="Minecraft Education Logo" className="h-10 object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]" />
            <div className="h-10 w-[2px] bg-white/10 rounded-full"></div>
            <div>
              <h1 className="text-white text-lg font-bold tracking-tight mb-0.5 leading-tight">
                Laboratorio de <span className="text-[#ff3b30] drop-shadow-[0_0_8px_rgba(255,59,48,0.8)]">Redstone</span>
              </h1>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Reto de Conexión</p>
            </div>
          </div>
          
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 flex items-center gap-3 shadow-2xl">
            <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${isPowered ? 'bg-[#10b981] shadow-[0_0_15px_#10b981]' : 'bg-[#ef4444]'}`}></div>
            <span className={`font-bold text-sm tracking-wide transition-colors ${isPowered ? 'text-white' : 'text-gray-400'}`}>
              {isPowered ? 'ENERGÍA DETECTADA' : 'SISTEMA APAGADO'}
            </span>
          </div>
        </div>

        {/* INSTRUCCIONES DEL RETO */}
        <div className="self-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5 w-full max-w-2xl text-center shadow-2xl mb-4 pointer-events-auto">
          <p className="text-xl text-[#fbbf24] font-bold mb-2 flex items-center justify-center gap-2 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">
            🏆 ¡Reto: Enciende la Lámpara Dorada!
          </p>
          <div className="text-gray-300 text-sm font-medium flex justify-center gap-6">
            <p>Construye un camino haciendo <span className="text-white font-bold">clic izquierdo</span> en el suelo para conectar la palanca con la lámpara.</p>
          </div>
        </div>
      </div>

      {/* CAPA 3D: EL MAPA DEL RETO */}
      <Canvas camera={{ position: [6, 7, 10], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Plano Invisible para capturar clics y construir */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} 
          onClick={(e) => {
            e.stopPropagation();
            const x = Math.round(e.point.x);
            const z = Math.round(e.point.z);
            addBlock([x, 0.5, z]);
          }}
        >
          <planeGeometry args={[40, 40]} />
          <meshBasicMaterial visible={false} />
        </mesh>

        <Grid position={[0, 0.01, 0]} args={[40, 40]} cellSize={1} cellThickness={1} cellColor="#18181b" sectionSize={5} sectionThickness={1.5} sectionColor={isPowered ? "#450a0a" : "#082f49"} fadeDistance={25} fadeStrength={1} />

        {/* ELEMENTOS DEL RETO */}
        <LeverBlock position={[-4, 0.5, 4]} />
        <LampBlock position={[4, 0.5, -4]} />
        
        {/* Bloques del Usuario */}
        {blocks.map((pos) => (
          <VoxelBlock key={`${pos[0]}-${pos[1]}-${pos[2]}`} position={pos} />
        ))}

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={2.5} />
        </EffectComposer>

        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.05} enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}

export default App;