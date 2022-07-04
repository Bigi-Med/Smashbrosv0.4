

import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';
import io from "socket.io-client";
import Conversation from "./Conversation";

const socket = io.connect("http://d698-147-210-204qsdqsdsqdsq-186.ngrok.io");

export default function Chat(){
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <View style={styles.container}>
      {!showChat ? (
        <View className="joinChatContainer">
          <Text>Join A Chat</Text>
       <TextInput
       onChangeText={(text)=>setUsername(text)}
       />
       <TextInput
       onChangeText={(text)=>setRoom(text)}
       />


      <Button title='Submit' onPress={joinRoom}/>

        </View>
      ) :
      (
        <Conversation socket={socket} username={username} room={room} />
      )}
</View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
