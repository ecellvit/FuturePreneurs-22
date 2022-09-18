import React, { ReactNode } from "react";
import { motion } from "framer-motion";

export const Rotating = ({ children }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ rotate: 360, scale: 1 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);
