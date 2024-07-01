import { Asset } from 'expo-asset';
import { ImageSourcePropType } from 'react-native';

export const images: { [key: string]: ImageSourcePropType } = {
  logo: require('@assets/images/logo.png'),
  logo_blue: require('@assets/images/logo_blue.png'),
  background: require('@assets/images/background.png'),
  arrow_back: require('@assets/images/arrow_back_ios.png'),
  arrow_blue: require('@assets/images/arrow_blue_ios.png'),
  hand: require('@assets/images/hand.png'),
  star: require('@assets/images/star.png'),
  emoji_stars: require('@assets/images/emoji_stars.png'),
  money: require('@assets/images/money.png'),
  bags: require('@assets/images/bags.png'),
  help: require('@assets/images/help.png'),
  profile_default: require('@assets/images/profile_default.png'),
  banner: require('@assets/images/banner.png'),
  banner_two: require('@assets/images/banner-2.png'),
  google_button: require('@assets/images/google_button.png'),
  icon_gold: require('@assets/images/gold.png'),
  arrow_back_white: require('@assets/images/arrow_back_ios_white.png'),
  arrow_back_blue: require('@assets/images/arrow_back_ios_blue.png'),
  profile_white: require('@assets/images/profile_white.png'),
  security_white: require('@assets/images/security_white.png'),
  doubt_white: require('@assets/images/doubt_white.png'),
  logout_blue: require('@assets/images/logout_blue.png'),
  logo_featured: require('@assets/images/logo_featured.png'),
  logo_phone: require('@assets/images/logo_phone.png'),
  logo_electro: require('@assets/images/logo_electro.png'),
  filter: require('@assets/images/filter.png'),
  samsumg: require('@assets/images/image_frame.png'),
  money_white: require('@assets/images/money_white.png'),
  platinum: require('@assets/images/platino.png'),
  location_liniers: require('@assets/images/location_1.png'),
  location_avellaneda: require('@assets/images/location_2.png'),
  pay_1: require('@assets/images/pay_1.png'),
  pay_2: require('@assets/images/pay_2.png'),
  pay_3: require('@assets/images/pay_3.png'),
  pay_4: require('@assets/images/pay_4.png'),
  contact_1: require('@assets/images/contact_1.png'),
  contact_2: require('@assets/images/contact_2.png'),
  contact_3: require('@assets/images/contact_3.png'),
};

type VirtualAssetModuleType = number | string;

// preload images
const imageAssets = Object.keys(images).map(key => {
  return Asset.fromModule(images[key] as VirtualAssetModuleType).downloadAsync();
});

export const loadImages = () => Promise.all(imageAssets);
