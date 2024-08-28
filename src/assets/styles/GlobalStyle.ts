import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* 기본 스타일 초기화 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 430px;
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
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
      "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* ios에서 상단 안전영역 여유값 */
    padding-top: env(safe-area-inset-top, 20px);
    padding-bottom: env(safe-area-inset-bottom, 20px);
    height: 100vh;
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
    text-decoration: none;
    color: inherit;
    padding: 0;
    margin: 0;
  }

  /* button 태그 기본 스타일 제거 */
  button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
`;

export default GlobalStyle;
