export const colors = {
  primary: {
    black: '#000000',
    white: '#FFFFFF',
    green: '#10b981',
    greenDark: '#059669',
  },
  background: {
    main: '#FFFFFF',
    dark: '#FFFFFF',
    darkest: '#FFFFFF',
    gray: '#F5F5F5',
    card: '#374151',
    cardHover: '#4b5563',
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
    white: '#FFFFFF',
    gray: '#d1d5db',
    grayLight: '#9ca3af',
  },
  border: {
    light: '#E5E5E5',
    medium: '#CCCCCC',
    dark: '#999999',
    gray: '#374151',
    green: '#10b981',
  },
  status: {
    success: '#00C853',
    error: '#FF5252',
    warning: '#FFC107',
    info: '#2196F3',
  },
  gradient: {
    one: '#8d66d5ff',
    two: '#9daed6ff',
    greenFrom: '#10b981',
    greenTo: '#059669',
  },
  ai: {
    cardBg: '#1d1d1dff',
    cardBgDark: '#111827',
    cardBorder: '#c578ebff',
    iconBg: '#5a5a5aff',
    badgeBg: 'rgba(212, 132, 209, 0.78)',
    badgeText: '#ffffffff',
    checkCircleBg: 'rgba(225, 22, 22, 0.2)',
    checkIcon: '#0554dbff',
  }
} as const;

export type Colors = typeof colors;
