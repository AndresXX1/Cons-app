import { images } from '@theme';
import { View, Pressable, StyleSheet, Image } from 'react-native';

const TabBar = ({ state, descriptors, navigation }: any) => {
  const actualRoute = state.routes[state.index];
  if (actualRoute.name === 'Chat') {
    return null;
  }
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        let title = '';

        if (label === 'Home') {
          title = 'Home';
        } else if (label === 'Benefits') {
          title = 'Benefits';
        } else if (label === 'Loan') {
          title = 'Loan';
        } else if (label === 'Shop') {
          title = 'Shop';
        } else if (label === 'Profile') {
          title = 'Profile';
        }

        if (title === '') return null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View key={index}>
            <Pressable onPress={onPress}>
              <View>
                {label === 'Home' && isFocused && (
                  <Image source={images.home_icon_blue} style={styles.icon} />
                )}
                {label === 'Home' && !isFocused && (
                  <Image source={images.home_icon_grey} style={styles.icon} />
                )}
                {label === 'Benefits' && isFocused && (
                  <Image source={images.benefits_icon_blue} style={styles.icon} />
                )}
                {label === 'Benefits' && !isFocused && (
                  <Image source={images.benefits_icon_grey} style={styles.icon} />
                )}
                {label === 'Loan' && (
                  <View style={styles.btnLoan}>
                    <Image source={images.logo_icon_white} style={styles.iconLogo} />
                  </View>
                )}
                {label === 'Shop' && isFocused && (
                  <Image source={images.shop_icon_red} style={styles.icon} />
                )}
                {label === 'Shop' && !isFocused && (
                  <Image source={images.shop_icon_grey} style={styles.icon} />
                )}
                {label === 'Profile' && isFocused && (
                  <Image source={images.profile_icon_blue} style={styles.icon} />
                )}
                {label === 'Profile' && !isFocused && (
                  <Image source={images.profile_icon_grey} style={styles.icon} />
                )}
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: 51,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
  },
  btnLoan: {
    backgroundColor: '#00A5E7',
    borderColor: '#4DCCFF',
    marginTop: -32,
    marginHorizontal: -20,
    marginBottom: 19,
    width: 64,
    height: 64,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 3,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconLogo: {
    width: 51,
    height: 33,
  },
});

export default TabBar;
