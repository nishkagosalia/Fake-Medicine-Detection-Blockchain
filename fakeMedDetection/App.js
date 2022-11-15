
import React from 'react';
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


const App = () => {
  dbConnect();
  const appId = 'fakemeddetection-rxjtd'; 
 
  return (
    <SafeAreaView>
      <Text>Show the app</Text>
    
    </SafeAreaView>
  );
}

export default App;