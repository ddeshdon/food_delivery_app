import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './src/contexts/CartContext';
import { LocationProvider } from './src/contexts/LocationContext';
import { OrderProvider } from './src/contexts/OrderContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <LocationProvider>
      <OrderProvider>
        <CartProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </CartProvider>
      </OrderProvider>
    </LocationProvider>
  );
}