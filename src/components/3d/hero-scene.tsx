"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Stars,
  Sparkles,
  MeshDistortMaterial,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

// A maple leaf shape extruded into a 3D mesh
function useMapleLeafGeometry() {
  return useMemo(() => {
    const pts: [number, number][] = [
      [0, 1.0],
      [0.12, 0.58],
      [0.42, 0.7],
      [0.36, 0.44],
      [0.72, 0.46],
      [0.58, 0.22],
      [0.96, 0.02],
      [0.58, -0.12],
      [0.62, -0.4],
      [0.3, -0.32],
      [0.22, -0.68],
      [0.0, -0.44],
      [-0.22, -0.68],
      [-0.3, -0.32],
      [-0.62, -0.4],
      [-0.58, -0.12],
      [-0.96, 0.02],
      [-0.58, 0.22],
      [-0.72, 0.46],
      [-0.36, 0.44],
      [-0.42, 0.7],
      [-0.12, 0.58],
    ];
    const shape = new THREE.Shape();
    shape.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.18,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 4,
      curveSegments: 24,
    });
    geo.center();
    geo.computeVertexNormals();
    return geo;
  }, []);
}

function FloatingMapleLeaf() {
  const geometry = useMapleLeafGeometry();
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.6 + t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.35) * 0.22;
    ref.current.rotation.z = Math.sin(t * 0.22) * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} geometry={geometry} scale={1.55} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#7a0d1c"
          metalness={0.55}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.12}
          reflectivity={0.85}
          emissive="#1a0408"
          emissiveIntensity={0.28}
        />
      </mesh>
    </Float>
  );
}

function OrbitingGlobe() {
  const group = useRef<THREE.Group>(null);
  const dots = useMemo(() => {
    // Generate points on a sphere to resemble a globe grid
    const arr: THREE.Vector3[] = [];
    const count = 900;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const v = new THREE.Vector3();
      v.setFromSphericalCoords(1, phi, theta);
      arr.push(v);
    }
    const positions = new Float32Array(arr.length * 3);
    arr.forEach((v, i) => {
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
    });
    return positions;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.12;
    group.current.rotation.x = Math.sin(t * 0.1) * 0.08;
  });

  return (
    <group ref={group} position={[2.6, -0.4, -1.2]} scale={1.35}>
      <mesh>
        <sphereGeometry args={[0.98, 64, 64]} />
        <meshPhysicalMaterial
          color="#0a0a14"
          metalness={0.35}
          roughness={0.4}
          transmission={0.18}
          thickness={0.6}
          ior={1.42}
          opacity={0.88}
          transparent
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.001, 48, 48]} />
        <meshBasicMaterial color="#d4b078" wireframe transparent opacity={0.10} />
      </mesh>
      <Points positions={dots} stride={3}>
        <PointMaterial
          transparent
          color="#ead7af"
          size={0.018}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.28, 0.008, 16, 120]} />
        <meshBasicMaterial color="#d4b078" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 2, Math.PI / 3.5, 0]}>
        <torusGeometry args={[1.48, 0.005, 16, 120]} />
        <meshBasicMaterial color="#ead7af" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.3;
  });
  return (
    <mesh ref={ref} position={[-2.9, 1.2, -2]} scale={1}>
      <icosahedronGeometry args={[0.9, 6]} />
      <MeshDistortMaterial
        color="#1f0a14"
        distort={0.42}
        speed={1.4}
        roughness={0.25}
        metalness={0.7}
        emissive="#3a0610"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.2, 5.2], fov: 45 }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.32} />
      <directionalLight position={[4, 6, 4]} intensity={1.3} color="#fff8e9" />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#d4b078" />
      <pointLight position={[0, 0, 2]} intensity={1.0} color="#ead7af" />

      <Suspense fallback={null}>
        <FloatingMapleLeaf />
        <OrbitingGlobe />
        <Blob />

        <Sparkles
          count={70}
          size={2.5}
          scale={[8, 5, 4]}
          speed={0.3}
          opacity={0.7}
          color="#ead7af"
        />
        <Stars
          radius={40}
          depth={30}
          count={1600}
          factor={3}
          fade
          saturation={0}
          speed={0.4}
        />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
