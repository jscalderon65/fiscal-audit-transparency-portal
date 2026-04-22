import React from "react";
import { PALETTE } from "../constants/theme";

export interface BadgeProps {
  variant?: "success" | "error" | "pending" | "default";
  children?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant = "default", children }) => {
  const style: React.CSSProperties = (() => {
    switch (variant) {
      case "success":
        return { backgroundColor: PALETTE.success.DEFAULT, color: PALETTE.text.inverted };
      case "error":
        return { backgroundColor: PALETTE.danger.DEFAULT, color: PALETTE.text.inverted };
      case "pending":
        return { backgroundColor: PALETTE.primary.shade50, color: PALETTE.primary.shade700 };
      default:
        return { backgroundColor: PALETTE.neutral[100], color: PALETTE.text.default };
    }
  })();

  return (
    <span style={{ padding: '6px 10px', borderRadius: 9999, fontWeight: 600, fontSize: 12, display: 'inline-block', ...style }}>
      {children}
    </span>
  );
};

export default Badge;
