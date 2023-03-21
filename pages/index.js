import { Model } from "@/components/model/model";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Html,
  Instances,
  OrbitControls,
  Stage,
  Text3D,
} from "@react-three/drei";
import { interpolate } from "remotion";
import styled from "styled-components";
import { Scroll, ScrollControls } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Roboto from "../assets/fonts/Roboto Medium_Regular.json";

const StyledAnimationContainer = styled.div`
  height: 400vh;
  background: white;
  width: 100vw;
`;
const StyledCanvasContainer = styled.div`
  position: fixed;
  top: 0;
`;
export const deg2rad = (degrees) => degrees * (Math.PI / 180);
export const rad2deg = (radians) => radians * (180 / Math.PI);

const Effects = () => {
  return (
    <EffectComposer>
      <SSAO
        blendFunction={BlendFunction.MULTIPLY} // Use NORMAL to see the effect
        samples={16}
        radius={5}
        intensity={30}
      />
    </EffectComposer>
  );
};

const ScrollBasedAnimation = ({ frame }) => {
  const animationPosition = {
    data: [
      [20 - 4, 10 - 4, -5], //1
      [18 - 2, -2 - 3, -5], //2
      [10 - 1, 0 - 4, -6], //3
      [10 - 1, 0 - 4, -6], //3
    ],
    time: [
      0,
      window.innerHeight,
      window.innerHeight * 2,
      window.innerHeight * 3,
    ],
  };
  const animationRotation = {
    data: [
      //In deg
      [0, 90, 0], //1
      [0, 140, 0], //2
      [0, 100, 0], //3
      [0, 100, 0], //3
    ],
    time: [
      0,
      window.innerHeight,
      window.innerHeight * 2,
      window.innerHeight * 3,
    ],
  };

  const cameraPositionX = interpolate(
    frame,
    animationPosition.time,
    animationPosition.data.map((e) => e[0])
  );
  const cameraPositionY = interpolate(
    frame,
    animationPosition.time,
    animationPosition.data.map((e) => e[1])
  );
  const cameraPositionZ = interpolate(
    frame,
    animationPosition.time,
    animationPosition.data.map((e) => e[2])
  );
  const cameraRotationX = interpolate(
    frame,
    animationRotation.time,
    animationRotation.data.map((e) => deg2rad(e[0]))
  );
  const cameraRotationY = interpolate(
    frame,
    animationRotation.time,
    animationRotation.data.map((e) => deg2rad(e[1]))
  );
  const cameraRotationZ = interpolate(
    frame,
    animationRotation.time,
    animationRotation.data.map((e) => deg2rad(e[2]))
  );
  useFrame(({ mouse, camera }) => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      cameraPositionX + mouse.x * 0.05,
      0.1
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      cameraPositionY + mouse.y * 0.08,
      0.1
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      cameraPositionZ + Math.abs(mouse.x * mouse.y * 0.08),
      0.1
    );
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      cameraRotationX,
      0.1
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      cameraRotationY,
      0.1
    );
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      cameraRotationZ,
      0.1
    );
  });
  return null;
  return (
    <ScrollControls pages={4} enabled={false}>
      <Scroll></Scroll>
    </ScrollControls>
  );
};
const Scene = () => {
  const ref = useRef(null);
  const [frame, updateFrame] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const handleScroll = () => {
    updateFrame(window.scrollY);
  };

  useEffect(() => {
    setFontSize(window.innerWidth / 1000);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledAnimationContainer>
      <StyledCanvasContainer>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            fov: 50,
            // position: [cameraPositionX, 0, 0],
            rotation: [deg2rad(90), deg2rad(0), deg2rad(0)],
          }}
          style={{ width: "100vw", height: "100vh", background: "white" }}
        >
          {/* <Effects /> */}
          <Suspense fallback={null}>
            <Stage
              preset="rembrandt"
              intensity={1}
              environment="city"
              adjustCamera={false}
            >
              {/* <pointLight intensity={10} color={"white"} position={[0, 10, 0]} /> */}
              {/* <ambientLight intensity={1} /> */}
              <hemisphereLight />
              <Model />
              <mesh castShadow receiveShadow>
                <Text3D
                  font={Roboto}
                  position={[11.38, 8.9, 1.96]}
                  rotation={[0, deg2rad(90), 0]}
                  castShadow
                  receiveShadow
                  size={fontSize}
                >
                  <meshStandardMaterial color={"orange"} />
                  Ahooj
                </Text3D>
              </mesh>
              <ScrollBasedAnimation frame={frame} />
            </Stage>
          </Suspense>
          {/* <OrbitControls
            ref={ref}
            target={cameraTarget}
            enableDamping={false}
            // maxPolarAngle={deg2rad(90)}
            // minAzimuthAngle={deg2rad(90)}
            // maxAzimuthAngle={deg2rad(1)}
            enableZoom={false}
          /> */}
        </Canvas>
      </StyledCanvasContainer>
      <p>
        Rok se s rokem sešel a nastal čas zopakovat již tradiční hájovnu na
        oslavu začátku léta. Obdržením této pozvánky jste se staly jedním z
        vyvolených, kteří se této akce budou moci účastnit. Až tento radostný
        šok vydejcháš, zapiš si do diářku datum 4. Července, ať kvůli tomu pak
        nemusíš něco rušit. Jídlo a pití pro tebe rádi zajistíme, takže s sebou
        ber jen symbolický vstup 300kč, návykové látky dle vlastní volby a pokud
        se chceš vypsat tak doporučujeme stan. (Pokud plánuješ přijet autem, tak
        možná radši dej vědět Jonášovi, ať je jistota že pro tebe budeme mít
        místo)
      </p>
    </StyledAnimationContainer>
  );
};
export default function Home() {
  const ref = useRef(null);
  const [frame, updateFrame] = useState(0);
  const handleScroll = () => {
    updateFrame(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      <Scene />
    </main>
  );
}
