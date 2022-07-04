
import React, { useEffect, useState} from "react";

import {ImageBackground, StyleSheet, Image,Text,Dimensions, View, TextInput, Button, TouchableOpacity, ScrollView} from 'react-native';
import io from "socket.io-client";
import { globalRoomNumber } from "./Messages";

const socket_global = io.connect("http://d698-147-210-204-186.ngrok.ioqsdqsd");

function Conversation(props) {
    // { socket, username, room }
    const socket = socket_global;
    const username= "sasqs";
    const room= globalRoomNumber;
 const [currentMessage, setCurrentMessage] = useState("");
 const [messageList, setMessageList] = useState([]);
//  const [showChat, setShowChat] = useState(false);

 const joinRoom = () => {
  if (username !== "" && room !== "") {
    socket.emit("join_room", room);
    // setShowChat(true);
  }
};
joinRoom();
 const sendMessage = async () => {
   if (currentMessage !== "") {
     const messageData = {
       room: room,
       author: username,
       message: currentMessage,
       time:
         new Date(Date.now()).getHours() +
         ":" +
         new Date(Date.now()).getMinutes(),
     };

     await socket.emit("send_message", messageData);
     setMessageList((list) => [...list, messageData]);
     setCurrentMessage("");
   }
 };

 useEffect(() => {
   socket.on("receive_message", (data) => {
     setMessageList((list) => [...list, data]);
   });
 }, [socket]);

 return (
   
   <View  style={styles.container}> 
       <ImageBackground source={require("../assets/chat.jpeg")} resizeMode="cover" style={styles.image}>
     
     <ScrollView>
     <View style={styles.container}>
         {messageList.map((messageContent, index) => {
           return (
            
             <View

               id={username === messageContent.author ? "you" : "other"}
               style = {{marginTop:'6%', marginBottom:'3%'}}
               key={index}
             >
               <View style = {styles.msgcontainer}>
                 <View style = {{marginBottom:'0%'}}>
                   <Text style = {styles.msg}>{messageContent.author + ': '}</Text>
                 </View>
                 <View>
                   <View style = {styles.msginner}>
                   <Text style = {styles.msg}>{messageContent.message}</Text>
                   </View>
                   </View>
                   
                </View>
                 <View>

                   <Text style = {[{marginLeft:'90%' , color:'black', fontWeight:'bold'}]}>{messageContent.time}</Text>
                 </View>
               
             </View>
            
             
           );
         })}
     </View>
     </ScrollView>
     </ImageBackground>
     <View style = {styles.inputcontainer}>
     
     <TextInput
         value={currentMessage}
         style = {styles.inputFive}
         placeholder="Hey..."
         onChangeText={(text)=>setCurrentMessage(text)}

         onKeyPress={(event) => {
           event.key === "Enter" && sendMessage();
         }}
      />
       <TouchableOpacity
      //  style = {[styles.button, {borderColor: '#92057b',
      //  borderWidth: 1,
      //  marginTop: 15,}]}
       onPress={sendMessage}>
           <Text style={styles.CreatAcc}>Send</Text>

       </TouchableOpacity>
       
     </View>
    </View> 
 );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      // backgroundColor: '#424242',
      // alignItems: 'center',
      // justifyContent: 'center',
      marginBottom:'1%',
    },
    // msgcontainer : {
    //   marginRight: -500,

    // },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    msgcontainer :{
      flexDirection : 'row',
      justifyContent : 'flex-start',
      backgroundColor : '#f8bdc6',
      paddingVertical:'3%',
      paddingLeft:'3%',
      borderTopLeftRadius : 25,
      borderBottomLeftRadius : 10,
      borderTopRightRadius:25,
      borderBottomRightRadius:25,
      marginLeft:'3%',
      paddingRight : '13%',
      marginTop: '4%',
    },
    msg : {
      flex: 1,
      color : 'white',
      flexWrap: 'wrap',
      fontWeight : 'bold',
      fontSize : 15,
    },
    inputFive : {
         // flex: 0.2,
        //  marginTop:  '50%',
        paddingLeft: '1%',
         color: '#05375a',
         borderWidth:2,
         borderRadius:10,
         // paddingLeft : Dimensions.get('screen').width/2,
         paddingRight : Dimensions.get('screen').width/2,
        
      
      

  },
  button :{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // paddingHorizontal:100,
    // marginLeft:15,
    backgroundColor : '#92057b',
},
CreatAcc : {
  textAlign:'center',
  fontWeight: 'bold',
  fontSize: 13,
  color:'black',

},
inputcontainer:{
  // flex : 1,
  // justifyContent : 'flex-start'
}
  
  });
export default Conversation;
