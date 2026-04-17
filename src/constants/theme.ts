export type TVariant =
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral"
  | "primary"
  | "purple";

export interface IThemeVariant {
  text: string;
  icon: string;
  bg: string;
  border: string;
  accent: string;
}

export const THEME_VARIANTS: Record<TVariant, IThemeVariant> = {
  success: {
    text: "text-emerald-800",
    icon: "text-emerald-500",
    bg: "bg-emerald-100",
    border: "border-emerald-300",
    accent: "16, 185, 129",
  },
  danger: {
    text: "text-rose-800",
    icon: "text-rose-500",
    bg: "bg-rose-100",
    border: "border-rose-300",
    accent: "244, 63, 94",
  },
  warning: {
    text: "text-amber-800",
    icon: "text-amber-500",
    bg: "bg-amber-100",
    border: "border-amber-300",
    accent: "245, 158, 11",
  },
  info: {
    text: "text-sky-800",
    icon: "text-sky-500",
    bg: "bg-sky-100",
    border: "border-sky-300",
    accent: "14, 165, 233",
  },
  neutral: {
    text: "text-slate-800",
    icon: "text-slate-400",
    bg: "bg-slate-50",
    border: "border-slate-200",
    accent: "148, 163, 184",
  },
  primary: {
    text: "text-indigo-800",
    icon: "text-indigo-500",
    bg: "bg-indigo-100",
    border: "border-indigo-300",
    accent: "99, 102, 241",
  },
  purple: {
    text: "text-purple-800",
    icon: "text-purple-500",
    bg: "bg-purple-100",
    border: "border-purple-300",
    accent: "124, 58, 237",
  },
};
