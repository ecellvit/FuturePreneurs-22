import { motion } from "framer-motion";

export const HoverAnimationLanding = ({ children }) => (
  <motion.div whileHover={{ scale: 2.1 }} whileTap={{ scale: 2.1 }}>
    {children}
  </motion.div>
);
