import { motion } from "framer-motion";
import Backdrop from "../backdrop/index";
import styles from "../../styles/Modal.module.css";
import { useEffect } from "react";
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

const Modal = ({ handleClose, text, text1, text2, text2func }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`${styles["modal"]} ${styles["green-gradient"]}`}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <br></br>
        <br></br>
        <h1 style={{ color:"white"}}>{text}</h1>
        <h3 style={{ color:"white"}}>{text1}</h3>
        <center>
        <button
          className={`${styles["button"]} ${styles["close-button"]}`}
          onClick={text2func}
        >
          <text style={{ color:"black"}}>{text2}</text>
        </button>
        <button
          className={`${styles["button"]} ${styles["close-button"]}`}
          onClick={handleClose}
          style={{ color:"white"}}
        >
          <text style={{ color:"black"}}> {"   "} {"Cancel"}</text>
        </button>
        </center>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
