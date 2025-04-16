// pages/_app.js
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

// Import GlobalStyles only if it exists
let GlobalStyles = () => null;
try {
  GlobalStyles = require('../components/GlobalStyles').default;
} catch (e) {
  console.warn('GlobalStyles not found, using fallback');
}

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;


