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
import Roboto from "../../assets/fonts/Roboto Medium_Regular.json";
import { COLORS } from "../_app";
import guestList from "../guestList.json";
import randomColor from "randomcolor";
import Head from "next/head";
import image1 from "/assets/images/_DSC0055.jpg";
import Image from "next/image";

const StyledAnimationContainer = styled.div`
  /* height: 400vh; */
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

const ScrollBasedAnimation = ({ frame, animationLength }) => {
  const animationPosition = {
    data: [
      [16, 6, -5], //1
      [16, -4.5, -5], //2
      [9, -4, -6], //3
    ],
    time: [0, animationLength, animationLength + window.innerHeight],
  };
  const animationRotation = {
    data: [
      //In deg
      [0, 90, 0], //1
      [0, 140, 0], //2
      [0, 100, 0], //3
    ],
    time: [0, animationLength, animationLength + window.innerHeight],
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
};

const StyledContentContainer = styled.main`
  color: ${COLORS.dark};
  position: relative;
  text-align: center;
  padding-top: 50vh;
  margin-bottom: 100vh;
`;
const StyledTextContainer = styled.span`
  display: flex;
  margin: auto;
  padding: 1rem;
  margin: auto;
  max-width: 1000px;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;
const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 3px;
`;
const Content = ({ setAnimationLength }) => {
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current.clientHeight);
    setAnimationLength(ref.current.clientHeight);
  }, []);
  console.log(image1);
  return (
    <StyledContentContainer ref={ref}>
      <StyledTextContainer>
        <h1>Hájovna 2023</h1>
        <p>
          Rok se s rokem sešel a nastal čas zopakovat již tradiční hájovnu na
          oslavu začátku léta.
        </p>
        <p>
          Obdržením této pozvánky jste se staly jedním z
          <strong>vyvolených</strong>, kteří se této akce budou moci účastnit!
        </p>
        <p>
          Až tento radostný šok vydejcháš, zapiš si do diářku datum 4. července,
          ať kvůli tomu pak nemusíš něco rušit.
        </p>
        <h2>Co s sebou?</h2>
        <p>
          Jídlo a pití pro tebe rádi zajistíme, takže s sebou ber jen symbolický
          vstup 300kč, návykové látky dle vlastní volby a pokud se chceš vypsat
          tak doporučujeme stan.
        </p>
        <p>
          (Pokud plánuješ přijet autem, tak možná radši dej vědět Jonášovi, ať
          je jistota že pro tebe budeme mít místo)
        </p>
        <h3>Už se na tebe těšíme ty hovado.</h3>
        <StyledImage {...image1} />
      </StyledTextContainer>
    </StyledContentContainer>
  );
};

const color1 = randomColor({ luminosity: "dark" });
const color2 = randomColor({ luminosity: "dark" });

const Scene = ({ guest }) => {
  const ref = useRef(null);
  const [frame, updateFrame] = useState(0);
  const [fontSize, setFontSize] = useState(1);
  const [animationLength, setAnimationLength] = useState(0);
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
                  position={[14.77, -1.81, 2.99]}
                  rotation={[0, deg2rad(170), 0]}
                  castShadow
                  receiveShadow
                  size={0.5}
                >
                  <meshStandardMaterial color={color1} />
                  Těšíme se na tebe
                </Text3D>
                <Text3D
                  font={Roboto}
                  position={[5.16, -1.5, 1.39]}
                  rotation={[0, deg2rad(100), 0]}
                  castShadow
                  receiveShadow
                  size={0.5}
                >
                  <meshStandardMaterial color={color2} />
                  {guest.addresing}
                </Text3D>
              </mesh>
              <ScrollBasedAnimation
                animationLength={animationLength}
                frame={frame}
              />
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
      <Content setAnimationLength={setAnimationLength} />
      <div style={{ height: "100vh" }}></div>
    </StyledAnimationContainer>
  );
};
export default function Home({ guest }) {
  console.log(guest);
  return (
    <main>
      <Head>
        <title>Hájovna 2023</title>
      </Head>
      <Scene guest={guest} />
      <footer>Vojtík Suchánek 2023</footer>
    </main>
  );
}
export async function getStaticProps({ params }) {
  const guest = guestList.find((e) => e.id === params.id);
  return {
    props: {
      guest,
    },
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticPaths(context) {
  const paths = guestList.map((guest) => ({
    params: { id: guest.id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}
