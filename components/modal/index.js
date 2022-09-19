import { motion } from "framer-motion";
import Backdrop from "../backdrop/index";
import styles from "../../styles/Modal.module.css"
const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0,
    },
    visible: {
        y: "0",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};


const Modal = ({ handleClose, text, text1, deleteTeam }) => {

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className={`${styles["modal"]} ${styles["orange-gradient"]}`}
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <button className={`${styles["button"]} ${styles["close"]}`} onClick={handleClose}>Close</button>
                <h2>{text}</h2>
                <h4>{text1}</h4>
                <button
                    className={`${styles["button"]} ${styles["close-button"]}`}
                    onClick={deleteTeam}
                >
                    Delete Team
                </button>
            </motion.div>
        </Backdrop>
    );
};


export default Modal;