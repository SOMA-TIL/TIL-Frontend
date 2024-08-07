import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");
  
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
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-size: 16px;
  }

  button {
    border: none;
  }
`;

export default GlobalStyle;
