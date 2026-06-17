import React from "react";

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

const variantStyles: Record<string, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-white hover:bg-secondary-dark",
  outline:
    "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white",
  ghost: "bg-transparent text-slate-900 hover:bg-slate-100",
};

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
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all py-2 px-4";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variantStyles[variant]} ${className} disabled:opacity-65 disabled:cursor-not-allowed`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeOpacity="0.25"
            />
            <path
              d="M22 12a10 10 0 00-10-10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          {children && <span>{children}</span>}
        </span>
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4" />}
          <span>{children}</span>
          {RightIcon && <RightIcon className="w-4 h-4" />}
        </>
      )}
    </button>
  );
};

export default Button;
