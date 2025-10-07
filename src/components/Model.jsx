import { useControls } from "leva"
import { fragment, vertex } from "./shader"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"

export default function Model() {

    const texture = useTexture('./images/image.jpg')

    const { amplitude, waveLength } = useControls({
        amplitude: { value: 0.25, min: 0, max: 2, step: 0.05 },
        waveLength: { value: 5, min: 0, max: 20, step: 1 }
    })

    const plane = useRef();
    const uniforms = useRef({
        uTexture: { value: texture },
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uWaveLength: { value: waveLength }
    })

    useFrame(() => {
        plane.current.material.uniforms.uTime.value += .04;
        plane.current.material.uniforms.uAmplitude.value = amplitude;
        plane.current.material.uniforms.uWaveLength.value = waveLength;
    })

    return (
        <mesh ref={plane}>
            <planeGeometry args={[3, 3, 45, 45]} />
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
