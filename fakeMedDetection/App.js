
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
  fetch('http://127.0.0.1:3000/',{method:"GET"})
      .then(function (response) {
        // handle success
        console.log(response)
        alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      })
      .finally(function () {
        // always executed
        alert('Finally called');
      });

  return (
    <SafeAreaView>
      <Text>Show the app</Text>
    
    </SafeAreaView>
  );
}

export default App;