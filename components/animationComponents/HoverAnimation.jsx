import { motion } from "framer-motion";

export const HoverAnimation = ({ children }) => (
  <motion.div whileHover={{ scale: 1.1 }}>{children}</motion.div>
);
