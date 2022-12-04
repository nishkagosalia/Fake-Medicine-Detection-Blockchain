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
  FlatList,
  Alert,
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { useRoute,useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';


const MyOrder=()=>{
  const route=useRoute();
  const navigation=useNavigation();
  const name=route.params.name;

  const [orderList,setOrderList]=useState([])
  useEffect(() => {
    getorderdetails()
    async function fetchData() {
      fetch('http://192.168.100.40:3000/sendmanorders',{method:'GET',header: {
        'Content-Type': 'application/json'
      }})
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setOrderList(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData()
  },[]);


  const getorderdetails=async()=>{
    await fetch('http://192.168.100.40:3000/getmanorders',{
      method:"POST",

      headers: {"Content-Type": "application/json"},

      body: JSON.stringify({
          "name": name,
      })
  }).then(console.log("request sent"))
  }


  const confirmOrder=async(medicineName,buyerName)=>{
    await fetch('http://192.168.100.40:3000/confirmorder',{
      method:"POST",

      headers: {"Content-Type": "application/json"},

      body: JSON.stringify({
          "medicineName": medicineName,
          "buyerName": buyerName,
    })
  }).then(Alert.alert("Order confirmed"))
}

 const generate=async(medicineName,buyerName,unit,cost)=>
 {
    await fetch('http://192.168.100.40:3000/pushtoTransactionDb',{
        method:"POST",

        headers: {"Content-Type": "application/json"},

        body: JSON.stringify({
            "medicineName": medicineName,
            "buyerName": buyerName,
            "unit": unit,
            "cost": cost, 
            "firstName":name,
      })
    }).then(Alert.alert("Please wait while we process your transaction")).then(navigation.navigate('manufacturer',{name:name}))

 }
  return(
    <View style={styles.container}>
       <View style={styles.header}></View>
    <ScrollView contentContainerStyle={{flexGrow:1}}>
    {orderList.map((item)=>{
      return(
        <View key={item.medicineName}>
           <View style={styles.item}>
                  <View style={styles.listview}> 
                      <Text style={styles.txt} >Medicine Name:  </Text>
                      <Text style={styles.txt}>{item.medicineName}</Text>
                      <TouchableOpacity style={styles.accept} onPress={()=>confirmOrder(item.medicineName,item.buyerName)}><Text style={styles.btntext}>Accept</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.reject} onPress={()=>generate(item.medicineName,item.buyerName,item.unit,item.cost)}><Text style={styles.btntext}>Generate QR</Text></TouchableOpacity>
                  </View>
                  <View style={styles.listview}> 
                    <Text style={styles.txt}>Buyer Name:  </Text>
                    <Text style={styles.txt}>{item.buyerName}</Text>
                  </View>
                  <View style={styles.listview}> 
                    <Text style={styles.txt}>Unit:  </Text>
                    <Text style={styles.txt}>{item.unit}</Text>
                  </View>
                  <View style={styles.listview}> 
                    <Text style={styles.txt}>Cost:  </Text>
                    <Text style={styles.txt}>{item.cost}</Text>
                  </View>
                  <View></View>
          </View>
          
        </View>
      )
    })}
    </ScrollView>
    </View>
  )

}

const styles=StyleSheet.create({

  container:{
      backgroundColor: '#E0C5FA',
      flex:1,
      
  },
  header:{
      backgroundColor:'#9F4DEA',
      width:'100%',
      height: '20%',
      borderBottomLeftRadius: 90,
      borderBottomRightRadius: 90,
      position:'relative',
      
  },
  item:{
    top:'2%',
    width:'90%',
    backgroundColor:'#9F4DEA',
    padding: 30,
    borderRadius: 50,
    left:'5%',
    marginTop:20,

  },
  listview:{
    width:'100%',
    flexDirection:'row'
  },
  txt:{
    size:40,
    color: 'white',
    top:'5%', 
    left:'10%',
  },
  btntext:{
    textAlign:'center',
    size:10,
    top:'5%',
  },
  accept:{
    width:'20%',
    height:'170%',
    top:'10%',
    left:'5%',
    backgroundColor:'white', 
    borderRadius:20,
  },
  reject:{
    width:'30%',
    height:'170%',
    top:'10%',
    left:'20%',
    backgroundColor:'white', 
    borderRadius:20,
  },
    
});

export default MyOrder;