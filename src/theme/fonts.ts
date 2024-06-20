import * as Font from "expo-font";

import GothamRegular from "@assets/fonts/gotham/Gotham-Light.otf";
import GothamSemiBold from "@assets/fonts/gotham/Gotham-Medium.otf";
import GothamBold from "@assets/fonts/gotham-screensmart/GothamSSm-Bold.otf";
import GothamThin from "@assets/fonts/gotham/Gotham-Thin.otf";

export const fonts = {
  gotham: {
    regular: "Gotham Regular",
    semiBold: "Gotham SemiBold",
    bold: "Gotham Bold",
    thin: "Gotham Thin",
  },
};

// preload fonts
export const loadFonts = () =>
  Font.loadAsync({
    "Gotham Regular": {
      uri: GothamRegular,
      display: Font.FontDisplay.SWAP,
    },
    "Gotham SemiBold": {
      uri: GothamSemiBold,
      display: Font.FontDisplay.SWAP,
    },
    "Gotham Bold": {
      uri: GothamBold,
      display: Font.FontDisplay.SWAP,
    },
    "Gotham Thin": {
      uri: GothamThin,
      display: Font.FontDisplay.SWAP,
    },
  });
