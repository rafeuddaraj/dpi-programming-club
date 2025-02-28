"use client";

import { motion } from "framer-motion";

export const MotionH1 = ({ children, ...rest }) => (
  <motion.h1 {...rest}>{children}</motion.h1>
);
export const MotionDiv = ({ children, ...rest }) => (
  <motion.div {...rest}>{children}</motion.div>
);
export const MotionP = ({ children, ...rest }) => (
  <motion.p {...rest}>{children}</motion.p>
);
