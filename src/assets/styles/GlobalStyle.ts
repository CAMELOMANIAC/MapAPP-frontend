import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 기본 스타일 초기화 */
  * {
    box-sizing: border-box;
    max-width: 430px;
    padding: 0;
    margin: 0 auto;
  }

  /* 모든 요소에 box-sizing: border-box 적용 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 스크롤바 숨기기 */
  html,
  body {
    overflow-x: hidden;
  }

  body {
    height: 100vh;

    /* ios에서 상단 안전영역 여유값 */
    padding-top: env(safe-area-inset-top, 20px);
    padding-bottom: env(safe-area-inset-bottom, 20px);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans",
      "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    position: relative;
    width: 100%;
    height: 100%;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }

  /* a 태그 기본 스타일 제거 */
  a {
    padding: 0;
    margin: 0;
    color: inherit;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  a:focus {
    outline: none;
  }

  /* button 태그 기본 스타일 제거 */
  button {
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
    background: none;
    border: none;
    -webkit-tap-highlight-color: transparent;
  }

  button:focus {
    outline: none;
  }

  :root{
    --thema-color:rgb(210 67 67);
  }
`;

export default GlobalStyle;
