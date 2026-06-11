export const WHITE = '#ffffff';
export const BLACK = '#000000';

export const SLATE_50 = '#f8fafc';
export const SLATE_100 = '#f1f5f9';
export const SLATE_200 = '#e2e8f0';
export const SLATE_300 = '#cbd5e1';
export const SLATE_400 = '#94a3b8';
export const SLATE_500 = '#64748b';
export const SLATE_600 = '#475569';
export const SLATE_700 = '#334155';
export const SLATE_800 = '#1e293b';
export const SLATE_900 = '#0f172a';
export const SLATE_950 = '#020617';

export const GRAY_50 = '#f9fafb';
export const GRAY_100 = '#f3f4f6';
export const GRAY_200 = '#e5e7eb';
export const GRAY_300 = '#d1d5db';
export const GRAY_400 = '#9ca3af';
export const GRAY_500 = '#6b7280';
export const GRAY_600 = '#4b5563';
export const GRAY_700 = '#374151';
export const GRAY_800 = '#1f2937';
export const GRAY_900 = '#111827';

export const BLUE_50 = '#eff6ff';
export const BLUE_100 = '#dbeafe';
export const BLUE_200 = '#bfdbfe';
export const BLUE_300 = '#93c5fd';
export const BLUE_400 = '#60a5fa';
export const BLUE_500 = '#3b82f6';
export const BLUE_600 = '#2563eb';
export const BLUE_700 = '#1d4ed8';
export const BLUE_800 = '#1e40af';
export const BLUE_900 = '#1e3a8a';

export const INDIGO_50 = '#eef2ff';
export const INDIGO_100 = '#e0e7ff';
export const INDIGO_200 = '#c7d2fe';
export const INDIGO_300 = '#a5b4fc';
export const INDIGO_400 = '#818cf8';
export const INDIGO_500 = '#6366f1';
export const INDIGO_600 = '#4f46e5';
export const INDIGO_700 = '#4338ca';
export const INDIGO_800 = '#3730a3';
export const INDIGO_900 = '#312e81';

export const EMERALD_50 = '#ecfdf5';
export const EMERALD_100 = '#d1fae5';
export const EMERALD_200 = '#a7f3d0';
export const EMERALD_300 = '#6ee7b7';
export const EMERALD_400 = '#34d399';
export const EMERALD_500 = '#10b981';
export const EMERALD_600 = '#059669';
export const EMERALD_700 = '#047857';
export const EMERALD_800 = '#065f46';
export const EMERALD_900 = '#064e3b';

export const ROSE_50 = '#fff1f2';
export const ROSE_100 = '#ffe4e6';
export const ROSE_200 = '#fecdd3';
export const ROSE_300 = '#fda4af';
export const ROSE_400 = '#fb7185';
export const ROSE_500 = '#f43f5e';
export const ROSE_600 = '#e11d48';
export const ROSE_700 = '#be123c';
export const ROSE_800 = '#9f1239';
export const ROSE_900 = '#881337';

export const RED_50 = '#fef2f2';
export const RED_100 = '#fee2e2';
export const RED_200 = '#fecaca';
export const RED_300 = '#fca5a5';
export const RED_400 = '#f87171';
export const RED_500 = '#ef4444';
export const RED_600 = '#dc2626';
export const RED_700 = '#b91c1c';
export const RED_800 = '#991b1b';
export const RED_900 = '#7f1d1d';

export const NAVY_BLUE = '#1e3a8a';
export const EMERALD_GREEN = '#10b981';

export const LITERAL_WHITE_BG = '#ffffff';
export const INDEX_CSS_BG = '#f8fafc';

export const PALETTE = {
  primary: {
    light: EMERALD_300,
    DEFAULT: EMERALD_500,
    dark: EMERALD_700,
    gradientStart: EMERALD_400,
    gradientEnd: EMERALD_600,
    shade50: EMERALD_50,
    shade200: EMERALD_200,
    shade700: EMERALD_700,
    alpha50: EMERALD_50 + '80',
    alpha60_from_200: EMERALD_200 + '99',
    darkAlpha40: EMERALD_900 + '66',
  },
  secondary: {
    DEFAULT: NAVY_BLUE,
    dark: BLUE_800,
  },
  neutral: {
    50: SLATE_50,
    100: SLATE_100,
    200: SLATE_200,
    300: SLATE_300,
    400: SLATE_400,
    500: SLATE_500,
    600: SLATE_600,
    700: SLATE_700,
    800: SLATE_800,
    900: SLATE_900,
    950: SLATE_950,
  },
  success: {
    DEFAULT: EMERALD_500,
    dark: EMERALD_700,
  },
  danger: {
    DEFAULT: RED_600,
    dark: RED_700,
  },
  background: {
    page: SLATE_50,
    surface: WHITE,
  },
  text: {
    default: SLATE_900,
    muted: SLATE_500,
    inverted: WHITE,
    subtle: SLATE_300,
  },
  overlays: {
    neutral800_50: SLATE_800 + '80',
    neutral800_80: SLATE_800 + 'cc',
    neutral700_50: SLATE_700 + '80',
    neutral900_40: SLATE_900 + '66',
    primary900_40: EMERALD_900 + '66',
    primary200_60: EMERALD_200 + '99',
    primary50_50: EMERALD_50 + '80',
    infoGradient: `linear-gradient(135deg, ${EMERALD_400}, ${EMERALD_600})`,
  },
};

export const THEME = {
  WHITE,
  BLACK,
  SLATE_50,
  SLATE_100,
  SLATE_200,
  SLATE_300,
  SLATE_400,
  SLATE_500,
  SLATE_600,
  SLATE_700,
  SLATE_800,
  SLATE_900,
  SLATE_950,
  GRAY_50,
  GRAY_100,
  GRAY_200,
  GRAY_300,
  GRAY_400,
  GRAY_500,
  GRAY_600,
  GRAY_700,
  GRAY_800,
  GRAY_900,
  BLUE_50,
  BLUE_100,
  BLUE_200,
  BLUE_300,
  BLUE_400,
  BLUE_500,
  BLUE_600,
  BLUE_700,
  BLUE_800,
  BLUE_900,
  INDIGO_50,
  INDIGO_100,
  INDIGO_200,
  INDIGO_300,
  INDIGO_400,
  INDIGO_500,
  INDIGO_600,
  INDIGO_700,
  INDIGO_800,
  INDIGO_900,
  EMERALD_50,
  EMERALD_100,
  EMERALD_200,
  EMERALD_300,
  EMERALD_400,
  EMERALD_500,
  EMERALD_600,
  EMERALD_700,
  EMERALD_800,
  EMERALD_900,
  ROSE_50,
  ROSE_100,
  ROSE_200,
  ROSE_300,
  ROSE_400,
  ROSE_500,
  ROSE_600,
  ROSE_700,
  ROSE_800,
  ROSE_900,
  RED_50,
  RED_100,
  RED_200,
  RED_300,
  RED_400,
  RED_500,
  RED_600,
  RED_700,
  RED_800,
  RED_900,
  NAVY_BLUE,
  EMERALD_GREEN,
  LITERAL_WHITE_BG,
  INDEX_CSS_BG,
  PALETTE,
};

export default THEME;
