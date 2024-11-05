import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CurrencySelect from './src/screens/CurrencySelector.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CurrencySelect" component={CurrencySelect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
