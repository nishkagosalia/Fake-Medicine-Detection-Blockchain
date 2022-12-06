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
  import { NavigationContainer, useRoute,useNavigation } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import DatePicker from 'react-native-date-picker';


const AddMedicine = () => {
    
    const navigation=useNavigation();
    const route=useRoute();
    const name=route.params.name;
    const [medicineName,setMedicineName] = useState('');
    const date = new Date();
    const [expiryDate,setExpiryDate] = useState(date);
    const [cost,setCost] = useState('');
    const [open, setOpen] = useState(false);
    const navigateToHome = () =>{
        navigation.navigate("manufacturer",{name:name});
    }
    const addMedsDatabase = async() =>{
       await fetch('http://192.168.100.40:3000/addMeds',{
            method:'POST',
            headers:{
                Accept: 'application/JSON',
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                "medicineName":medicineName,
                "expiryDate":expiryDate,
                "userName":"Tejanshu",
                "cost":cost,
            })
        })
        .then(navigateToHome())

    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.addmedsphoto}
                    source={require('../images/addmeds.png')}>
                </Image>
            </View>
            <View style={styles.inputheader}>
                <View style = {styles.titleText}>
                    <Text style = {{fontSize:20, color:"Black"}}>Medicine Name</Text>
                    <View style = {styles.textinputholder}>
                        <TextInput style = {{alignItems:"center"}} onChangeText = {text=>setMedicineName(text)}></TextInput>
                    </View>
                </View>
                <View style = {styles.titleText}>
                    <Text style = {{fontSize:20, color:"Black"}}>Expiry Date</Text>
                        <TouchableOpacity style = {styles.DateButton} onPress={() => setOpen(true)} >
                            <Text style = {{left:20, top:"20%", color:"white"}}>Date</Text>
                        </TouchableOpacity>
                        <View style = {styles.datepickerholder}>
                        <Text style = {{alignItems:"center", fontSize:18,left:10,top:10}}>{expiryDate.toISOString()}</Text>
                    </View>
                    <DatePicker
                        modal
                        open={open}
                        date={expiryDate}
                        onConfirm={(expiryDate) => {
                        setOpen(false)
                        setExpiryDate(expiryDate)
                        }}
                        onCancel={() => {
                        setOpen(false)
                        }}
                    />
                </View>
                <View style = {styles.titleText}>
                    <Text style = {{fontSize:20, color:"Black",top:-40}}>Cost</Text>
                    <View style = {styles.textinputholder2}>
                        <TextInput style = {{alignItems:"center"}} onChangeText = {text=>setCost(text)}></TextInput>
                    </View>
                </View>
                <TouchableOpacity style = {styles.AddButton} onPress = {addMedsDatabase} >
                    <Text style = {{left:75, top:"30%", color:"white"}}>Add</Text>
                </TouchableOpacity>
            </View>
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
        height: '40%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        position:'relative',
        
    },
    inputheader:{ 
        position:'absolute',
        width: '85%',
        height: '50%',
        borderRadius: 50,
        top:'45%',
        left:'9%',
        right:'10%',
        position: 'absolute',
    },
    addmedsphoto:{
        width:'60%',
        height:'70%',
        left: '20%',
        top:'20%',
    },
    titleText:{
        alignItems:"center",
        top:10,
        color:"red",
    },
    textinputholder:{
        borderColor:'#B8B6B8',
        width:'80%',
        top:'1%',
        borderRadius:30,
        borderWidth:3
    },
    textinputholder2:{
        borderColor:'#B8B6B8',
        width:'80%',
        top:'-40%',
        borderRadius:30,
        borderWidth:3
    },
    AddButton:{
        backgroundColor:'#900B90',
        width:'50%',
        height:'15%',
        borderRadius:20,
        top:'1%',
        left:'25%'
    },
    DateButton:{
        backgroundColor:'#900B90',
        width:'20%',
        height:'25%',
        borderRadius:20,
        top:'13%',
        right:"30%"
    },
    datepickerholder:{
        borderColor:'#B8B6B8',
        width:'70%',
        top:'-15%',
        left:"18%",
        borderRadius:30,
        borderWidth:3,
        height:50
    },
})

export default AddMedicine;