import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "dark", useSystemColorMode: false },
  fonts: {
    heading: `Evogria Italic, sans-serif`,
    body: `Oswald, sans-serif`,
  },
  fontSizes: {
    "3xl-mid": "2rem",
    "4xl-mid": "2.5rem",
    "5xl-mid": "3.5rem",
  },
  // space: { 88: "22.5rem", 80: "20rem" },
  colors: {
    brand: {
      blue: "#7AE7FF",
      grayLight: "#888888",
      grayDark: "#222222",
      semiBlack: "#171717",
    },
  },
  sizes: {
    "6xl-mid": "78rem",
    container: {
      "3xl": "1920px",
    },
  },
  styles: {
    global: {
      "*": {
        // border: "1px yellow dotted",
      },
      html: {
        minHeight: "100vh",
      },
      body: {
        height: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: "#000",
        color: "#888",
        fontWeight: "normal",
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
      button: {
        fontFamily: `Evogria, sans-serif`,
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "0.9375rem",
        lineHeight: "1.1875rem",
        textAlign: "center",
        textTransform: "uppercase",
        color: "#7AE7FF",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        height: "3.125rem",
        // minWidth: "11.25rem",
        borderRadius: 0,
        px: "2rem",
        fontWeight: "normal",
      },
      sizes: {
        icon: {
          maxWidth: "3.125rem",
          minWidth: "3.125rem",
        },
      },
      variants: {
        outline: (props) => ({
          border: "2px solid #333",
          bg: "transparent",
          color: "#7AE7FF",
          _hover: {
            border: "2px solid #7AE7FF",
            bg: "transparent",
            filter: "drop-shadow(1px 3px 7px #7AE7FF70)",
            transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",

            _disabled: {
              color: "#888",
              border: "2px solid #333",
              filter: "none",
            },
          },
          _focus: {
            border: "2px solid #7AE7FF",
            bg: "transparent",
          },
          _disabled: {
            color: "#888",
            border: "2px solid #333",
          },
        }),
        solid: (props) => ({
          bg: "#7AE7FF",
          color: "#000",
          _hover: {
            bg: "#7AE7FF",
            filter: "drop-shadow(0px 0px 14px #7AE7FF70)",
            transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
            _disabled: {
              bg: "#555",
              filter: "none",
            },
          },
          _disabled: {
            bg: "#555",
            color: "#888",
          },
        }),
        // icon: (props) => ({
        //   padding: 0,
        //   _hover: {
        //     bg: "brand.blue",
        //     color: "black",
        //   },
        // }),
        iconSolid: (props) => ({
          bg: "#222",
          color: "#fff",
          _hover: {
            bg: "#7AE7FF",
            color: "black",
            filter: "drop-shadow(0px 0px 14px #7AE7FF70)",
            transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
            _disabled: {
              bg: "#555",
              color: "#888",
              filter: "none",
            },
          },
          _disabled: {
            bg: "#555",
            color: "#888",
            filter: "none",
          },
        }),
        iconOutline: (props) => ({
          bg: "#000",
          border: "2px solid #333",
          color: "#fff",
          _hover: {
            border: "2px solid #7AE7FF",
            bg: "#000",
            filter: "drop-shadow(1px 3px 7px #7AE7FF70)",
            transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",

            _disabled: {
              color: "#888",
              border: "2px solid #333",
              filter: "none",
            },
          },
          _focus: {
            border: "2px solid #7AE7FF",
            bg: "#000",
          },
          _disabled: {
            color: "#888",
            border: "2px solid #333",
          },
        }),
        // "buy-sell": (props) => ({
        //   bg: "brand.blue",
        //   color: "black",
        //   height: "2.5rem",
        // }),
      },
      defaultProps: {
        size: "5xl",
        variant: "solid",
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
    Heading: {
      baseStyle: { fontFamily: "heading", fontWeight: "normal" },
      sizes: {
        h1: {
          fontSize: ["4xl-mid", null, "5xl-mid"],
          lineHeight: 1.25,
          color: "#fff",
        },
        h2: {
          fontSize: ["4xl", null, "5xl"],
          lineHeight: 1.25,
          color: "#fff",
        },
        h3: {
          fontSize: ["3xl-mid", null, "4xl-mid"],
          lineHeight: 1.25,
          color: "#fff",
        },
        h4: {
          fontSize: ["3xl", null, "3xl-mid"],
          lineHeight: 1.25,
          color: "#fff",
        },
        h5: {
          fontSize: ["xl", null, "2xl"],
          lineHeight: 1.25,
          color: "#fff",
        },
        h6: {
          fontSize: ["md", null, "lg"],
          lineHeight: 1.25,
          color: "#fff",
        },
      },
    },
    Tag: {
      baseStyle: {
        container: {
          backgroundColor: "#000",
        },
        label: { bg: "#000" },
      },
      sizes: {
        xl: {
          container: {
            minH: 10,
            width: "fit-content",
            fontSize: "md",
            borderRadius: 0,
            borderWidth: 0,
            px: 3,
          },
          label: {
            textAlign: "center",
            color: "#fff",
          },
        },
        "2xl": {
          container: {
            minH: "3.125rem",
            width: "fit-content",
            fontSize: "md",
            borderRadius: 0,
            borderWidth: 0,
            px: 3,
          },
          label: {
            textAlign: "center",
          },
        },
      },
      variants: {
        outline: (props) => ({
          container: {
            backgroundColor: "transparent",
            borderColor: "#7AE7FF",
            borderWidth: 0.5,
          },
          label: {
            backgroundColor: "transparent",
            color: "#7AE7FF",
          },
        }),
        grayBg: (props) => ({
          container: {
            backgroundColor: "#222",
          },
          label: {
            backgroundColor: "transparent",
            color: "#fff",
            fontSize: "lg",
          },
        }),
        active: (props) => ({
          container: {
            backgroundColor: "transparent",
            borderColor: "#7AE7FF",
            borderWidth: 0,
          },
          label: {
            backgroundColor: "transparent",
            color: "#7AE7FF",
          },
        }),
        inActive: (props) => ({
          container: {
            backgroundColor: "transparent",
            borderColor: "#7AE7FF",
            borderWidth: 0,
          },
          label: {
            backgroundColor: "transparent",
            color: "#888",
          },
        }),
      },
      defaultProps: {
        size: "xl",
        variant: "unstyled",
      },
    },
  },
});

export default theme;
