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


const RetailerTransaction=()=>{
  useEffect(()=>{
    getOrderData()
    allRetailer()
  },[])

  const route=useRoute();
  const navigation=useNavigation();
  const [getOrder,setGetOrder] = useState([]);
  const getOrderData = async() =>{
    await fetch('http://192.168.1.10:3000/getretailerallorders',{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "name": name,
    })
    }).then(console.log("request sent"))
  }

  const allRetailer = async() =>{
    fetch('http://192.168.1.10:3000/retailerall',{method:'GET',header: {
        'Content-Type': 'application/json'
      }})
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setGetOrder(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
  }


  const name = route.params.name;
  return(
    <View style={styles.container}>
      <View style={styles.header}><Text style={{fontSize:40,color:'white',left:'17%', top: '30%', fontWeight:'bold'}}>Transaction List</Text></View>
        <ScrollView contentContainerStyle={{flexGrow:1}}>
    {getOrder.map((item)=>{
      return(
        <View key={item.blockId}>
           <View style={styles.item}>
                  <View style={styles.listview}> 
                      <Text style={styles.txt} >Medicine Name:  </Text>
                      <Text style={styles.txt}>{item.medicineName}</Text>
                  </View>
                  <View style={styles.listview}> 
                    <Text style={styles.txt}>Manufacturer Name:  </Text>
                    <Text style={styles.txt}>{item.sellerName}</Text>
                  </View>
                  <View style={styles.listview}> 
                    <Text style={styles.txt}>Unit:  </Text>
                    <Text style={styles.txt}>{item.unit}</Text>
                  </View>
                  <View style={styles.listview}> 
                    <Text style={styles.txt}>Total Cost:  </Text>
                    <Text style={styles.txt}>{item.totalCost}</Text>
                  </View>
                  <View style={styles.listview}> 
                    <Text style={styles.txt}>Status:  </Text>
                    <Text style={styles.txt}>{item.status}</Text>
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
  item:{
    top:'2%',
    width:'90%',
    backgroundColor:'#9F4DEA',
    padding: 30,
    borderRadius: 50,
    left:'5%',
    marginTop:20,

  },
});

export default RetailerTransaction;