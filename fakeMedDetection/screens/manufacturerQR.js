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
import QRCode from 'react-native-qrcode-svg';

const ManufacturerQR = () =>{

    useEffect(() =>{
        console.log("i am useeffect");
          fetchData()
        },[]
    )

    const navigation=useNavigation();
    const route=useRoute();
    const medicineName = route.params.medname;
    const buyerName = route.params.buyerName;
    const cost = route.params.cost;
    const unit = route.params.unit;
    const blockID = route.params.blockID;
    const [qrhash,setQrHash]=useState('default')

    const fetchData = async() => {
        console.log("entered fetch data");
        await fetch('http://192.168.45.225:3000/qrHash',{method:'GET',header: {
          'Content-Type': 'application/json'
        }})
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            for(let i=0;i<responseJson.length;i++)
            {
                if(responseJson[i]==blockID)
                {
                    setQrHash(responseJson[i+1])
                    console.log(responseJson[i+1])
                    break
                }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style = {styles.titleHeader}>TRANSACTION DETAILS</Text>
            </View>
            <View style = {styles.qrsection}>
                <QRCode value={qrhash} size={182}/>
            </View>
            <View style={styles.scanme}>
                <Text style = {{fontWeight:"bold",fontSize:30,left:"10%",top:"8%",color:"white"}}>SCAN ME</Text>
            </View>
            <View style = {styles.content}>
                <Text style = {styles.titleEvent}>
                    Medicine Name
                </Text>
                <View style = {styles.contentView}>
                    <Text style={{fontSize:20,color:'white',left:'10%',top:"10%"}}>{medicineName}</Text>
                </View>
            </View>
            <View style = {styles.content2}>
                <Text style = {styles.titleEvent}>
                    Retailer Name
                </Text>
                <View style = {styles.contentView2}>
                    <Text style={{fontSize:20,color:'white',left:'10%',top:"10%"}}>{buyerName}</Text>
                </View>
            </View>
            <View style = {styles.content3}>
                <Text style = {styles.titleEvent}>
                    Units
                </Text>
                <View style = {styles.contentView3}>
                    <Text style={{fontSize:20,color:'white',left:'10%',top:"10%"}}>{unit}</Text>
                </View>
            </View>
            <View style = {styles.content4}>
                <Text style = {styles.titleEvent}>
                    Total Cost
                </Text>
                <View style = {styles.contentView4}>
                    <Text style={{fontSize:20,color:'white',left:'10%',top:"10%"}}>{cost}</Text>
                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#E0C5FA',
        flex: 1,
        flexDirection:'column',
        
    },
    header:{
        backgroundColor:'#9F4DEA',
        width:'100%',
        height: '18%',
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        position:'relative',
        
    },
    titleHeader:{
        fontSize:30,
        top: '30%',
        left:'8%',
        color:'white',
        fontWeight:"bold"
      },
    qrsection:{
        width:"45%",
        height:"25%",
        left:"28%",
        top:"5%",
        borderWidth:2,
        borderColor:"white",
        backgroundColor:"white"
    },
    scanme:{
        width:"45%",
        height:"7%",
        borderWidth:2,
        left:"28%",
        top:"8%",
        borderRadius:15,
        borderColor:"#B666D2",
        backgroundColor:"#B666D2"
    },
    content:{
        flexDirection:"row",
        width:"90%",
        height:"7%",
        left:"3%",
        top:"20%",
        borderRadius:2,
        borderColor:"#B666D2",
        backgroundColor:"#E0C5FA"

    },
    content2:{
        flexDirection:"row",
        width:"90%",
        height:"7%",
        left:"3%",
        top:"25%",
        borderRadius:2,
        borderColor:"#B666D2",
        backgroundColor:"#E0C5FA"

    },
    content3:{
        flexDirection:"row",
        width:"90%",
        height:"7%",
        left:"3%",
        top:"30%",
        borderRadius:2,
        borderColor:"#B666D2",
        backgroundColor:"#E0C5FA"

    },
    content4:{
        flexDirection:"row",
        width:"90%",
        height:"7%",
        left:"3%",
        top:"35%",
        borderRadius:2,
        borderColor:"#B666D2",
        backgroundColor:"#E0C5FA"

    },
    titleEvent:{
        fontWeight:"bold",
        color:"black",
        fontSize:20,
        top:"3%",
        left:"1%"
    },
    contentView:{
        left:15,
        width:"55%",
        height:"80%",
        top:"1%",
        borderRadius:10,
        backgroundColor:"#563C5C",
        borderColor:"#563C5C",
    },
    contentView2:{
        left:26,
        width:"55%",
        height:"80%",
        top:"1%",
        borderRadius:10,
        backgroundColor:"#563C5C",
        borderColor:"#563C5C",
    },
    contentView3:{
        left:108,
        width:"55%",
        height:"80%",
        top:"1%",
        borderRadius:10,
        backgroundColor:"#563C5C",
        borderColor:"#563C5C",
    },
    contentView4:{
        left:65,
        width:"55%",
        height:"80%",
        top:"1%",
        borderRadius:10,
        backgroundColor:"#563C5C",
        borderColor:"#563C5C",
    },

})

export default ManufacturerQR;