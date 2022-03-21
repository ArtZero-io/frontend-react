import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: { xanh: 'red.500' },
  sizes: {
    container: {
      '2xl': '1440px',
    },
  },
  styles: {
    global: {
      html: {
        minHeight: '100vh',
      },
      body: {
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, sans-serif`,
        height: '100%',
        margin: 0,
        padding: 0,
      },
      '#root': {
        height: '100%',
      },
    },
  },
})

export default theme
