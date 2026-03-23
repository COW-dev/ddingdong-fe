export const colors = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#3b82f6',
    400: '#2563eb',
  },
  gray: {
    50: '#F9FAFB',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#9ca3af',
    400: '#6b7280',
    500: '#4b5563',
    600: '#1f2937',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#F87171',
    300: '#EF4444',
  },
  green: {
    50: '#dcfce7',
    100: '#BBF7D0',
    200: '#22c55e',
    300: '#16A34A',
  },
  orange: '#f97316',
  yellow: '#eab308',
  purple: '#a855f7',
  white: '#ffffff',
  black: '#000000',
};

export const COLORS = {
  primary: colors['primary'][300],
  gray: colors['gray'][300],
  red: colors['red'][300],
  green: colors['green'][300],
  black: colors['black'],
  white: colors['white'],
};

export type Colors = keyof typeof colors;
export type IconColor = keyof typeof COLORS;
export type SwitchColor = keyof typeof COLORS;
export const colorNames = Object.keys(colors) as Colors[];
