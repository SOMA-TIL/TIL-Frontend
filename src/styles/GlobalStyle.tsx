import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
    
  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    min-width: 1400px;
  }
`;

export default GlobalStyle;
