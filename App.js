import React from 'react';
import Navigation from './Navigation';
import {View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <View style={{flex: 1}}>
      <Navigation />
    </View>
    </GestureHandlerRootView>

  );
}
