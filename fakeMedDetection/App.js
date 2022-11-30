
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
  const appId = 'fakemeddetection-rxjtd'; 

    // const response = fetch('http://192.168.1.10:3000/',{method:"GET"});
    
    const getMovies = async () => {
      try {
       const response = await fetch('http://192.168.1.10:3000/');
       const json = await response.json();
       console.log(json);
     } catch (error) {
       console.error(error);
     } finally {
      
     }
   }

   getMovies();

  return (
    <SafeAreaView>
      <Text>Show the app</Text>
    
    </SafeAreaView>
  );
}

export default App;