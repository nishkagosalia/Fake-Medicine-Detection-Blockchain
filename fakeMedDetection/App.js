import React,{ Component, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import login from './screens/Login.js'
import consumer from './screens/ConsumerHome.js'
import manufacturer from './screens/ManufacturerHome.js'
import retailer from './screens/RetailerHome.js'
import Signup from './screens/Signup.js';


const App = () => {
  const Stack=createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "login" screenOptions={{headerMode:'False'}}>
        <Stack.Screen name="login" component={login}/>
        <Stack.Screen name="Signup" component = {Signup}/>
        <Stack.Screen name="consumer" component={consumer}/>
        <Stack.Screen name="manufacturer" component={manufacturer}/>
        <Stack.Screen name="retailer" component={retailer}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;