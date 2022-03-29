import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: "Evogria";
        src: url("./fonts/Evogria.otf");
      }
      @font-face {
        font-family: "Evogria Italic";
        src: url("./fonts/Evogria Italic.otf");
      }
      @font-face {
        font-family: "DS-Digital";
        src: url("./fonts/DS-DIGI.TTF");
      }
      @font-face {
        font-family: "DS-Digital-Bold";
        src: url("./fonts/DS-DIGIB.TTF");
      }
      `}
  />
);

export default Fonts;
