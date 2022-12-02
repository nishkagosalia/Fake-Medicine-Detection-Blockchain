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
import { useRoute,useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Dropdown} from 'react-native-element-dropdown';  

const RetailerPlaceOrder = () =>{
 
   const navigation=useNavigation();
   const route=useRoute();
   const [medSelected,setMedSelected] = useState('');
   const [displaydata,setDisplaydata]= useState([])
   const jsonarray = [];
   const array=[]
   const blank = [{label:'hello',value:'hi'},{label:'I',value:'You'}];
   useEffect(() => {
    getMeds()
    },[])


    const getMeds = async() =>{
      console.log("entered getmeds in react");
      const medicinearray=await fetch('http://192.168.100.40:3000/medslist',{method:'GET'})
      const resultmedslist = await medicinearray.json();
      for (var i=0;i<resultmedslist.length;i++){

        jsonarray.push({medicineName:resultmedslist[i]})
        // jsonarray.push();
      }
      setDisplaydata(jsonarray)
      // console.log(jsonarray);
      // console.log(array)
     }
    

    return(
      <View style={styles.container}>
            <View style={styles.header}>
                <View style = {styles.placeordertitle}>
                    <Text style = {{fontSize:30,color:"black"}}>PLACE YOUR ORDER </Text>
                </View>
            </View>
            <View style = {styles.titleText}>
                <View style = {styles.dropcircle}>
                    <Picker
                        selectedValue = {medSelected}
                        style = {styles.dropdown}
                        prompt = {"Select Medicine"}
                        onValueChange = {(itemValue,itemIndex) => setMedSelected(itemValue)}
                        >
                            {displaydata.map((item,index) => {
                              return(
                                <Picker.Item label = {item.medicineName} value = {item.medicineName} key={index} />
                              )
                            })}
                    </Picker>

                    {/* <Dropdown style = {styles.dropdown}
                    data = {jsonarray}
                    onChange = {itemValue =>{
                      setMedSelected(itemValue)
                    }}
                    >
                    </Dropdown> */}
                </View>
            </View>
            <View style = {styles.medicinetile}>
            
            
            </View>
            <View style = {styles.footer}>
                <View style = {styles.quantity}>
                    <Text style = {{fontSize:13, left:10, top:10, color:"black"}}>UNIT : {} </Text>
                </View>
                <View style = {styles.price}>
                    <Text style = {{fontSize:13, left:10, top:10, color:"black"}}>TOTAL PRICE : {} </Text>
                </View>
            </View>
            <View style = {styles.placeorder}>
                <Text style = {{fontSize:13, left:40, top:10, color:"black"}}>PLACE ORDER !!</Text>
            </View>
        </View>
    )}
                  
const styles=StyleSheet.create({
  container:{
      backgroundColor: '#E0C5FA',
      flex: 1,
      flexDirection:'column',
      
  },
  header:{
      backgroundColor:'#9F4DEA',
      width:'100%',
      height:'15%',
      borderBottomLeftRadius: 90,
      borderBottomRightRadius: 90,
      position:'relative',
      
  },
  titleText:{
    alignItems:"center",
    top:20,
    color:"black",
  },
  dropdown: {
    height:50,
    width:250,
    left:20,
    borderColor:"black",
    
  },
  dropcircle:{
    height:60,
    width:"70%",
    borderWidth:3,
    borderRadius:30,
    borderColor:"purple"
  },
  medicinetile:{
    height:"50%",
    top:"5%",
    left:"15%",
    width:"70%",
    borderWidth:3,
    borderRadius:30,
    borderColor:"purple",
    backgroundColor:"white"
  },
  placeordertitle:{
    width:"100%",
    top:"30%",
    height:"70%",
    borderRadius:3,
    alignItems:"center"
  },    
  footer:{
    width:"100%",
    left:"3%",
    height:"30%",
    flexDirection:"row"
  },
  quantity:{
    width:"40%",
    top:"15%",
    height:"20%",
    borderWidth:2,
    borderRadius:30,
    borderColor:"purple",
    backgroundColor:"#F25AF2"
  },
  price:{
    top:"15%",
    left:"10%",
    width:"40%",
    height:"20%",
    borderWidth:2,
    borderRadius:30,
    borderColor:"purple",
    backgroundColor:"#F25AF2"
  },
  bottom:{
    width:"100%",
    left:"3%",
    height:"10%",
  },
  placeorder:{
    top:"-12%",
    left:"27%",
    width:"40%",
    height:"5%",
    borderWidth:2,
    borderRadius:30,
    borderColor:"purple",
    backgroundColor:"pink"
  },

})
export default RetailerPlaceOrder;