import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const ParticlesComponent: React.FC = () => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fpsLimit: 60,
                particles: {
                    color:
                    {
                        value: "#112743",
                    },
                    links: 
                    {
                        color: "#112743",
                        distance: 200,
                        enable: true,
                        opacity: 0.5,
                        width: 0.4,
                    },
                    move:
                    {
                        direction: "none",
                        enable: true,
                        outMode: "bounce",
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number:
                    {
                        density:
                        {
                            enable: true,
                            area: 600,
                        },
                        value: 80,
                    },
                    opacity:
                    {
                        value: 0.5,
                    },
                    shape:
                    {
                        type: "circle",
                    },
                    size:
                    {
                        random: true,
                        value: 3,
                    },
                },
                detectRetina: false,
            }}
        />
    );
};

export default ParticlesComponent;