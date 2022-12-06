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
  import { useEffect, useState } from "react";
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { json } from 'stream/consumers';


const Login=({navigation})=>{
    useEffect(() => {
        loginuser()
        },[])   

    const [username,setUsername]=useState('')
    const [Password,setPassword]=useState('')
    const [jsonState,setJsonState] = useState([]);

    const checkUser = (jsonAllLoginData) =>{
        var flag = 0;
        for(let i=0;i<jsonAllLoginData.length;i++){
            if(username==jsonAllLoginData[i]){
                if(Password==jsonAllLoginData[i+1]){
                    if(jsonAllLoginData[i+2]=="Manufacturer"){
                        navigation.navigate("manufacturer",{name:jsonAllLoginData[i+3]});
                        flag = 1;
                    }
                    else if(jsonAllLoginData[i+2]=="Retailer"){
                        navigation.navigate("retailer",{name:jsonAllLoginData[i+3]});
                        flag = 1;
                    }
                    else if(jsonAllLoginData[i+2]=="Consumer"){
                        navigation.navigate("consumer",{name:jsonAllLoginData[i+3]});
                        flag = 1;
                    }
                }
            }
        }
        if (flag==0){
            Alert.alert("You are prohibited inside the network !! ");
        }
       
    }

    const loginuser=async()=>{
        const allLoginData = await fetch('http://192.168.100.40:3000/optimizelogin',{method:"GET"});
        const jsonAllLoginData = await allLoginData.json()
        setJsonState(jsonAllLoginData);
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
                <TouchableOpacity style={styles.button} onPress={()=>{checkUser(jsonState)}}>
                    <Text style={styles.logintext}>Login</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}><Text style={{left:'7%', fontSize:22, color:'black',top:'999%'}}>Don't have an account?<Text style={{left:'7%', fontSize:22, color:'blue',top:'999%'}}> Register Now</Text></Text></TouchableOpacity>
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
export default Login;