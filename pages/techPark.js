import { useEffect, useState } from "react";
import Modal from "../components/modal";
import { AnimatePresence } from "framer-motion";
import Loading from "../components/Loading"


export default function PhaserGame() {
    const [prompt, setPrompt] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        async function initPhaser() {
            const Phaser = await import("phaser");
            const { default: GridEngine } = await import("grid-engine");
            const { default: Preloader } = await import("../scenes/techPark/Preloader-techPark");
            const { default: TestScene } = await import("../scenes/techPark/TestScene-techPark");

            const phaserGame = new Phaser.Game({
                type: Phaser.AUTO,
                title: "round-one-techPark",
                parent: "game-content",
                width: window.innerWidth / 2,
                height: window.innerHeight / 2,
                pixelArt: true,
                scale: {
                    zoom: 3,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                },
                scene: [Preloader, TestScene],
                physics: {
                    default: "arcade",
                    arcade: {
                        debug: true,
                    },
                },
                plugins: {
                    scene: [
                        {
                            key: "gridEngine",
                            plugin: GridEngine,
                            mapping: "gridEngine",
                        },
                    ],
                },
                backgroundColor: "#9592a2",
            });

            setIsLoading(false)
        }
        initPhaser();
    }, []);
    useEffect(() => {
        const dialogBoxEventListener = ({ detail }) => {
            setPrompt(detail.areaName);
        };
        window.addEventListener("prompt", dialogBoxEventListener);
    }, []);

    const closePrompt = () => {
        setPrompt(false);
    }


    return (
        <>
            {/* <Game/> */}
            {isLoading ? <Loading /> : <>
                <div id="game-content" key="game-content"></div>
                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                    onExitComplete={() => null}
                >
                    {prompt && (
                        <Modal
                            modalOpen={prompt}
                            handleClose={closePrompt}
                            text={`Do you want to place your resort in ${prompt}?`}
                            text1={"This action can't be reversed!!"}
                            text2={"Yes I'm sure"}
                            deleteTeam={closePrompt}
                        />
                    )}
                </AnimatePresence>
            </>}

        </>
    );
}
