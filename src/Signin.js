import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Button, TextInput, StatusBar, Text, TouchableOpacity} from 'react-native'
import {useForm, Controller, appendErrors} from 'react-hook-form'
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { redirect } from './redirectionVar';
// import { LinearGradient } from 'expo-linear-gradient';

const url = 'http://966b-147-210-179-68.ngrok.io';
function Signin(props) {
    const [locationdata,setLocation]=useState({
        location:'',
        errorMessage:''
    });
   
   

      const getLocation = async()=>{
        let { status } = await Location.requestForegroundPermissionsAsync();
      if(status!=='granted'){
        console.log("Permission Not Granted!")   
        setLocation({
          erroMessage:'PERMISSION NOT GRANTED'
        })
      }
    
      const location2 = await Location.getCurrentPositionAsync();
     
  
    try {

       const jsonValue = await AsyncStorage.getItem('token')
       console.log(JSON.parse(jsonValue).token);
       let token_key = JSON.parse(jsonValue).token
      
       console.log("sent after try");
      
       const response = await fetch('http://966b-147-210-179-68.ngrok.io/profile/location',{
       method: 'POST',
       body: JSON.stringify({
           location: location2.coords,
           token:token_key
       }),
       headers: {"Content-Type": "application/json"}
       })
     } catch(e) {
       // error reading value
       console.log(e);
     }
     
    
      setLocation({
            ...locationdata,
        location:JSON.stringify(location2)
      })
    }
     



    const [userData, setUserData] = useState({
        email: '',
        password: '',
        isEmailValid: true,
        isPasswordValid: true,
        isThereInput: false,
        isPassInvisible: true,
        isDataValid:true,
        errorMessageSignin: false,

    });
    //data containing info on user sign in status

    

        // useState is async, useEffect to print after state is updated


    const [Checkerror, setCount] = useState(0);// state to block sign in button  when error
    var blockSign = 0;


    const {control, handleSubmit, error, reset } = useForm({
    defaultValues: {
        'email': '',
        'password': ''
        }
    }) //hook for form

    const SetEmail = (data) => {
        if(data!="")
        {

        setUserData({
                ...userData,
                email: data,
                isEmailValid: true,
                isThereInput: true,
            });

        }
        if(data=="")
        {

        setUserData({
                ...userData,
                email: data,
                isEmailValid: false,
                isThereInput: false,
            });

        }

    }

    const SetPassword = (data) => {
        if(data!="")
        {

            setUserData({
                ...userData,
                password: data,
                isPasswordValid: true,
            });

        }
        if(data=="")
        {

        setUserData({
                ...userData,
                password: data,
                isPasswordValid: false,

            });

        }

    }
    
    function onSigninPressed(data)
    {
            // props.navigation.navigate('UploadImageScreen')
            // props.navigation.navigate('HomeScreen');
           
        var loginData = {
            email : data.email,
            password : data.password
        }
        let goOn = true;
            // const isEmpty = Object.keys(RegisterData);
            for(const item in loginData)
            {
                
                if(loginData[item] === "")
                {
                    goOn = false;
                    break;
                }
            }
            
            if(goOn === false)
            {
                setUserData({
                    ...userData,
                    errorMessageSignin: true,
                })
            }
            else{

                
                sendSigninData(loginData);
            }
            // useEffect((emailPass) => sendSigninData(emailPass), [emailPass]);
            console.log(loginData);
            // props.navigation.navigate('HomeScreen');

    }

    async function sendSigninData(data)
    {
        
      const response = await fetch(url + '/login',{
        method: 'POST',
        body: JSON.stringify({
            loginData: data
        }),
        headers: {"Content-Type": "application/json"}
        })
        var data = await response.json();
        // var status = await response.status();
        console.log(data);
        console.log(response.status);
        if(response.status === 200)
        {
            getLocation();
            // console.log(locationdata.location);
            // sendLocation(locationdata.location);
            props.navigation.navigate('HomeScreen');
           
            storeData(data);

        }
        else if(response.status === 201)
        {
            props.navigation.navigate('UploadImageScreen')
        }
        else{
            console.log("can't login");
            setUserData({
                ...userData,
                isDataValid: false

            });
        }
        // console.log(data.token);
        
    }
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('token', jsonValue)
        } catch (e) {
          console.log(e);
        }
      }

