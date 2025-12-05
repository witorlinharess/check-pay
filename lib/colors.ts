export const colors = {
  primary: {
    black: '#000000',
    white: '#FFFFFF',
  },
  background: {
    main: '#FFFFFF',
    dark: '#000000',
    gray: '#F5F5F5',
  },
  text: {
    primary: '#000000',
    secondary: '#666666',
    light: '#999999',
  },
  border: {
    light: '#E5E5E5',
    medium: '#CCCCCC',
    dark: '#999999',
  },
  status: {
    success: '#00C853',
    error: '#FF5252',
    warning: '#FFC107',
    info: '#2196F3',
  },
  gradient: {
    one: '#6CAD7C',
    two: '#a3d69dff',
  }

} as const;

export type Colors = typeof colors;
