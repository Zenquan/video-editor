import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'iconfont';  /* Project id 2603519 */
    src: url('//at.alicdn.com/t/font_2603519_zhmkp68zspa.woff2?t=1623397779745') format('woff2'),
        url('//at.alicdn.com/t/font_2603519_zhmkp68zspa.woff?t=1623397779745') format('woff'),
        url('//at.alicdn.com/t/font_2603519_zhmkp68zspa.ttf?t=1623397779745') format('truetype');
  }
  .iconfont {
    font-family: "iconfont" !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
`;

export {
  GlobalStyle
};