import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  isLoading = false,
  icon: Icon,
  className = '',
  ...props
}) => {
  const baseClasses = "font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed";
  const widthClass = fullWidth ? "w-full" : "";
  
  const variants = {
    primary: "bg-slate-900 hover:bg-slate-800 text-white shadow-lg",
    secondary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-200",
    outline: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300",
    danger: "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${widthClass} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        <>
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </>
      )}
    </button>
  );
};
