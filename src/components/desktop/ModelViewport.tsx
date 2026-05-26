"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";

interface ModelViewportProps {
  modelPath: string;
  showAxes?: boolean;
}

function SceneModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

export default function ModelViewport({
  modelPath,
  showAxes = false,
}: ModelViewportProps) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    fetch(modelPath, { method: "HEAD" })
      .then((res) => {
        if (active) setExists(res.ok);
      })
      .catch(() => {
        if (active) setExists(false);
      });

    return () => {
      active = false;
    };
  }, [modelPath]);

  return (
    <div className="relative h-full w-full bg-[#0e1117]">
      <Canvas camera={{ position: [2.4, 1.8, 2.4], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight intensity={1} position={[4, 4, 3]} />
        <Suspense fallback={null}>
          {exists ? (
            <group scale={1.1}>
              <SceneModel modelPath={modelPath} />
            </group>
          ) : (
            <mesh>
              <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />
              <meshStandardMaterial color="#3dd2ff" metalness={0.55} roughness={0.2} />
            </mesh>
          )}
          <Environment preset="city" />
        </Suspense>
        <OrbitControls makeDefault />
        {showAxes ? (
          <GizmoHelper alignment="bottom-left" margin={[80, 80]}>
            <GizmoViewport axisColors={["#ef4444", "#22c55e", "#3b82f6"]} labelColor="white" />
          </GizmoHelper>
        ) : null}
      </Canvas>
    </div>
  );
}
