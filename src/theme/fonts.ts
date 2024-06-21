import * as Font from 'expo-font';

export const fonts = {
  gotham: {
    regular: 'Gotham Regular',
    semiBold: 'Gotham SemiBold',
    bold: 'Gotham Bold',
    thin: 'Gotham Thin',
  },
};

// preload fonts
export const loadFonts = async () => {
  Font.loadAsync({
    'Gotham Regular': require('@assets/fonts/GothamLight.ttf'),
    'Gotham SemiBold': require('@assets/fonts/GothamMedium.ttf'),
    'Gotham Bold': require('@assets/fonts/GothamBold.ttf'),
    'Gotham Thin': require('@assets/fonts/GothamThin.ttf'),
  });
};
