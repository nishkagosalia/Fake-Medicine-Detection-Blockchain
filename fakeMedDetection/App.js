
import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import mongoose from 'mongoose';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from './screens/Signup';
import manufacturer from './screens/ManufacturerHome';
import retailer from './screens/RetailerHome';
import consumer from './screens/ConsumerHome';


const App = () => {
  
   // app
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" screenOptions={{headerMode:'False'}}>
        <Stack.Screen name = "Signup" component = {Signup}/>
        <Stack.Screen name = "consumer" component = {consumer}/>
        <Stack.Screen name = "manufacturer" component = {manufacturer}/>
        <Stack.Screen name = "retailer" component = {retailer}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;