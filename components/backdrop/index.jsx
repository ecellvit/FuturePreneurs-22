import { motion } from "framer-motion";
import styles from "../../styles/Modal.module.css"

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={styles["backdrop"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;