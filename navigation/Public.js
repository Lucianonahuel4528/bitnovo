import React from 'react';
//import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Screens
import CreatePayment from '../src/screens/CreatePayment';
import PaymentRequest from '../src/screens/PaymentRequest';


const StackPublic = createNativeStackNavigator();

export default function Public() {
  return (
    <StackPublic.Navigator
      initialRouteName="CreatePayment"
      //screenOptions={themeApp[modo].fondoBarra}
    >
      <StackPublic.Screen
        name="CreatePayment"
        component={CreatePayment}
        options={{
          title: 'CreatePayment',
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
