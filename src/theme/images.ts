import { Asset } from 'expo-asset';
import { ImageSourcePropType } from 'react-native';

export const images: { [key: string]: ImageSourcePropType } = {
  logo: require('@assets/images/logo.png'),
  background: require('@assets/images/background.png'),
  arrow_back: require('@assets/images/arrow_back_ios.png'),
  hand: require('@assets/images/hand.png'),
  star: require('@assets/images/star.png'),
  emoji_stars: require('@assets/images/emoji_stars.png'),
  money: require('@assets/images/money.png'),
  bags: require('@assets/images/bags.png'),
  help: require('@assets/images/help.png'),
};

type VirtualAssetModuleType = number | string;

// preload images
const imageAssets = Object.keys(images).map(key => {
  return Asset.fromModule(images[key] as VirtualAssetModuleType).downloadAsync();
});

export const loadImages = () => Promise.all(imageAssets);
