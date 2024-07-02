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
import ApplyForLoanScreen from '@pages/HomeScreen/ApplyForLoanScreen';
import BranchOfficesScreen from '@pages/HomeScreen/BranchOfficesScreen';

const Tab = createBottomTabNavigator();

interface isMatchingRouteProps {
  routes: any;
  index: number;
}

const isMatchingRoute = ({ routes, index }: isMatchingRouteProps) => {
  if (index >= 0 && index < routes.length) {
    const routeName = routes[index].name;
    return disableNavbarPages.includes(routeName);
  }
  return false;
};

const disableNavbarPages = ['ApplyForLoanScreen','BranchOfficesScreen'];

const DashboardNavigator = () => {
  return (
    <ViewContainer style={styles.container}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="#00A5E7" />
        <Tab.Navigator
          initialRouteName="ApplyForLoanScreen"
          tabBar={props => {
            const routes = props.state.routes || [];
            const index = props.state.index || 0;
            if (isMatchingRoute({ routes, index })) {
              return null;
            }
            return (
              <View style={styles.navBar}>
                <TabBar {...props} />
              </View>
            );
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="ApplyForLoanScreen"
            component={ApplyForLoanScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="BranchOfficesScreen"
            component={BranchOfficesScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Benefits"
            component={BenefitsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Loan"
            component={LoanScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Shop"
            component={ShopScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerShown: false,
            }}
          />
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
