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
import { useRoute,useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const ManufacturerHome = () =>{
   const navigation=useNavigation();
   const [name,setName]=useState('')
   const route=useRoute();
   const username=route.params.username;
    return(
      <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomtxt}>Welcome {username} !!</Text>
            </View>
            <TouchableOpacity style={styles.fields} onPress={()=>{navigation.navigate('addMedicine',{username:username})}}>
              <Image source={require('../images/addmeds.png')} style={styles.addimg}></Image>
              <Text style={styles.txt}>Add Medicine</Text>
            </TouchableOpacity>

            <View style={styles.field}></View>
            <TouchableOpacity style={styles.fields} onPress={()=>{navigation.navigate('myorder',{username:username})}}>
              <Image source={require('../images/myorder.png')} style={styles.orderimg}></Image>
              <Text style={styles.ordertxt}>My Orders</Text>
            </TouchableOpacity>
            <View style={styles.field}>

            </View>
            <TouchableOpacity style={styles.fields} onPress={()=>{navigation.navigate('retailerplaceorder')}}>
                <Image source={require('../images/transaction.png')} style={styles.transimg}></Image>
                <Text style={styles.txt}>Transactions</Text>
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
    width:'85%',
    height:'20%',
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
    width:'40%',
    height:'90%',
    top:'2%',
  },
  transimg:{
    width:'50%',
    height:'70%',
    top:'5%',
  },
  orderimg:{
    width:'40%',
    height:'90%',
    top:'2%',
    left:'3%'
  },
  ordertxt:{
    fontSize:30,
    top: '15%',
    left:'17%',
    color:'white',
  },
  txt:{
    fontSize:30,
    top: '15%',
    left:'5%',
    color:'white',
  }
})
export default ManufacturerHome;