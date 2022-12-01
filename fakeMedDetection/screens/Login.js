import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import { useState } from "react";
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Login=({navigation})=>{

    const [username,setUsername]=useState('')
    const [Password,setPassword]=useState('')
    const checkuser=async()=>{
        const resp=await fetch('http://192.168.100.40:3000/login',{
        method:"GET"})
        const res = await resp.json();
        const status=res.result;
        const designation=res.designation

        if(status=="success"){
            if(designation=="Manufacturer")
            {
                console.log("redirect")
                navigation.navigate('manufacturer')
            }
            else if(designation == "Retailer")
            {
                navigation.navigate('retailer')
            }
            else{
                navigation.navigate('consumer')
            }
        }else(
           Alert.alert("Login Failed")
        )
    }
    const loginuser=async()=>{

        console.log(username,Password)
        try{

             await fetch('http://192.168.100.40:3000/hello',{
                method:"POST",
        
                headers: {"Content-Type": "application/json"},

                body: JSON.stringify({
                    "username": username,
                    "password": Password,
                })
            }).then(checkuser())
           

        }
        catch{

        }
        finally{
            
        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.loginLogo}
                    source={require('../images/loginLogo.png')}>

                </Image>
            </View>
            <View style={styles.inputheader}>
                <View style={styles.text}>
                <TextInput
                    placeholder='Username'
                    style={{left:'10%', fontSize:20}}
                    onChangeText={text=>setUsername(text)}
                />
                </View>
                <View style={styles.textinput}>
                <TextInput
                    placeholder='Password'
                    style={{left:'10%', fontSize:20}}
                    secureTextEntry={true}
                    onChangeText={text=>setPassword(text)}
                />
                </View>
                <TouchableOpacity style={styles.button} onPress={loginuser}>
                    <Text style={styles.logintext}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity><Text style={{left:'7%', fontSize:22, color:'black',top:'999%'}}>Don't have an account?<Text style={{left:'7%', fontSize:22, color:'blue',top:'999%'}}> Register Now</Text></Text></TouchableOpacity>
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
        height: '50%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        position:'relative',
        
    },
    inputheader:{
        backgroundColor: 'white', 
        position:'absolute',
        width: '85%',
        height: '50%',
        borderRadius: 50,
        top:'30%',
        left:'9%',
        right:'10%',
        position: 'absolute',
        elevation: 10
    },
    loginLogo:{
        width:'60%',
        height:'70%',
        left: '20%',
        top:'2%',
    },
    text:{
        borderColor:'#B8B6B8',
        borderWidth:2,
        width:'80%',
        top:'20%',
        left:'9%',
        borderRadius:30,
    },
    textinput:{
        borderColor:'#B8B6B8',
        borderWidth:2,
        width:'80%',
        top:'28%',
        left:'9%',
        borderRadius:30,
    },
    button:{
        backgroundColor:'#900B90',
        width:'50%',
        height:'10%',
        borderRadius:30,
        top:'40%',
        left:'25%'
    },
    logintext:{
        left:'35%',
        fontSize:20,
        color:'white',
        top:'10%'
    }

})

export default Login