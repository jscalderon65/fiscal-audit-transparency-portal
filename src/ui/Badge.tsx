import React from "react";

export interface BadgeProps {
  variant?: "success" | "error" | "pending" | "default";
  children?: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  success: "bg-primary text-white",
  error: "bg-danger text-white",
  pending: "bg-primary-50 text-primary-dark",
  default: "bg-slate-100 text-slate-900",
};

const Badge: React.FC<BadgeProps> = ({ variant = "default", children }) => {
  return (
    <span
      className={`px-[10px] py-[6px] rounded-full font-semibold text-xs inline-block ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
};

export default Badge;
