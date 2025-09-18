// src/components/WikiCanvas.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";

export default function WikiCanvas() {
  const router = useRouter();

  const handleBoxClick = () => {
    // This will navigate to your new page
    router.push("/wiki/manufacturing");
  };

  return (
    <div className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls />

        {/* This box will represent your 'Manufacturing' section */}
        <mesh onClick={handleBoxClick} position={[0, 0, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="teal" />
        </mesh>
        {/* We will add more objects for other sections later */}
      </Canvas>
    </div>
  );
}
