import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Button, TextInput, StatusBar, Text, TouchableOpacity,ScrollView,} from 'react-native'
import {useForm, Controller} from 'react-hook-form'
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url='http://d857-147-210-179-68.ngrok.io';
function Register(props)
{
    const [userData, setUserData] = useState({
        FirstName:'',
        LastName:'',
        userName:'',
        email: '',
        password: '',
        isEmailValid: true,
        isPasswordValid: true,
        isFirstNameValid: true,
        isLastNameValid: true,
        isUserNameValid: true,
        isThereInputFirstName: false,
        isThereInputLastName: false,
        isThereInputUsername: false,
        isThereInputEmail: false,
        isPassInvisible: true,
        isEmailUsed: false,
        errorMessage:false,
    });

    
    const {control} = useForm({
        defaultValues: {
            'FirstName':'',
            'LastName':'',
            'userName': '',
            'email': '',
            'password': ''
            }
        }) //hook for form

        const SetFirstName = (data) => {
            if(data!="")
            {

            setUserData({
                    ...userData,
                    FirstName: data,
                    isFirstNameValid: true,
                    isThereInputFirstName: true,
                });

            }
            if(data=="")
            {

            setUserData({
                    ...userData,
                    FirstName: data,
                    isFirstNameValid: false,
                    isThereInputFirstName: false,
                    
                });

            }

        }

        const  CheckFirstName = (data) =>
        {
        if(data == "")
        {
            setUserData({
                ...userData,
                isFirstNameValid: false,
                
            });
        }
        else{
                setUserData({
                    ...userData,
                    isFirstNameValid: true,
                })
        }
    }

    const setLastName = (data) => {
        if(data!="")
        {

        setUserData({
                ...userData,
                LastName: data,
                isLastNameValid: true,
                isThereInputLastName: true,
            });

        }
        if(data=="")
        {

        setUserData({
                ...userData,
                LastName: data,
                isLastNameValid: false,
                isThereInputLastName: false,

            });

        }

    }

    const  CheckLastName = (data) =>
        {
        if(data == "")
        {
            setUserData({
                ...userData,
                isLastNameValid: false,
            });
        }
        else{
                setUserData({
                    ...userData,
                    isLastNameValid: true,
                })
        }
    }

    const setUsername = (data) => {
        if(data!="")
        {

            setUserData({
                ...userData,
                userName: data,
                isUserNameValid: true,
                isThereInputUsername: true,

            });

        }
        if(data=="")
        {

        setUserData({
                ...userData,
                userName: data,
                isUserNameValid: false,
                isThereInputUsername: false,



            });

        }

    }

    const CheckUsername = (data) =>
    {
        if(data == "")
        {
            setUserData({
                ...userData,
                isUserNameValid: false,

            });
        }
        else{
                setUserData({
                    ...userData,
                    isUserNameValid: true,
                })
        }



    }

    const SetEmail = (data) => {
        if(data!="")
        {

        setUserData({
                ...userData,
                email: data,
                isEmailValid: true,
                isThereInputEmail: true,
            });

        }
        if(data=="")
        {

        setUserData({
                ...userData,
                email: data,
                isEmailValid: false,
                isThereInputEmail: false,

            });

        }

    }

   async function CheckEmail(data) 
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

        const response = await fetch(url + '/register/check-email',{
            method: 'POST',
            body: JSON.stringify({
                email: data
            }),
            headers: {"Content-Type": "application/json"}
            })
            // var data = await response.json();
            // var status = await response.status();
            console.log(data);
            console.log(response.status);
            
            if (response.status === 409)
            {
                setUserData({
                    ...userData,
                    isEmailUsed:true
                })
            }
            else{
                setUserData({
                    ...userData,
                    isEmailUsed:false,

                })
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

    function onRegisterPressed(data)
    {
            //   props.navigation.navigate('SigninScreen');   

          let RegisterData;
            RegisterData = {
                firstName : data.FirstName,
                lastName : data.LastName,
                username : data.userName,
                email : data.email,
                password : data.password,
                
            }
            
            let goOn = true;
            for(const item in RegisterData)
            {
                console.log("loging items : " + RegisterData[item]);
                if(RegisterData[item] === "")
                {
                    goOn = false;
                    break;
                }
            }
            console.log("goon: "+ goOn);
            if(goOn === false)
            {
                setUserData({
                    ...userData,
                    errorMessage: true,
                })
            }
            else{

                sendSigninData(RegisterData);
            }
            //   props.navigation.navigate('SigninScreen');   
        

    };

    
    async function sendSigninData(data)
    {
        
        var recv ;
        console.log(data);
        const response = await fetch(url +'/register',{
        method: 'POST',
        body: JSON.stringify({
            registerData: data
        }),
        headers: {"Content-Type": "application/json"}
        })
        // var data = await response.json();
        // var status = await response.status();
        console.log(data);
        console.log(response.status);
        if(response.status === 200)
        {
          props.navigation.navigate('SigninScreen');   

        }
        
        // settest(data.id);
        // storeData(data)

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
      
//       console.log(jsonValue);
//     //   console.log('s');
//       return jsonValue != null ? JSON.parse(jsonValue) : null;
//     } catch(e) {
//       // error reading value
//     }
//   }
  
//   getData();




    return (

        <View style = {styles.container}>
            <View style = {styles.title}>
                <Text style = {styles.brand}>Smashbrosv0.4</Text>
            </View>
            <View style = {styles.inputAll}>
            <View style = {styles.inputOne}>
            <Controller
                control={control}
                name = "First name"
                render={({value}) => (
                    <TextInput
                        style = {styles.input}
                        placeholder = "First name"
                        value={value}
                        onChangeText={(value) => SetFirstName(value)}
                        onEndEditing={(e) => CheckFirstName(e.nativeEvent.text)}/>

                )}

            />
            {/* </View> */}
            {/* <View> */}
            {userData.isThereInputFirstName ?
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                        style = {[{paddingLeft:220, marginTop:-20}]}
                    />
                </Animatable.View>
                : null}

            </View>
            <View>
            { userData.isFirstNameValid ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'red'}}>Fisrt name must not be empty.</Text>
                </Animatable.View>
            }
            </View>
            <View style = {styles.inputTwo}>
            <Controller
                control={control}
                name = "Last name"
                render={({value}) => (
                    <TextInput
                        style = {styles.input}
                        placeholder = "Last name"
                        value={value}
                        onChangeText={(value) => setLastName(value)}
                        onEndEditing={(e) => CheckLastName(e.nativeEvent.text)}/>

                )}

            />
            {/* </View> */}
            {/* <View> */}
            {userData.isThereInputLastName ?
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                        style = {[{paddingLeft:220, marginTop:-20}]}
                    />
                </Animatable.View>
                : null}

            </View>
            <View>
            { userData.isLastNameValid ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'red'}}>Last name must not be empty.</Text>
                </Animatable.View>
            }
            </View>
            <View style = {styles.inputThree}>
            <Controller
                control={control}
                name = "Username"
                render={({value}) => (
                    <TextInput
                        style = {styles.input}
                        placeholder = "Username"
                        value={value}
                        onChangeText={(value) => setUsername(value)}
                        onEndEditing={(e) => CheckUsername(e.nativeEvent.text)}/>

                )}

            />
            <View>
            { userData.isUserNameValid ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'red'}}>Username must not be empty.</Text>
                </Animatable.View>
            }
            </View>
            {/* </View> */}
            {/* <View> */}
            {userData.isThereInputUsername ?
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                        style = {[{paddingLeft:220, marginTop:-20}]}
                    />
                </Animatable.View>
                : null}

            </View>
            <View style = {styles.inputFour}>
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
            {userData.isThereInputEmail ?
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                        style = {[{paddingLeft:220, marginTop:-20}]}
                    />
                </Animatable.View>
                : null}

            </View>
            <View>
            { userData.isEmailValid ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'red'}}>Email must not be empty.</Text>
                </Animatable.View>
            }
            </View>
            <View>
            { !userData.isEmailUsed ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'red'}}>Email already in use.</Text>
                </Animatable.View>
            }
            </View>
            <View style = {styles.inputFive}>
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
                        style = {[{paddingLeft:220, marginTop:-20}]}
                    /> */}


            </View>
            <View>
            { userData.isPasswordValid ? null :
                <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color : 'red'}}>Password must not be empty.</Text>
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
                    // {Console.log(this.prps)}
                    onPress={() =>  onRegisterPressed(userData,this)}>
                    <Text style={styles.CreatAcc}>Register</Text>
                    </TouchableOpacity>
            <View>
                { !userData.errorMessage? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={{color : 'red'}}>Some fields are not valid.</Text>
                    </Animatable.View>
                }
         </View>
            <View/>
            </View>
        </View>



    )
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
        paddingHorizontal:70,
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

    inputThree : {
        flex: 0.1,
        marginTop:  20,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth:2,
        borderRadius:10,

    },
    inputFour : {
        flex: 0.1,
        marginTop:  20,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth:2,
        borderRadius:10,

    },

    inputFive : {
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

    CreatAcc : {
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 13,
        color:'white',

    },



  });

  export default Register;
