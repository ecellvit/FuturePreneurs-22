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
            const { default: TestScene } = await import("../scenes/temple/templeGame");

            const phaserGame = new Phaser.Game({
                type: Phaser.AUTO,
                title: "round-one-temple",
                parent: "game-content",
                width: window.innerWidth / 2,
                height: window.innerHeight / 2,
                pixelArt: true,
                scale: {
                    zoom: 2,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                },
                scene: [TestScene],
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
                backgroundColor: "#a9aaa9",
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
        // const customEvent = new CustomEvent('promptClosed', {
        // });
        // window.dispatchEvent(customEvent);
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
