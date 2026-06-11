import React, { useState } from "react";
import { Icon as LucideIcon } from "lucide-react";
import { PALETTE } from "../constants/theme";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  loading?: boolean;
  leftIcon?: React.ComponentType<any> | null;
  rightIcon?: React.ComponentType<any> | null;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  disabled = false,
  onClick,
  className = "",
}) => {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all";

  const [hovered, setHovered] = useState(false);

  const styles: React.CSSProperties = (() => {
    switch (variant) {
      case "secondary":
        return { backgroundColor: PALETTE.secondary.DEFAULT, color: PALETTE.text.inverted };
      case "outline":
        return { backgroundColor: "transparent", border: `1px solid ${PALETTE.primary.DEFAULT}`, color: PALETTE.primary.DEFAULT };
      case "ghost":
        return { backgroundColor: "transparent", color: PALETTE.text.default };
      case "primary":
      default:
        return { backgroundColor: PALETTE.primary.DEFAULT, color: PALETTE.text.inverted };
    }
  })();

  const hoverStyles: Record<string, React.CSSProperties> = {
    primary: { backgroundColor: PALETTE.primary.dark },
    secondary: { backgroundColor: PALETTE.secondary.dark },
    outline: { backgroundColor: PALETTE.primary.DEFAULT, color: PALETTE.text.inverted, border: `1px solid ${PALETTE.primary.DEFAULT}` },
    ghost: { backgroundColor: PALETTE.neutral[100] },
  };

  const spinner = (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={PALETTE.text.inverted} strokeWidth="3" strokeOpacity="0.25" />
      <path d="M22 12a10 10 0 00-10-10" stroke={PALETTE.text.inverted} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} py-2 px-4 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles,
        ...(hovered && !disabled ? hoverStyles[variant] || {} : {}),
        borderRadius: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.65 : 1,
      }}
    >
      {loading ? (
        <span className="flex items-center gap-2">{spinner}{children && <span>{children}</span>}</span>
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4" style={{ color: styles.color }} />}
          <span>{children}</span>
          {RightIcon && <RightIcon className="w-4 h-4" style={{ color: styles.color }} />}
        </>
      )}
    </button>
  );
};

export default Button;
