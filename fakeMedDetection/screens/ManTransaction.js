import React, { useEffect, useState } from 'react';
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


const ManTransaction=()=>{
  const route=useRoute();
  const navigation=useNavigation();
  const name=route.params.name;
  
  const [transaction,setTransaction]=useState([])
  useEffect(()=>{
    getTransactionData()
    async function fetchData() {
      fetch('http://192.168.45.225:3000/sendalltransaction',{method:'GET',header: {
        'Content-Type': 'application/json'
      }})
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setTransaction(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fetchData()

  },[])

  const getTransactionData=async()=>{
    await fetch('http://192.168.45.225:3000/gettransactionlist',{
      method:"POST",

      headers: {"Content-Type": "application/json"},

      body: JSON.stringify({
          "name": name,
      })
  }).then(console.log("request sent"))
  }

  return(
    <View style={styles.container}>
       <View style={styles.header}><Text style={{fontSize:40,color:'white',left:'17%', top: '30%', fontWeight:'bold'}}>Transaction List</Text></View>
    <ScrollView contentContainerStyle={{flexGrow:1}}>
    {transaction.map((item)=>{
      return(
        <View key={item.blockId}>
           <View style={styles.item}>
                  <View style={styles.listview}> 
                      <Text style={styles.txt} >Medicine Name:  </Text>
                      <Text style={styles.txt}>{item.medicineName}</Text>
                      <TouchableOpacity style={styles.accept} onPress={()=>navigation.navigate('manufacturerqr',{medname: item.medicineName,buyerName:item.buyerName,cost:item.totalCost,unit:item.unit,blockID:item.blockId})}><Text style={styles.btntext}>View QR</Text></TouchableOpacity>
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
                    <Text style={styles.txt}>Total Cost:  </Text>
                    <Text style={styles.txt}>{item.totalCost}</Text>
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
    fontSize:17,
    color: 'white',
    top:'1%', 
    left:'10%',
  },
  btntext:{
    top:'16%',
    left:'22%',
    fontSize:17,
    color:'black',
  },
  accept:{
    width:'40%',
    height:'170%',
    top:'10%',
    left:'5%',
    backgroundColor:'white', 
    borderRadius:20,
  },
    
});

export default ManTransaction;