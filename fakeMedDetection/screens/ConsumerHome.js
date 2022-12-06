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
  PermissionsAndroid
} from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';
import {Camera} from 'react-native-camera-kit';

const ConsumerHome = () => {
    
    const navigation=useNavigation();
    const route=useRoute();
    const [fullQr,setFullQr] = useState(false);
    const [qrvalue, setQrvalue] = useState('');
    const [qrhash,setQrHash]=useState('default')
    const [hashvalues,setHashvalues]=useState([])
    const [status,setStatus]=useState('')

    useEffect(()=>{
      fetchData()
    },[])

    const onQRcodeScan = (qrvalue) => {
      // Called after te successful scanning of QRCode/Barcode
      setQrvalue(qrvalue);
      for(let i=0;i<hashvalues.length;i++)
          {
              if(hashvalues[i]==qrvalue)
              {
                  setStatus('verified')
                  break
              }
          }
      setFullQr(false);
    };

    const fetchData = async() => {
      console.log("entered fetch data");
      await fetch('http://192.168.1.10:3000/qrHash',{method:'GET',header: {
        'Content-Type': 'application/json'
      }})
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          setHashvalues(responseJson)
        })
        .catch((error) => {
          console.error(error);
        });
    }

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
              setStatus('')
              setFullQr(true);
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
        setFullQr(true);
      }
    }

    return(
        <SafeAreaView style={{flex:1}}>
           {fullQr ? (
                    <Camera
                        style={{ width:'100%'.width, height:'100%', justifyContent: 'center', alignContent: 'center'}}
                        showFrame={false}
                        // Show/hide scan frame
                        scanBarcode={true}
                        // Can restrict for the QR Code only
                        laserColor={'blue'}
                        // Color can be of your choice
                        frameColor={'yellow'}
                        // If frame is visible then frame color
                        colorForScannerFrame={'black'}
                        // Scanner Frame color
                        onReadCode={(event) =>
                          onQRcodeScan(event.nativeEvent.codeStringValue)
                        }
                      />
                  ) : (
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
                             {status.includes('verified') ? 
                                ( <Text style = {styles.textres}> YOUR MEDICINE IS AUTHENTIC  </Text>):
                                (<Text style = {styles.textres}> YOUR MEDICINE IS FAKE </Text>)}
                             <Text style={styles.textres}>VERIFIED SUCCESSFULLY !!</Text>
                          </View>

                    </View>
                  )}
            
           
        </SafeAreaView>

          
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
    color:'white',
    fontSize:28,
    left:'3%',
    marginBottom:'8%',
  },
})

