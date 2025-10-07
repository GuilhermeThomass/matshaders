import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { OrbitControls } from "@react-three/drei";


export default function Scene() {
    return (
        <Canvas>
            <Model />
            <OrbitControls />
        </Canvas>
    )
}
