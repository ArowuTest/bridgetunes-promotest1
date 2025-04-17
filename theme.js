// theme.js
const theme = {
  colors: {
    // MTN Colors
    mtnYellow: '#ffcc00',
    mtnBlack: '#000000',
    mtnGray: '#333333',
    mtnLight: '#f5f5f5',
    
    // Bridgetunes Colors
    bridgetunesBlue: '#0056b3',
    bridgetunesLightBlue: '#007bff',
    bridgetunesDark: '#212529',
    bridgetunesLight: '#f8f9fa',
    bridgetunesGray: '#6c757d',
    
    // UI Colors
    white: '#ffffff',
    black: '#000000',
    gray100: '#f8f9fa',
    gray200: '#e9ecef',
    gray300: '#dee2e6',
    gray400: '#ced4da',
    gray500: '#adb5bd',
    gray600: '#6c757d',
    gray700: '#495057',
    gray800: '#343a40',
    gray900: '#212529',
  },
  
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  radii: {
    sm: '0.125rem',
    md: '0.25rem',
    lg: '0.5rem',
    xl: '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease',
  },
  
  // New modern UI additions
  gradients: {
    primary: 'linear-gradient(135deg, #0056b3 0%, #007bff 100%)',
    secondary: 'linear-gradient(135deg, #ffcc00 0%, #ffd700 100%)',
    dark: 'linear-gradient(135deg, #212529 0%, #343a40 100%)',
  },
  
  animations: {
    short: '0.2s',
    medium: '0.5s',
    long: '1s',
  },
  
  cards: {
    default: {
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
    },
    hover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    },
  },
};

export default theme;


