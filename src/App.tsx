import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { VoxelBlock } from './components/VoxelBlock';
import { LeverBlock } from './components/LeverBlock';
import { useRedstoneStore } from './store/useRedstoneStore';

function App() {
  const isPowered = useRedstoneStore((state) => state.isPowered);

  const wirePositions: [number, number, number][] = [
    [-1, 0.5, 0], [0, 0.5, 0], [1, 0.5, 0], [2, 0.5, 0], [3, 0.5, 0],
  ];

  return (
    <div className="w-full h-full relative bg-[#09090b] font-mono overflow-hidden">
      
      {/* =========================================
          CAPA 2D: CINEMATIC HUD (GLASSMORPHISM)
          ========================================= */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
        
        {/* Top Header */}
        <div className="flex justify-between items-start">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-2xl">
            <h1 className="text-white text-xl font-bold tracking-widest mb-1">NEXUS<span className="text-[#ff3b30]">LOGIC</span></h1>
            <p className="text-gray-400 text-xs tracking-widest">MINECRAFT EDTECH VISUALIZER</p>
          </div>
          
          {/* Status Indicator */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isPowered ? 'bg-[#10b981] shadow-[0_0_10px_#10b981]' : 'bg-[#ef4444]'}`}></div>
            <span className="text-white text-xs tracking-widest">{isPowered ? 'CIRCUIT ACTIVE' : 'SYSTEM OFFLINE'}</span>
          </div>
        </div>

        {/* Bottom Footer / Educational Hook */}
        <div className="self-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full max-w-lg text-center backdrop-saturate-150">
          <p className="text-gray-300 text-sm mb-2">
            <span className="text-[#06b6d4]">{"<Lesson>"}</span> Boolean Logic: The Foundation of Computing <span className="text-[#06b6d4]">{"</Lesson>"}</span>
          </p>
          <p className="text-white text-xs opacity-70">
            Interact with the emerald input to toggle the energetic state. Observe signal propagation.
          </p>
        </div>
      </div>

      {/* =========================================
          CAPA 3D: RENDER ENGINE
          ========================================= */}
      <Canvas camera={{ position: [6, 5, 8], fov: 45 }}>
        {/* Entorno más oscuro para que el neón resalte más */}
        <color attach="background" args={['#050505']} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Grid 
          position={[0, 0, 0]} args={[40, 40]} cellSize={1} cellThickness={1} cellColor="#18181b" 
          sectionSize={5} sectionThickness={1.5} sectionColor={isPowered ? "#450a0a" : "#082f49"} /* El suelo reacciona al estado */
          fadeDistance={20} fadeStrength={1} 
        />

        {/* Circuito */}
        <LeverBlock position={[-3, 0.5, 0]} />
        {wirePositions.map((pos, index) => (
          <VoxelBlock key={index} position={pos} />
        ))}

        {/* POST-PROCESSING: La Magia del Bloom */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={1} /* Solo hace brillar lo que tiene emisividad > 1 */
            mipmapBlur 
            intensity={2} /* Fuerza del resplandor */
          />
        </EffectComposer>

        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.05} autoRotate={isPowered} autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

export default App;