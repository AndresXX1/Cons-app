import * as Font from 'expo-font';

export const fonts = {
  gotham: {
    regular: 'Gotham Light',
    semiBold: 'Gotham Medium',
    bold: 'Gotham Bold',
    thin: 'Gotham Thin',
  },
};

export const loadFonts = async () => {
  try {
    console.log('Cargando fuentes...');
    await Font.loadAsync({
      'Gotham Light': require('@assets/fonts/GothamLight.ttf'),
      'Gotham Medium': require('@assets/fonts/GothamMedium.ttf'),
      'Gotham Bold': require('@assets/fonts/GothamBold.ttf'),
      'Gotham Thin': require('@assets/fonts/GothamThin.ttf'),
    });
    console.log('Fuentes cargadas correctamente');
  } catch (error) {
    console.error('Error al cargar las fuentes:', error);
  }
};
