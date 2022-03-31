import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
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
        "-msOverflowStyle": "none",
        "scrollbarWidth": "none",
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
        textTransform: "uppercase",
        borderRadius: 0,
        bg: "transparent",
        border: "2px solid #343333",

        h: "3.125rem",
        fontSize: "sm",
        px: "2rem",
        fontWeight: "400",
        color: "#ffffff",
        _focus: {
          boxShadow: "none",
        },
      },
      sizes: {
        xl: {
          // h: "3.125rem",
          // fontSize: "sm",
          // px: "2rem",
          // fontWeight: "400",
          // color: "#ffffff",
        },
      },
      variants: {
        transparent: {
          // boxShadow: "0 0 2px 2px #efdfde",
        },
        //  override existing variants
        solid: (props) => ({
          bg: props.colorMode === "dark" ? "red.300" : "red.500",
        }),
      },
    },
  },
});

export default theme;
