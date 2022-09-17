import styles from "../../styles/scrollProgressAnimation.module.css";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressAnimation() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <motion.div className={styles["progress-bar"]} style={{ scaleX }} />
    </>
  );
}
