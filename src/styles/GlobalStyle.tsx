import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const resetStyle = css`
  ${emotionReset}

  html {
    font-family: Pretendard Variable, -apple-system, BlinkMacSystemFont,
      system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
    font-size: 62.5%;
  }

  *,
  *::before,
  *::after {
    font-family: Pretendard Variable, -apple-system, BlinkMacSystemFont,
      system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
    box-sizing: border-box;
  }

  li {
    list-style: none;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input,
  textarea {
    border: none;

    &:focus {
      outline: none;
    }
  }
`;

function GlobalStyle() {
  return <Global styles={resetStyle} />;
}

export default GlobalStyle;
