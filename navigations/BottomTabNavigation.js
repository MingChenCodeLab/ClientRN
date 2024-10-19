import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../Screen/Home/Home';
import Cart from '../Screen/Cart/Cart';
import LikeProducts from '../Screen/Informations/LikeProducts';
import Notification from '../Screen/Notification/Notification';
import Profile from '../Screen/Informations/Profile';
import CartBadge from '../components/Cart/CartBadge';
import NotiBadge from '../components/Notification/NotiBadge';

const Tab = createMaterialBottomTabNavigator();

const TabButton = React.memo(({ children, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.centeredButton}>{children}</View>
  </TouchableWithoutFeedback>
));

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#00C4FF"
      inactiveColor="#000000"
      barStyle={styles.tabBar}
      labeled={true}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="LikeProducts"
        component={LikeProducts}
        options={{
          tabBarLabel: 'Yêu thích',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="shopping" color={color} size={26} />
              <CartBadge />
            </View>
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="bell-outline" color={color} size={26} />
              <NotiBadge />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Tôi',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f7f7f9',
    paddingBottom: 5,
    height: 65,
  },
  iconWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabNavigation;
