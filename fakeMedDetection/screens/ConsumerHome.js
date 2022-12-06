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
import {CameraKitCameraScreen} from 'react-native-camera-kit';

const ConsumerHome = () =>{
    
    const navigation=useNavigation();
    const route=useRoute();
    const [fullQr,setFullQr] = useState(false);
    
    const fullqr = () => {
      if (Platform.OS === 'android') {
        async function requestCameraPermission() {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA,
              {
                title: 'Camera Permission',
                message: 'App needs permission for camera access',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // If CAMERA Permission is granted
              setQrvalue('');
              setOpneScanner(true);
            } else {
              alert('CAMERA permission denied');
            }
          } catch (err) {
            alert('Camera permission err', err);
            console.warn(err);
          }
        }
        // Calling the camera permission function
        requestCameraPermission();
      } else {
        setQrvalue('');
        setOpneScanner(true);
      }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
              <Text style = {styles.titleHeader}>VERIFY YOUR MEDICINE</Text>
            </View>
            <View style = {styles.imageforqr}>
                <Image source={require('../images/qrimage.jpg')} style={styles.imagerender}></Image>
            </View>
            <TouchableOpacity style={styles.scanme} onPress={()=>{fullqr()}}>
                <Text style = {{fontWeight:"bold",fontSize:30,left:"4%",top:"8%",color:"white"}}>CLICK TO VERIFY</Text>
            </TouchableOpacity>
            <View style = {styles.result}>
                <Text style = {styles.textres}>   </Text>
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
    imageforqr:{
      width:"50%",
      height:"25%",
      borderRadius:2,
      left:"25%",
      top:"5%",
      backgroundColor:"white",
    },
    imagerender:{
      width:"100%",
      height:"100%"
    },
    scanme:{
      width:"65%",
      height:"7%",
      borderWidth:2,
      left:"17%",
      top:"8%",
      borderRadius:15,
      borderColor:"#DF73FF",
      backgroundColor:"#DF73FF"
  },
  result:{
    width:"65%",
    height:"25%",
    borderRadius:15,
    borderColor:"#9C51B6",
    backgroundColor:"#9C51B6",
    left:"17%",
    top:"12%"
  },  
  textres:{

  },
})

export default ConsumerHome;