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
import {Picker} from '@react-native-picker/picker';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { useRoute,useNavigation } from '@react-navigation/native';

const RetailerHome = () =>{
  const navigation=useNavigation();
  const route=useRoute();
  const name=route.params.name;
   return(
     <View style={styles.container}>
           <View style={styles.header}>
               <Text style={styles.welcomtxt}>Welcome {name}!!</Text>
           </View>
           <TouchableOpacity style={styles.fields} onPress={()=>{navigation.navigate('retailerplaceorder')}}>
             <Image source={require('../images/placeOrder.png')} style={styles.addimg}></Image>
             <Text style={styles.txt}>Place order</Text>
           </TouchableOpacity>

           <View style={styles.field}></View>
           <TouchableOpacity style={styles.fields} onPress={()=>{navigation.navigate('retailertransaction')}}>
               <Image source={require('../images/transaction.png')} style={styles.transimg}></Image>
               <Text style={styles.ordertxt}>Transactions</Text>
           </TouchableOpacity>
           
           
           
       </View>
   )
}

const styles=StyleSheet.create({

  container:{
      backgroundColor: '#E0C5FA',
      flex: 1,
      flexDirection:'column',
      
  },
  header:{
      backgroundColor:'#9F4DEA',
      width:'100%',
      height: '20%',
      borderBottomLeftRadius: 90,
      borderBottomRightRadius: 90,
      position:'relative',
      
  },
  welcomtxt:{
    fontSize:30,
    top: '30%',
    left:'10%',
    color:'white',
  },

  fields:{
    width:'87%',
    height:'30%',
    top:'7%',
    left:'5%',
    borderRadius:30,
    backgroundColor:'#9F4DEA',
    flexDirection:'row'
  },
  field:{
    padding:10,
  }, 
  addimg:{
    width:'50%',
    height:'70%',
    top:'8%',
  },
  transimg:{
    width:'60%',
    height:'50%',
    top:'15%',
  },
  orderimg:{
    width:'40%',
    height:'90%',
    top:'2%',
    left:'3%'
  },
  ordertxt:{
    fontSize:27,
    top: '30%',
    left:'-5%',
    color:'white',
  },
  txt:{
    fontSize:30,
    top: '25%',
    left:'5%',
    color:'white',
  }
})
export default RetailerHome;