//     const getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem('token')
//       console.log('s');
//       console.log(jsonValue.token);
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch(e) {
//       // error reading value
//     }
//   }
  
//   getData();

    function CheckEmail(data)
    {
        if(data == "")
        {
            setUserData({
                ...userData,
                isEmailValid: false,
            });
        }
        else{
                setUserData({
                    ...userData,
                    isEmailValid: true,
                })
        }



    }
    function CheckPassword(data)
    {
        if(data == "")
        {

            setUserData({
                ...userData,
                isPasswordValid: false,
            })
        }
        else{

            setUserData({
                ...userData,
                isEmailValid: true,
            })


        }
    }


    return (
        <View style = {styles.container}>

            <View style = {styles.title}>
                <Text style = {styles.brand}>Smashbrosv0.4</Text>
            </View>
            <View style = {styles.inputAll}>
            <View style = {styles.inputOne}>
            <Controller
                control={control}
                name = "email"
                render={({value}) => (
                    <TextInput
                        style = {styles.input}
                        placeholder = "Email"
                        value={value}
                        onChangeText={(value) => SetEmail(value)}
                        onEndEditing={(e) => CheckEmail(e.nativeEvent.text)}/>

                )}

            />
            {/* </View> */}
            {/* <View> */}
            {userData.isThereInput ?
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                        style = {[{paddingLeft:220, marginTop:-25}]}
                    />
                </Animatable.View>
                : null}

            </View>
            <View>
            { userData.isEmailValid ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'black'}}>Email must not be empty.</Text>
                </Animatable.View>
            }
            </View>

            <View style = {styles.inputTwo}>
         <Controller
                control={control}
                name = "password"
                render={({onChange, value}) => (
                    <TextInput
                        style = {styles.inputpass}
                        placeholder = "Password"
                        value={value}
                        onChangeText={(value) => SetPassword(value)}
                        onEndEditing={(e) => CheckPassword(e.nativeEvent.text)}
                        secureTextEntry={userData.isPassInvisible   }/>

                )}
            />


            {/* <Feather
                        name="eye-off"
                        color="grey"
                        size={20}
                        style = {[{paddingLeft:220, marginTop:-25}]}
                    /> */}


            </View>
            <View>
            { userData.isPasswordValid ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'black'}}>Password must not be empty.</Text>
                </Animatable.View>
            }
            </View>
            <View>
            { userData.isDataValid ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'red'}}>Email or password are incorrect.</Text>
                </Animatable.View>
            }
            </View>


            <View style = {styles.butcontainer}/>
                {/* <Button
                    title='Sign in'
                    onPress={handleSubmit(onSigninPressed)}
                    style = {styles.button}/> */}

                    <TouchableOpacity style = {[styles.button, {borderColor: '#92057b',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    onPress={() => onSigninPressed(userData)}>
                    <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
            <View/>
            <View>
            { !userData.errorMessageSignin? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={{color : 'red'}}>Some fields are not valid.</Text>
                    </Animatable.View>
            }
                </View>
            <TouchableOpacity
            onPress={() => props.navigation.navigate('RegisterScreen')}>
                <Text style = {{alignSelf : 'center', marginTop:'2%', color:'#92057b'}}>Create an account!</Text>
            </TouchableOpacity>
            </View>
      <StatusBar style="auto"/>

      </View>

    );
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        backgroundColor: '#92057b',
        justifyContent:"center",
        alignItems:'center'


    },
    text_head:{
        color: 'red',
        fontWeight: 'bold',
        fontSize: 30,
    },
    title : {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,


    },

    brand :{
        color : 'white',
        fontWeight: 'bold',
        fontSize: 30,

    },

    inputAll : {
        flex: 4,
        // justifyContent : 'space-around',
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingHorizontal:63,
        backgroundColor : '#fff',
    },
    inputOne : {
        flex: 0.1,
        marginTop:  20,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth:2,
        borderRadius:10,



    },
    inputTwo : {
        flex: 0.1,
        marginTop:  20,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth:2,
        borderRadius:10,

    },


    button :{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal:100,
        marginLeft:15,
        backgroundColor : '#92057b',
    },

    loginText : {
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 20,
        color:'white',

    },



  });
export default Signin;
