import React from "react";

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
        <label className="block text-sm font-medium mb-1 text-slate-700">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl outline-none bg-slate-50 border border-slate-200 text-slate-900 focus:border-primary transition-colors"
        />
        {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
      </div>
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </div>
  );
};

export default Input;
