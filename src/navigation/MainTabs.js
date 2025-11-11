import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import { useOrder } from '../contexts/OrderContext';
import { useCart } from '../contexts/CartContext';

// Temporary placeholder screens
const ProfileScreen = () => <Text>Profile Screen</Text>;

const Tab = createBottomTabNavigator();

// Create a wrapper component for the cart badge and order indicator
const TabIcon = ({ route, focused, color, size }) => {
  const { hasActiveOrder } = useOrder();
  const { getCartItemCount } = useCart();
  
  let iconName;
  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Search') {
    iconName = focused ? 'search' : 'search-outline';
  } else if (route.name === 'Cart') {
    iconName = focused ? 'cart' : 'cart-outline';
  } else if (route.name === 'Orders') {
    iconName = focused ? 'receipt' : 'receipt-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return (
    <View style={styles.tabIconContainer}>
      <Ionicons name={iconName} size={size} color={color} />
      {/* Cart Badge */}
      {route.name === 'Cart' && getCartItemCount() > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getCartItemCount()}</Text>
        </View>
      )}
      {/* Order Indicator */}
      {route.name === 'Orders' && hasActiveOrder() && (
        <View style={styles.activeOrderDot} />
      )}
    </View>
  );
};

// Create a wrapper for Orders tab component
const OrdersTabComponent = () => {
  const { hasActiveOrder } = useOrder();
  return hasActiveOrder() ? <OrderTrackingScreen /> : <ProfileScreen />;
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon route={route} focused={focused} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#9C27B0',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen 
        name="Orders" 
        component={OrdersTabComponent}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -4,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeOrderDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
});

export default MainTabs;