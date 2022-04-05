import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  fonts: {
    heading: `Evogria Italic, sans-serif`,
    body: `Oswald, sans-serif`,
  },
  colors: {
    brand: {
      blue: "#7AE7FF",
      grayLight: "#888888",
      grayDark: "#222222",
    },
  },
  sizes: {
    container: {
      "3xl": "1920px",
    },
  },
  styles: {
    global: {
      // "*": { border: "1px yellow dotted" },
      html: {
        minHeight: "100vh",
      },
      button: { fontFamily: `Evogria, sans-serif` },
      body: {
        height: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: "#000",
        color: "#FFF",
        fontWeight: 400,
        fontSize: "16px",
        "-msOverflowStyle": "none",
        scrollbarWidth: "none",
      },
      "body::-webkit-scrollbar": {
        display: "none",
      },
      "#root": {
        height: "100%",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
        bg: "#222222",
        height: "3.125rem",
        px: "2rem",
        // mx: "0.25rem",
        textTransform: "uppercase",
        fontSize: "sm",
        fontWeight: "normal",
        color: "#ffffff",
        _focus: {
          boxShadow: "none",
        },
      },
      sizes: {
        // xl: {
        // h: "3.125rem",
        // fontSize: "sm",
        // px: "2rem",
        // fontWeight: "400",
        // color: "#ffffff",
        // },
      },
      variants: {
        outline: (props) => ({
          border: "2px solid #222222",
          bg: "transparent",
        }),
        icon: (props) => ({
          padding: 0,
          _hover: {
            bg: "brand.blue",
            color: "black",
          },
        }),
        "buy-sell": (props) => ({
          bg: "brand.blue",
          color: "black",
          height: "2.5rem",
        }),
      },
      defaultProps: {
        size: "5xl",
        variant: "",
      },
    },
    Input: {
      baseStyle: {
        field: {
          px: "2rem",
          h: "3.125rem",
          bg: "#222222",
          borderRadius: "0px",
          mx: "0.25rem",
          _placeholder: {
            fontSize: "lg",
            color: "brand.darkLight",
          },
        },
      },
      sizes: {
        brand: {
          fontSize: "lg",
        },
      },
      variants: {
        // filled: (props) => ({
        //   bg: "#222222",
        //   borderRadius: "0px",
        // }),
      },
      defaultProps: {
        size: "brand",
        variant: null,
      },
    },
  },
});

export default theme;
