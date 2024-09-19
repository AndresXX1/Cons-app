import { StackHeaderLeftGoBack } from '@/components/StackHeaderLeftGoBack';
import { StackHeaderLeftGoBackBenefits } from '@/components/StackHeaderLeftGoBackBenefits';
import TabBar from '@/components/TabBar';
import { colors } from '@/theme';
import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
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

const disableNavbarPages = [
  'apply_for_loan',
  'branch_offices',
  'points_questions',
  'borrow_money',
  'more_options',
  'settlement',
  'regularize_credits',
  'pending_payments',
  'advisor',
  'help',
  'notifications',
  'news',
  'news_detail',
  'my_data',
  'security',
];

const DashboardLayout = () => {
  return (
    <Tabs
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
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="benefits"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="loan"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'help',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'notifications',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Tabs.Screen
        name="apply_for_loan"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'apply_for_loan',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Tabs.Screen
        name="borrow_money"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="more_options"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="branch_offices"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'branch_offices',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Tabs.Screen
        name="single_cupon"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'single_cupon',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <StackHeaderLeftGoBackBenefits title={'Volver atrás'} color={colors.blue} />
          ),
        }}
      />
      <Tabs.Screen
        name="settlement"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'settlement',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.white} />,
        }}
      />
      <Tabs.Screen
        name="pending_payments"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'pending_payments',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.white} />,
        }}
      />
      <Tabs.Screen
        name="advisor"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="regularize_credits"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'regularize_credits',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.white} />,
        }}
      />
      <Tabs.Screen
        name="my_data"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'my_data',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Tabs.Screen
        name="security"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'security',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Tabs.Screen
        name="points_questions"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'points_questions',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'news',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
      <Tabs.Screen
        name="news_detail"
        options={{
          headerTransparent: true,
          headerStyle: { backgroundColor: colors.transparent },
          title: 'news_detail',
          headerTitle: () => null,
          headerTitleAlign: 'center',
          headerLeft: () => <StackHeaderLeftGoBack title={'Volver atrás'} color={colors.blue} />,
        }}
      />
    </Tabs>
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

export default DashboardLayout;
