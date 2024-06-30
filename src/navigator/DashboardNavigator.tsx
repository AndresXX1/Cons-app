import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ViewContainer from '../components/ViewContainer';
import { NavigationContainer } from '@react-navigation/native';
import TabBar from '../components/TabBar';
import HomeScreen from '../pages/HomeScreen';
import BenefitsScreen from '../pages/BenefitsScreen';
import LoanScreen from '../pages/LoanScreen';
import ShopScreen from '../pages/ShopScreen';
import ProfileScreen from '../pages/ProfileScreen';
// import Header from '../components/Header';

const Tab = createBottomTabNavigator();

export const optionDefault = {
  // header: ({ route }: { route: any }) => <Header route={route} />,
  headerShown: false,
};

const DashboardNavigator = () => {
  return (
    <ViewContainer style={styles.container}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#00A5E7" />
        <Tab.Navigator
          initialRouteName="Benefits"
          tabBar={props => {
            return (
              <View style={styles.navBar}>
                <TabBar {...props} />
              </View>
            );
          }}>
          <Tab.Screen name="Home" component={HomeScreen} options={optionDefault} />
          <Tab.Screen name="Benefits" component={BenefitsScreen} options={optionDefault} />
          <Tab.Screen name="Loan" component={LoanScreen} options={optionDefault} />
          <Tab.Screen name="Shop" component={ShopScreen} options={optionDefault} />
          <Tab.Screen name="Profile" component={ProfileScreen} options={optionDefault} />
        </Tab.Navigator>
      </NavigationContainer>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  navBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default DashboardNavigator;
