import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Model } from "@/components/model/model";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Instances, OrbitControls, Stage } from "@react-three/drei";
import { interpolate } from "remotion";
import styled from "styled-components";

const StyledAnimationContainer = styled.main`
  height: 300vh;
  width: 100vw;
`;
export default function Home() {
  const ref = useRef(null);
  const frame = 10;
  // const cameraPosition = interpolate(frame,)
  return (
    <StyledAnimationContainer>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 0] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Suspense fallback={null}>
          <Stage
            controls={ref}
            preset="rembrandt"
            intensity={1}
            environment="city"
          >
            <Model />
          </Stage>
        </Suspense>
      </Canvas>
    </StyledAnimationContainer>
  );
}
