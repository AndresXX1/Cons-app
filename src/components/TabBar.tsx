import { View, Pressable, StyleSheet } from 'react-native';
import { HomeSVG, BenefitsSVG, ShopSVG, ProfileSVG, LoanSVG } from '../utils/icons';

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
                {label === 'Home' && (
                  <HomeSVG size={24} color={isFocused ? '#006E9A' : '#C4C4C4'} />
                )}
                {label === 'Benefits' && (
                  <BenefitsSVG size={24} color={isFocused ? '#006E9A' : '#C4C4C4'} />
                )}
                {label === 'Loan' && (
                  <View style={styles.btnLoan}>
                    <LoanSVG color="#ffffff" />
                  </View>
                )}
                {label === 'Shop' && (
                  <ShopSVG size={24} color={isFocused ? '#EF4623' : '#C4C4C4'} />
                )}
                {label === 'Profile' && (
                  <ProfileSVG size={24} color={isFocused ? '#006E9A' : '#C4C4C4'} />
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
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
});

export default TabBar;
