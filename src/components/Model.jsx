import { useControls } from "leva"
import { fragment, vertex } from "./shader"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Model() {

    const { amplitude, waveLength } = useControls({
        amplitude: { value: 0, min: 0, max: 5, step: 0.1 },
        waveLength: { value: 1, min: 0, max: 20, step: 1 }
    })

    const plane = useRef();
    const uniforms = useRef({
        uAmplitude: { value: amplitude },
        uWaveLength: { value: waveLength }
    })

    useFrame(() => {
        plane.current.material.uniforms.uAmplitude.value = amplitude;
        plane.current.material.uniforms.uWaveLength.value = waveLength;
    })

    return (
        <mesh ref={plane}>
            <planeGeometry args={[3, 3, 15, 15]} />
            {/* <meshBasicMaterial color={"red"} wireframe={true} /> */}
            <shaderMaterial
                vertexShader={vertex}
                fragmentShader={fragment}
                wireframe={true}
                uniforms={uniforms.current}
            />
        </mesh>
    )
}
