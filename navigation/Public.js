import React from 'react';
//import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Screens
import CurrencySelector from '../src/screens/CurrencySelector';
import Import from '../src/screens/Import';
import PaymentRequest from '../src/screens/PaymentRequest';


const StackPublic = createNativeStackNavigator();

export default function Public() {
  return (
    <StackPublic.Navigator
      initialRouteName="CurrencySelector"
      //screenOptions={themeApp[modo].fondoBarra}
    >
      <StackPublic.Screen
        name="CurrencySelector"
        component={CurrencySelector}
        options={{headerShown: false}}
      />
      <StackPublic.Screen
        name="Import"
        component={Import}
        options={{
          title: 'Import',
          headerBackVisible: false,
          headerShown: false,
        }}
      />
        <StackPublic.Screen
        name="PaymentRequest"
        component={PaymentRequest}
        options={{
          title: 'PaymentRequest',
          headerBackVisible: false,
          headerShown: false,
        }}
      />
     
    </StackPublic.Navigator>
  );
}
