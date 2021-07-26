import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
  /* Reset CSS (Necolas Reset CSS <3) */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #8596A8;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
    NEPCBlue: '#002060',
    MiddleBlue: '#16709E',
    SkyBlue: '#6ED0F7',
    GreyText: '#6B6B6B',
    LightGrey:'#C9D4DE',
    KeyLime:'#8CC94A',
    Petal:'#D6F28C',
    Custard:'#F2CC73',
    DarkGrey:'#43505E',
    MiddleGrey:'#8596A8',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
