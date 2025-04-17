// components/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: ${props => props.theme.colors.bridgetunesDark};
    background-color: ${props => props.theme.colors.bridgetunesLight};
    margin: 0;
    padding: 0;
  }
  
  * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  /* Animation for page transitions */
  .page-transition-enter {
    opacity: 0;
    transform: translateY(10px);
  }
  
  .page-transition-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s, transform 0.3s;
  }
  
  /* Add subtle hover effects to all interactive elements */
  a, button, input[type="submit"], input[type="button"] {
    transition: all 0.2s ease;
  }
  
  /* Improve form element styling */
  input, select, textarea {
    border: 1px solid ${props => props.theme.colors.gray300};
    border-radius: ${props => props.theme.radii.md};
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.bridgetunesBlue};
      box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
    }
  }
  
  /* Improve list styling */
  ul, ol {
    padding-left: 1.5rem;
  }
  
  /* Add container styles */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Add section spacing */
  section {
    margin: 2rem 0;
  }
`;

export default GlobalStyles;
