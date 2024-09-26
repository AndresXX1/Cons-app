import * as Font from 'expo-font';

export const fonts = {
  gotham: {
    regular: 'Gotham Book',
    semiBold: 'Gotham Medium',
    bold: 'Gotham Bold',
    thin: 'Gotham Thin',
  },
};

// preload fonts
export const loadFonts = async () => {
  try {
    console.log('Cargando fuentes...');
    await Font.loadAsync({
      'Gotham Book': require('@/assets/fonts/GothamBook.otf'),
      'Gotham Medium': require('@/assets/fonts/GothamMedium.ttf'),
      'Gotham Bold': require('@/assets/fonts/GothamBold.ttf'),
      'Gotham Thin': require('@/assets/fonts/GothamThin.ttf'),
    });
    console.log('Fuentes cargadas correctamente');
  } catch (error) {
    console.error('Error al cargar las fuentes:', error);
  }
};
