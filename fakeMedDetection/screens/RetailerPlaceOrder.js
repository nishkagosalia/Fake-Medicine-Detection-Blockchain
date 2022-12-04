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
   const [displaydata,setDisplaydata]= useState([]);
   const [medArray,setMedArray] = useState([]);
   const [medName,setMedName] = useState('Crocin');
   const [medCost,setMedCost] = useState(100);
   const [manuName,setManuName] = useState('Tejanshu');
   const [unit,setUnit] = useState(0);
   const [totalPrice,setTotalPrice] = useState(0);
   const jsonarray = [];
   useEffect(() => {
    getMeds()
    getAllMedicineData()
    },[])

    const getMeds = async() =>{
      console.log("entered getmeds in react");
      const medicinearray=await fetch('http://192.168.100.40:3000/medslist',{method:'GET'})
      const resultmedslist = await medicinearray.json();
      for (var i=0;i<resultmedslist.length;i++){
        jsonarray.push({medicineName:resultmedslist[i]})
      }
      setDisplaydata(jsonarray);
     }

     const getAllMedicineData = async() =>{
      console.log("Retrieve all medicine data , called in react native");
      const allMedData = await fetch('http://192.168.100.40:3000/getAllMedsDB',{method:'GET'});
      console.log(allMedData);
      const jsonallMed = await allMedData.json();
      console.log(jsonallMed);
      setMedArray(jsonallMed);
     }

     const doMultipleThings = (itemValue) =>{
      console.log("this is med array using setstate",medArray);
      for(let j=0;j<medArray.length;j++){
        if(itemValue == medArray[j]){
          setMedSelected(itemValue);
          setMedName(medArray[j]);
          setMedCost(medArray[j+1]);
          setManuName(medArray[j+2]);
        }
      }
     }
    
      const calculatePrice = () =>{
        console.log("this function in react will calculate price");
        if(isNaN(unit) && isNaN(medCost)){
          console.log("something seems to be undefined");
        }
        else{
          console.log(typeof(parseInt(unit,10)),typeof(parseInt(medCost,10)))
          var total = (parseInt(unit,10)*parseInt(medCost,10));
          setTotalPrice(total);
          console.log(typeof(unit),typeof(medCost),typeof(total));
        }
        
      }

      const placeMedsOrder = async() =>{
        await fetch('http://192.168.100.40:3000/placeMedsOrder',{
            method:'POST',
            headers:{
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                
            })
        })
      }

    return(
      <View style={styles.container}>
            <View style={styles.header}>
                <View style = {styles.placeordertitle}>
                    <Text style = {{fontSize:30, fontWeight:"bold",color:"black"}}>PLACE YOUR ORDER </Text>
                </View>
            </View>
            <View style = {styles.titleText}>
                <View style = {styles.dropcircle}>
                    <Picker
                        selectedValue = {medSelected}
                        style = {styles.dropdown}
                        prompt = {"Select Medicine"}
                        onValueChange = {(itemValue,itemIndex) => doMultipleThings(itemValue)}
                        >
                            {displaydata.map((item,index) => {
                              return(
                                <Picker.Item label = {item.medicineName} value = {item.medicineName} key={index} />
                              )
                            })}
                    </Picker>
                </View>
            </View>
            <View style = {styles.medicinetile}>
                  <Text style = {styles.partimeds}> Medicine Name: {medName}</Text>   
                  <Text style = {styles.partimeds}> Medicine cost: {medCost}</Text>  
                  <Text style = {styles.partimeds}> Manufacturer Name: {manuName}</Text>         
            
            </View>
            <View style = {styles.footer}>
                <View style = {styles.quantity}>
                    <TextInput style = {{fontSize:13, left:10, top:0, fontWeight:"bold", color:"black"}} keyboardType="numeric" onChangeText={item => setUnit(parseInt(item))}>QTY :  </TextInput>
                </View>
                <TouchableOpacity style = {styles.getPrice} onPress = {() =>{calculatePrice()}} >
                    <Text style = {{fontSize:13, left:15, fontWeight:"bold", top:10, color:"black"}} onPress = {()=>{calculatePrice()}}>SHOW</Text>
                </TouchableOpacity>
                <View style = {styles.price}>
                    <Text style = {{fontSize:13, left:10, fontWeight:"bold", top:10, color:"black"}}>TOTAL PRICE : {totalPrice} </Text>
                </View>
            </View>
            <TouchableOpacity style = {styles.placeorder} onPress = {() =>{console.log(totalPrice)}} >
                <Text style = {{fontSize:13, fontWeight:"bold", left:35, top:10, color:"white"}}>PLACE ORDER</Text>
            </TouchableOpacity>
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
    height:300,
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
    width:"30%",
    top:"15%",
    height:"20%",
    borderWidth:2,
    borderRadius:30,
    borderColor:"purple",
    backgroundColor:"#D8BFD8"
  },
  getPrice:{
    width:"20%",
    top:"15%",
    left:10,
    height:"20%",
    borderWidth:2,
    borderRadius:30,
    borderColor:"purple",
    backgroundColor:"#D8BFD8"
  },
  price:{
    top:"15%",
    left:"10%",
    width:"35%",
    height:"20%",
    borderWidth:2,
    borderRadius:30,
    borderColor:"purple",
    backgroundColor:"#D8BFD8"
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
    backgroundColor:"#673147"
  },
  partimeds:{
    width:"100%",
    top:10,
    height:"7%",
    borderRadius:2
  },

})
export default RetailerPlaceOrder;