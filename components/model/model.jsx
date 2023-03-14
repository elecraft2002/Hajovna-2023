import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { nodes, materials } = useGLTF("/hajovna.gltf");
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          position={[14.6, -2.54, 2.98]}
          rotation={[-Math.PI / 2, 0.04, -Math.PI]}
          userData={{ name: "Sketchfab_model" }}
        >
          <group name="root" userData={{ name: "root" }}>
            <group
              name="GLTF_SceneRootNode"
              rotation={[Math.PI / 2, 0, 0]}
              userData={{ name: "GLTF_SceneRootNode" }}
            >
              <group
                name="Cube_0"
                position={[-0.01, 0, 0.02]}
                userData={{ name: "Cube_0" }}
              >
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.Blue}
                  userData={{ name: "Object_4" }}
                />
                <mesh
                  name="Object_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_5.geometry}
                  material={materials.grey}
                  userData={{ name: "Object_5" }}
                />
                <mesh
                  name="Object_6"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6.geometry}
                  material={materials.Black}
                  userData={{ name: "Object_6" }}
                />
                <mesh
                  name="Object_7"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_7.geometry}
                  material={materials.material}
                  userData={{ name: "Object_7" }}
                />
                <mesh
                  name="Object_8"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8.geometry}
                  material={materials.White}
                  userData={{ name: "Object_8" }}
                />
              </group>
            </group>
          </group>
        </group>
        <group
          name="Sketchfab_model001"
          position={[2.66, -2.1, -7.14]}
          rotation={[1.44, -0.2, 1]}
          userData={{ name: "Sketchfab_model.001" }}
        >
          <group name="root001" userData={{ name: "root.001" }}>
            <group
              name="GLTF_SceneRootNode001"
              rotation={[Math.PI / 2, 0, 0]}
              userData={{ name: "GLTF_SceneRootNode.001" }}
            >
              <group
                name="Cube_0001"
                position={[-0.01, 0, 0.02]}
                userData={{ name: "Cube_0.001" }}
              >
                <mesh
                  name="Object_4001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4001.geometry}
                  material={materials.Brown}
                  userData={{ name: "Object_4.001" }}
                />
                <mesh
                  name="Object_5001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_5001.geometry}
                  material={materials.grey}
                  userData={{ name: "Object_5.001" }}
                />
                <mesh
                  name="Object_6001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_6001.geometry}
                  material={materials.Black}
                  userData={{ name: "Object_6.001" }}
                />
                <mesh
                  name="Object_7001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_7001.geometry}
                  material={materials.material}
                  userData={{ name: "Object_7.001" }}
                />
                <mesh
                  name="Object_8001"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_8001.geometry}
                  material={materials.White}
                  userData={{ name: "Object_8.001" }}
                />
              </group>
            </group>
          </group>
        </group>
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.Wall}
          scale={[2.5, 2.5, 5]}
          userData={{ name: "Cube" }}
        />
        <mesh
          name="Roof"
          castShadow
          receiveShadow
          geometry={nodes.Roof.geometry}
          material={materials.Roof}
          scale={[2.5, 2.5, 5]}
          userData={{ name: "Roof" }}
        >
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials.Roof}
            userData={{ name: "Cube.002" }}
          />
        </mesh>
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={nodes.Plane.material}
          position={[3.5, 0.08, 1.68]}
          userData={{ name: "Plane" }}
        />
        <mesh
          name="Cube001"
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.Dark}
          scale={[2.5, 2.5, 5]}
          userData={{ name: "Cube.001" }}
        />
        <mesh
          name="Cube003"
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.Concrate}
          position={[2.87, -2.44, -0.92]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.52, -0.12, -0.84]}
          userData={{ name: "Cube.003" }}
        />
        <mesh
          name="Cube004"
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.Concrate}
          position={[2.77, -2.21, -0.92]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.27, -0.12, -0.57]}
          userData={{ name: "Cube.004" }}
        />
        <mesh
          name="Plane001"
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          material={materials.Grass}
          position={[0.4, -2.5, 4.73]}
          scale={17.32}
          userData={{ name: "Plane.001" }}
        />
        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials.Wood}
          position={[5.24, -0.79, 15.34]}
          scale={1.73}
          userData={{ name: "Cube.005" }}
        />
        <mesh
          name="Cube006"
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials.Concrate}
          position={[4.72, -2.57, 5.29]}
          rotation={[-Math.PI, 0, -3.11]}
          scale={[-1, -0.1, -0.47]}
          userData={{ name: "Cube.006" }}
        />
        <mesh
          name="Cube007"
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials.Concrate}
          position={[6.31, -2.57, 0.01]}
          rotation={[Math.PI / 2, 1.52, -1.54]}
          scale={[-1, -0.1, -0.47]}
          userData={{ name: "Cube.007" }}
        />
        <mesh
          name="Text"
          castShadow
          receiveShadow
          geometry={nodes.Text.geometry}
          material={nodes.Text.material}
          position={[14.77, -1.81, 2.99]}
          rotation={[Math.PI / 2, 0, -2.6]}
          scale={0.44}
          userData={{ name: "Text" }}
        />
        <mesh
          name="Text001"
          castShadow
          receiveShadow
          geometry={nodes.Text001.geometry}
          material={nodes.Text001.material}
          position={[11.38, 8.9, 1.96]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1.51}
          userData={{ name: "Text.001" }}
        />
        <mesh
          name="Text002"
          castShadow
          receiveShadow
          geometry={nodes.Text002.geometry}
          material={nodes.Text002.material}
          position={[5.16, -1.5, -0.39]}
          rotation={[Math.PI / 2, 0, -1.66]}
          scale={0.44}
          userData={{ name: "Text.002" }}
        />
        <mesh
          name="Bush"
          castShadow
          receiveShadow
          geometry={nodes.Bush.geometry}
          material={materials["Material.002"]}
          position={[2.34, -2.38, 7.34]}
          scale={0.47}
          userData={{ name: "Bush" }}
        />
        <mesh
          name="Bush001"
          castShadow
          receiveShadow
          geometry={nodes.Bush001.geometry}
          material={materials["Material.002"]}
          position={[2.99, -2.38, 0.44]}
          scale={0.27}
          userData={{ name: "Bush.001" }}
        />
        <mesh
          name="Bush002"
          castShadow
          receiveShadow
          geometry={nodes.Bush002.geometry}
          material={materials["Material.002"]}
          position={[2.79, -2.43, -4.89]}
          scale={0.39}
          userData={{ name: "Bush.002" }}
        />
        <mesh
          name="Bush003"
          castShadow
          receiveShadow
          geometry={nodes.Bush003.geometry}
          material={materials["Material.002"]}
          position={[2.4, -2.4, -5.32]}
          scale={0.39}
          userData={{ name: "Bush.003" }}
        />
        <mesh
          name="Bush004"
          castShadow
          receiveShadow
          geometry={nodes.Bush004.geometry}
          material={materials["Material.002"]}
          position={[2.99, -2.74, 13.15]}
          scale={0.47}
          userData={{ name: "Bush.004" }}
        />
        <mesh
          name="Bush005"
          castShadow
          receiveShadow
          geometry={nodes.Bush005.geometry}
          material={materials["Material.002"]}
          position={[7.09, -2.69, 13.52]}
          scale={0.47}
          userData={{ name: "Bush.005" }}
        />
        <mesh
          name="Bush006"
          castShadow
          receiveShadow
          geometry={nodes.Bush006.geometry}
          material={materials["Material.002"]}
          position={[7.71, -2.82, 15.15]}
          scale={0.47}
          userData={{ name: "Bush.006" }}
        />
        <mesh
          name="Tree"
          castShadow
          receiveShadow
          geometry={nodes.Tree.geometry}
          material={materials.Tree}
          position={[-7.42, -2.3, -9.65]}
          rotation={[Math.PI, -0.58, Math.PI]}
          scale={0.9}
          userData={{ name: "Tree" }}
        />
        <mesh
          name="Tree001"
          castShadow
          receiveShadow
          geometry={nodes.Tree001.geometry}
          material={materials.Tree}
          position={[9.79, -3.34, 16.75]}
          scale={0.47}
          userData={{ name: "Tree.001" }}
        />
        <mesh
          name="Tree002"
          castShadow
          receiveShadow
          geometry={nodes.Tree002.geometry}
          material={materials.Tree}
          position={[15.62, -2.94, 4.75]}
          rotation={[-Math.PI, 0.02, -Math.PI]}
          scale={0.47}
          userData={{ name: "Tree.002" }}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/hajovna.gltf");
