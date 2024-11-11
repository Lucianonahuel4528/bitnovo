import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Public from './navigation/Public';
import {WebSocketProvider} from './src/contexts/WebSocketContext';

export default function Navigation() {
  return (
    <WebSocketProvider>
      <NavigationContainer>
        <Public />
      </NavigationContainer>
    </WebSocketProvider>
  );
}
