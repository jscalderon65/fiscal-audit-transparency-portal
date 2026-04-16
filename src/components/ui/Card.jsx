import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', delay = 0, hoverEffect = false, ...props }) => {
  const baseClasses = "bg-white rounded-2xl p-6 shadow-sm border border-slate-200 transition-all relative overflow-hidden group";
  const hoverClasses = hoverEffect ? "hover:border-emerald-300 hover:shadow-md" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
