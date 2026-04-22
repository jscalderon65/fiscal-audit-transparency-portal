import React from "react";
import { PALETTE } from "../constants/theme";

export interface InputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  error?: string | null;
  leftIcon?: React.ComponentType<any> | null;
  rightIcon?: React.ComponentType<any> | null;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  error = null,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  type = "text",
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium mb-1" style={{ color: PALETTE.neutral[700], display: 'block' }}>{label}</label>
      )}
      <div className="flex items-center gap-2">
        {LeftIcon && <LeftIcon className="w-4 h-4" />}
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none"
          style={{ backgroundColor: PALETTE.neutral[50], border: `1px solid ${PALETTE.neutral[200]}`, color: PALETTE.text.default }}
        />
        {RightIcon && <RightIcon className="w-4 h-4" />}
      </div>
      {error && <p className="mt-2 text-sm" style={{ color: PALETTE.danger.DEFAULT }}>{error}</p>}
    </div>
  );
};

export default Input;
