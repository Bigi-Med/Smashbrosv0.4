import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Button, TextInput, StatusBar, Text, TouchableOpacity,ScrollView, Alert} from 'react-native'
import {useForm, Controller} from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage';


var mytoken=''
var globalGender=''
var globalInterest=''
var globalPassions = []

function setGlobalGender(value)
{
    globalGender = value;
}

function setGlobalIntrest(value)
{
    globalInterest = value;
}

function setGlobalPassions(value)
{
    if(globalPassions.length < 5)
    {
        globalPassions.push(value);
    }
    else{
        Alert.alert(
            "",
            "Cannot add more than five passions",
            [
              {
                text: "OK",
                style: "OK"
              },
              
            ]
          );
    }
}


function ModifyProfile(props) {
    const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('token')
    //   console.log('s');
      
    //   console.log(jsonValue);
      mytoken = JSON.parse(jsonValue).token
    //   console.log('s');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
    }
    
    getData();
    
    const [profileData, setProfile] = useState({
        description:'',
        // gender:'',
        // passions:'',
        age:'',
        firstName:'',
        lastName:'',
        // interest:'',
        orientation:'',    
    });

    const {control} = useForm({
        defaultValues: {
            'description':'',
            'passions':'',
            'age':'',
            'firstName':'',
            'fastName':'',
            'interest':'',
            'orientation':'',    
        }               
        }) //hook for form
        
        const SetDescription = (data) => {
            if(data!="")
            {
                
            setProfile({
                    ...profileData,
                    description : data,
                    
                });
                
            }
            if(data=="")
            {
                
            setProfile({
                    ...profileData,
                    description: data,

                });
                
            }
            
        }
        const SetGender = () => {
          props.navigation.navigate('PickGender'); 
        }

        const SetPassions = () => {
            props.navigation.navigate('PickPassion'); 
          }

        const SetAge = (data) => {
            if(data!="")
            {
                
            setProfile({
                    ...profileData,
                    age : data,
                    
                });
                
            }
            if(data=="")
            {
                
            setProfile({
                    ...profileData,
                    age: data,

                });
                
            }
            
        }
   
        const SetFirstName = (data) => {
            if(data!="")
            {
                
            setProfile({
                    ...profileData,
                    firstName : data,
                    
                });
                
            }
            if(data=="")
            {
                
            setProfile({
                    ...profileData,
                    firstName: data,

                });
                
            }
            
        }
        const SetLastName = (data) => {
            if(data!="")
            {
                
            setProfile({
                    ...profileData,
                    lastName : data,
                    
                });
                
            }
            if(data=="")
            {
                
            setProfile({
                    ...profileData,
                    lastName: data,

                });
                
            }
            
        }
        const SetInterest = (data) => {
            props.navigation.navigate('PickInterest'); 
        }
        const SetOrientation = (data) => {
            if(data!="")
            {
                
            setProfile({
                    ...profileData,
                    orientation : data,
                    
                });
                
            }
            if(data=="")
            {
                
            setProfile({
                    ...profileData,
                    orientation: data,

                });
                
            }
            
        }
        async function modifyProfile(data) 
    {
        
        
            console.log("button pressed");
            data.token = mytoken;
            data.gender = globalGender;
            data.interest = globalInterest;
            data.passions = globalPassions
            console.log("mod profile ---------------------")
            console.log(data);
            
            const response = await fetch('http://966b-147-210-179-68.ngrok.io/profile',{
            method: 'POST',
            body: JSON.stringify({
            profileData: data
                }),
                headers: {"Content-Type": "application/json"}
                })
                // var data = await response.json();
                // var status = await response.status();
                // console.log(data);
                console.log(response.status);

            props.navigation.navigate('Homescreen');

                

            
    };

    
    
    return (
        <ScrollView>
        <View style = {styles.container}>
            <View style = {styles.input_title}>
                <Text style = {styles.input_title_two}>Description</Text>
            </View>
            <Controller 
                control={control}
                name = "description"
                render={({value}) => (
                    <TextInput 
                        style = {styles.input}
                        placeholder = "Description"
                        value={value}
                        onChangeText={(value) => SetDescription(value)}
                        // onEndEditing={(e) => CheckFirstName(e.nativeEvent.text)}
                        />

                )}        
                        
            />
            <View >
            {/* <Dots length={10}/> */}
                <Text style = {styles.input_title_two}>Gender</Text>
            </View>
            <TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  SetGender()}> 
                    <Text style={styles.Pickers}>{globalGender ? globalGender : `Select Gender`}</Text>
		</TouchableOpacity>
            <View >
                <Text style = {styles.input_title_two}>Age</Text>
            </View>
            <Controller 
                control={control}
                name = "age"
                render={({value}) => (
                    <TextInput 
                        style = {styles.input}
                        placeholder = "Age"
                        value={value}
                        keyboardType='numeric'
                        onChangeText={(value) => SetAge(value)}
                        // onEndEditing={(e) => CheckFirstName(e.nativeEvent.text)}
                        />

                )}        
                        
            />

            <View >
                <Text style = {styles.input_title_two}>Passions</Text>
            </View>
            <TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  SetPassions()}> 
                    <Text style={styles.Pickers}>Passions</Text>
		</TouchableOpacity>
          

            <View >
                <Text style = {styles.input_title_two}>FirstName</Text>
            </View>
            <Controller 
                control={control}
                name = "firstName"
                render={({value}) => (
                    <TextInput 
                        style = {styles.input}
                        placeholder = "FirstName"
                        value={value}
                        onChangeText={(value) => SetFirstName(value)}
                        // onEndEditing={(e) => CheckFirstName(e.nativeEvent.text)}
                        />

                )}        
                        
            />
            <View >
                <Text style = {styles.input_title_two}>LastName</Text>
            </View>
            <Controller 
                control={control}
                name = "lastName"
                render={({value}) => (
                    <TextInput 
                        style = {styles.input}
                        placeholder = "LastName"
                        value={value}
                        onChangeText={(value) => SetLastName(value)}
                        // onEndEditing={(e) => CheckFirstName(e.nativeEvent.text)}
                        />

                )}        
                        
            />
            <View >
                <Text style = {styles.input_title_two}>Interest</Text>
            </View>
            <TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  SetInterest()}> 
                    <Text style={styles.Pickers}>{globalInterest ? globalInterest : `Select Interest`}</Text>
		</TouchableOpacity>
            <View >
                <Text style = {styles.input_title_two} >Orientation</Text>
            </View>
            <Controller 
                control={control}
                name = "orientation"
                render={({value}) => (
                    <TextInput 
                        style = {styles.input}
                        placeholder = "Orientation"
                        value={value}
                        onChangeText={(value) => SetOrientation(value)}
                        // onEndEditing={(e) => CheckFirstName(e.nativeEvent.text)}
                        />

                )}        
                        
            />
            <TouchableOpacity style = {[styles.button, {borderColor: '#FD3A73',
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 15,
                marginLeft : 40,
                marginBottom: 10,
                backgroundColor : '#FD3A73',
                }]} 
                onPress={() => modifyProfile(profileData)}
                >
                <Text style={styles.CreatAcc}>Save changes</Text>
            </TouchableOpacity>



        </View>
        <StatusBar style = 'auto'/>
        </ScrollView>
            
        
    );
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        backgroundColor: '#e7ecec',
        // justifyContent:"center",
        // alignItems:'center'
    },

    input_title:{
        marginTop : '1%',
        marginLeft: 0,

    },
    input_title_two:{
        color : '#686c6c',
        fontWeight: 'bold',
        fontFamily : 'monospace',
        fontSize: 15,
        marginTop: 20,
        marginLeft: 15,
    },
    input:{
        // flex: 0.,
        marginTop:  10,
        paddingLeft: 10,
        color: 'black',
        // borderBottomWidth:2,
        borderRadius:0,
        paddingVertical: 10,
        backgroundColor : 'white'
    },
    CreatAcc : {
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 13,
        color:'white',
        paddingTop : 10,
        paddingBottom: 12,

    },
    button : {
        width : '80%',
    },
    Pickers : {
        // textAlign:'center',
        // fontWeight: 'bold',
        fontSize: 13,
        color:'#909595',
        paddingTop : 10,
        paddingBottom: 12,
		paddingLeft : 11,
        backgroundColor : 'white'


    },
    
})

export default ModifyProfile;
export {globalGender, setGlobalGender};
export {globalInterest,setGlobalIntrest};
export {globalPassions, setGlobalPassions}