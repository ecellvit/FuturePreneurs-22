import { motion } from "framer-motion";

export const HoverAnimation = ({ children }) => (
  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    {children}
  </motion.div>
);
