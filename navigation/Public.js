import React from 'react';
//import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Screens
import CurrencySelector from '../src/screens/CurrencySelector';
import Import from '../src/screens/Import';


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
      {/* <StackPublic.Screen
        name="Registro"
        component={Registration}
        options={{
          title: 'Registro',
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <StackPublic.Screen
        name="Matchs"
        component={Matchs}
        options={{
          title: 'Mis Matchs',
          headerBackVisible: false,
          headerShown: false,
        }}
      />
      <StackPublic.Screen
        name="Habilidades"
        component={AbilitiesScreen}
        options={{
          headerLeft: () => (
            <Image
              style={{width: 55, height: 55, margin: 2}}
              source={require('../../src/images/CuatroDeCuatro.png')}
            />
          ),
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <StackPublic.Screen
        name="Offers"
        component={OffersScreen}
        // options={{headerShown: false}}
      />
      <StackPublic.Screen
        name="Offer"
        component={OfferScreen}
        options={{headerShown: false}}
      />
      <StackPublic.Screen
        name="Chat"
        component={ChatScreen}
        options={{headerShown: false}}

      /> */}
    </StackPublic.Navigator>
  );
}
