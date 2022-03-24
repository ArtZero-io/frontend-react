import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  sizes: {
    container: {
      "2xl": "1440px",
    },
  },
  styles: {
    global: {
      html: {
        minHeight: "100vh",
      },
      body: {
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, sans-serif`,
        height: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: "#000322",
        color: "#b6b6b6",
      },
      "#root": {
        height: "100%",
      },
    },
  },
});

export default theme;
