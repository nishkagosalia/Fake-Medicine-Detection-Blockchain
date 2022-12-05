import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { useRoute,useNavigation } from '@react-navigation/native';


const ManufacturerQR=()=>{
  const route=useRoute();
  const navigation=useNavigation();
  const medname=route.params.medname
  const buyername=route.params.buyerName
  const totalcost=route.params.totalcost
  const unit=route.params.unit


  return(
    <QRcode value='Hey'/>
  )
}

export default ManufacturerQR;