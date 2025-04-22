import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Add any global styles here */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  }
  
  * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles;
