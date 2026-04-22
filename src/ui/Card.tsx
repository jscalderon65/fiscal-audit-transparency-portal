import React from "react";
import { motion } from "framer-motion";
import { PALETTE } from "../constants/theme";

export interface CardProps {
  children?: React.ReactNode;
  hover?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, hover = false, className = "" }) => {
  const whileHover = hover
    ? { y: -6, scale: 1.02, boxShadow: "0px 20px 25px -5px rgba(0,0,0,0.1)" }
    : {};

  return (
    <motion.div
      initial={{ opacity: 1 }}
      whileHover={whileHover}
      className={`rounded-2xl p-6 shadow-sm relative overflow-hidden ${className}`}
      style={{ backgroundColor: PALETTE.background.surface, border: `1px solid ${PALETTE.neutral[200]}` }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
