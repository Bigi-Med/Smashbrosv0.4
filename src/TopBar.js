import React , {useState} from 'react';

import { StyleSheet,View , Button , Image, TouchableOpacity, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';





  
const url='http://d857-147-210-179-68.ngrok.io';
var count = 0;

// const jsonValue = await AsyncStorage.getItem('token')
// // console.log(JSON.parse(jsonValue).token);
// let token_key = JSON.parse(jsonValue).token

// const response_token = await fetch('http://d3c0-147-210-179-68.ngrok.io/profile/profile-photo?token='+token_key,{

// headers: {"Content-Type": "application/json"}

// })
 function TopBar(props) {
     count = 0;
    const [profileImage , setImage] = useState({
        profileUrl : '',
        imgSet : false,
    })
    async function getProfile() {
        // getting token
        console.log("in get profile")
        
        try{
        const jsonValue = await AsyncStorage.getItem('token')
        // console.log(JSON.parse(jsonValue).token);
        let token_key = JSON.parse(jsonValue).token
    //    cons
        const response_token = await fetch(url + '/profile/profile-photo?token='+token_key,{
        
        headers: {"Content-Type": "application/json"}
        
        })
        const profileLink = await response_token.json();
        // let profileLink = JSON.parse(response_token).link
        // console.log(profileLink);
        console.log(profileLink.link);
        if(response_token.status === 404)
        {
            console.log("in TOP BAR ------------")
            return null;
        }
        
        setImage({
            ...profileImage,
            profileUrl : profileLink.link,
            imgSet : true,
        });
    } catch(e){
        console.log(e);
    }


   
    }
     if(count === 0)
     {
         getProfile();
        count = 1;
     }
    

    const margin=parseInt(props.margin);
   
    
    return (
        <View style={styles.background}>
            <View style={{...styles.Topbar, marginBottom:margin}}>
                
                
               
                 
                
                <Image  style ={styles.logo} source={require("../assets/tinder-logo.png")}></Image>
                {/* <Image  style ={styles.profile} source={require("../assets/buttons/notif.png")}></Image>  */}
                {
                    profileImage.imgSet? 
                    <Image  style ={styles.profile} source={{ uri :profileImage.profileUrl}}></Image>
                    :
                    <Image  style ={styles.profile} source={require("../assets/placeholder.png")}></Image>
                }  
            </View>
        <StatusBar style = "auto"/>
        </View>
    );

}
const styles = StyleSheet.create({
    background:{
        flex:1,
        justifyContent:"flex-end",
        // backgroundColor : "white",

     },  
    Topbar:{
        width:"100%",
        paddingLeft:50,
        // paddingTop:'20%',
        // height:60,
        // backgroundColor:'rgb(230,230,230)',
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        backgroundColor : 'white',
        flex : 1,
        // paddingLeft:'100%',

       
    },
    logo:{
        width:70,
        height:40
    },
    profile:{
        borderRadius:1000,
        width: 50,
        height:50,

    }
})

export default TopBar;
