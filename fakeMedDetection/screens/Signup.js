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
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Signup = ({navigation}) =>{
    
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [designationValue,setDesignationValue] = useState('');

    const redirection = (designationValue) =>{
        if(designationValue == "Manufacturer"){
            navigation.navigate("manufacturer");
        }
        else if(designationValue == "Retailer"){
            navigation.navigate("retailer");
        }
        if(designationValue == "Consumer"){
            navigation.navigate("consumer");
        }
    }


    const Register = async() =>{
        console.log(lastName,designationValue);
        await fetch('http://192.168.1.10:3000/register',{
            method:'POST',
            headers:{
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                'userName':userName,
                'firstName':firstName,
                'lastName':lastName,
                'password':password,
                'designationValue':designationValue,
                'city':city,
            })
        })
        .then(redirection(designationValue))
    }
    
    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.upperBackground}>
            </View>
            <View style = {styles.middleForeGround}>
                <ScrollView>
                    <View style = {{bottom:30}}>
                        <View style = {styles.titleText}>
                            <Text style = {{color:"black"}}>Username</Text>
                            <View style = {styles.textBox}>
                            <TextInput style = {styles.textInput} onChangeText = {text => setUserName(text)}></TextInput>
                            </View>    
                        </View>
                        <View style = {styles.titleText}>
                            <Text style = {{color:"black"}}>First Name</Text>
                            <View style = {styles.textBox}>
                            <TextInput style = {styles.textInput} onChangeText = {text => setFirstName(text)}></TextInput>
                            </View>
                        </View>
                        <View style = {styles.titleText}>
                            <Text style = {{color:"black"}}>Last Name</Text>
                            <View style = {styles.textBox}>
                            <TextInput style = {styles.textInput} onChangeText = {text => setLastName(text)}></TextInput>
                            </View>
                        </View>
                        <View style = {styles.titleText}>
                            <Text style = {{color:"black"}}>Password</Text>
                            <View style = {styles.textBox}>
                            <TextInput style = {styles.textInput}  secureTextEntry = {true} onChangeText = {text => setPassword(text)}></TextInput>
                            </View>
                        </View>
                        <View style = {styles.titleText}>
                        <Picker
                        selectedValue = {designationValue}
                        style = {styles.dropdown}
                        prompt = {"Designation"}
                        onValueChange = {itemValue => setDesignationValue(itemValue)}>
                            <Picker.Item label = "Manufacturer" value="Manufacturer"/>
                            <Picker.Item label = "Retailer" value="Retailer"/>
                            <Picker.Item label = "Consumer" value="Consumer"/>
                        </Picker>
                        </View>
                        <View style = {styles.titleText}>
                            <Text style = {{color:"black"}}>City</Text>
                            <View style = {styles.textBox}>
                            <TextInput style = {styles.textInput} onChangeText = {text => setCity(text)}></TextInput>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                    <TouchableOpacity style = {styles.registerButton} onPress = {Register} >
                        <Text style = {{left:45, top:"20%", color:"white"}}>Register</Text>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            flexDirection:'column',
            backgroundColor:'#E0C5FA',
        },
        upperBackground:{
            backgroundColor:'#9F4DEA',
            height:'50%',
            width:'100%',
            borderBottomLeftRadius: 45,
            borderBottomRightRadius: 45,
            position:'absolute'
        },
        middleForeGround:{
            flex:1,
            borderRadius: 45,
            backgroundColor:'white',
            position:'absolute',
            top:100,
            left:35,
            width: '85%',
            height:'70%',
            elevation:10,
            padding:40
        },
        titleText:{
            alignItems:"center",
            top:30,
            color:"black"
        },
        textInput:{
            borderRadius:15,
            borderColor:'#B8B6B8',
            color:"black",
        },
        textBox:{
            borderWidth:2,
            width:255,
            borderRadius:15,
            borderColor:'#B8B6B8',
        },
        registerButton:{
            backgroundColor:'#900B90',
            width:'50%',
            height:'8%',
            borderRadius:20,
            top:'25%',
            left:'25%'
        },
        dropdown: {
            height:50,
            width:250,
            left:20,
            borderColor:"grey"
          },
    }
);

export default Signup;