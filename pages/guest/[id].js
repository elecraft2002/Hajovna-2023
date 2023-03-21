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
import favicon from "/assets/images/beer.png";
import image1 from "/assets/images/_DSC0055.jpg";
import Image from "next/image";

const useGyroscope = ({ frequency } = {}, callback) => {
  const [angularVelocity, setAngularVelocity] = useState({
    x: null,
    y: null,
    z: null,
  });
  useEffect(() => {
    let sensor = new window.Gyroscope({
      frequency,
    });

    if (sensor) {
      sensor.start();

      sensor.onreading = () => {
        const readings = {
          x: sensor.x,
          y: sensor.y,
          z: sensor.z,
        };
        setAngularVelocity({ ...readings });

        if (callback instanceof Function) {
          callback({ ...readings });
        }
      };

      sensor.onerror = (event) => {
        // console.log(event.error.name, event.error.message);
        setAngularVelocity({
          x: null,
          y: null,
          z: null,
        });
      };
    }

    return () => {};
  }, [callback, frequency]);
  return angularVelocity;
};

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
  const gyroscope = useGyroscope();
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
      cameraRotationX + gyroscope.x,
      0.2
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      cameraRotationY + gyroscope.y,
      0.2
    );
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      cameraRotationZ + gyroscope.z,
      0.2
    );
  });
};

const StyledContentContainer = styled.main`
  color: ${COLORS.dark};
  position: relative;
  text-align: center;
  padding-top: 10vh;
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
    setAnimationLength(ref.current.clientHeight);
  }, []);
  return (
    <StyledContentContainer ref={ref}>
      <StyledTextContainer>
        <h1>Hájovna 2023</h1>
        <p>
          Opravdu jste si mysleli, že to byla poslední <strong>Hájovna</strong>?
          Dovolte nám Vás vyvést ze strašlivého omylu. Tomuto zvěrstvu ještě
          neodzvonilo a tradice se dodrží i tento rok! A co je ještě lepší? Že
          <strong>TY</strong> můžeš být u toho! To, co právě teď, jistě v
          nepopsatelné euforii čteš, je oficiální pozvánka na
          <strong>Hájovnu 2023</strong>! Řekni mamce, že 4. a možná radši i
          <strong>5. července</strong> nebudeš doma. Bude zle,
          <strong>L18</strong>
        </p>
        <br />
        <h2>OBČERSTVENÍ</h2>
        <p>
          Veškeré občerstvení zařídíme (ano, i chlast). Jenom teda počítáme s
          tím, že tě nezabije symbolických <strong>300 Kč</strong> za ten
          nehorázný
          <strong>ALL-INCLUSIVE</strong>, co si budeš užívat na 2 (slovy dvou)
          barech.
        </p>

        <h2>SPANÍ</h2>
        <p>
          V případě, že se chceš na akci vyspat, přibal si do batůžku spacák a
          pro sichr i stan. Vevnitř to není úplně jistota, většinou na pokojích
          vládne anarchie.
        </p>

        <h2>DOPRAVA MHD</h2>
        <p>
          Na místo konání jezdí MHD. Z hlavního terminálu Fugnerova si chyť
          <strong>bus</strong>
          číslo <strong>15</strong> a dávej bacha, ať jede až na zastávku Harcov
          Myslivna. Můžeš se svézt až tam a nebo vystoupit o jednu dřív
          <strong>(Kadlická)</strong>. Vyjde to časově nastejno.
        </p>

        <h2>DOPRAVA AUTEM</h2>
        <p>
          Příjezd kočárem hlas předem, ať máš kde zaparkovat. Adresa je
          <span>
            <a href="https://goo.gl/maps/ZPBfCVkDRLU1PVPL7" target="_blank">
              Lukášovská 41
            </a>
          </span>
          .
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
  return (
    <main>
      <Head>
        <link rel="icon" type="image/x-icon" href={favicon.src} />
        <title>Hájovna 2023 | {guest.name}</title>
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
