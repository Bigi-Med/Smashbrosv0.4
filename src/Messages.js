import React, {useState}from 'react';
import { StyleSheet,View ,Dimensions ,Button, SafeAreaView, TouchableOpacity, Text,FlatList,StatusBar, ScrollView } from 'react-native';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';


const DATA = [
    {
      id: "1",
      title: "Simo",
      link : "data:image/jpeg;base64,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",
    },
    {
      id: "2",
      title: "Hassan",
      link: "data:image/jpeg;base64,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",
    },
    {
      id: "3",
      title: "Sfyan",
      link:'../assests/profile.jpg',
    },
    {
        id: "4",
        title:"Taha",
        link:'../assests/profile.jpg',
    },
    {
        id: "5",
        title:"Taha",
        link:'../assests/profile.jpg',
    },
    {
        id: "6",
        title:"Taha",
        link:'../assests/profile.jpg',
    }
  ];
  
async function getMatches()
{
  try{

    const jsonValue = await AsyncStorage.getItem('token')
    let token_key = JSON.parse(jsonValue).token
    // getting token
    const response = await fetch(url +'/matches', {
      method: 'POST',
      body: JSON.stringify({
        token: token_key,
      }),
      headers: {"Content-Type": "application/json"}
      
    })
    
    const matchesList = await response.json();
    console.log("in CHAT screen------------------")
    console.log(matchesList);
    for (let index = 0; index < matchesList.length; index++) {
      const element = matchesList[index];
      DATA.push(element);
    }
  }catch(e)
  {
    console.log(e);
  }
}

  const Item = ({ item, onPress, backgroundColor, textColor, navigation }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Image  style ={styles.profile} source={{uri:item.link}}></Image>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );
  
  var globalRoomNumber;
  function Messages(props)  {
    const [selectedId, setSelectedId] = useState(null);

    async function getRoom(uuid)
    {
      console.log("in messages ----------- " + uuid)
      const response = await fetch("http://d857-147-210-179-68.ngrok.io/test",{
         
         method: 'POST',
         body: JSON.stringify({
             userName: uuid,
         }),
       headers: {"Content-Type": "application/json"}
       
       })

       const roomNumber = await response.json()
       console.log("in messages : ++++");
       console.log(roomNumber);
       globalRoomNumber = roomNumber;

       props.navigation.navigate('ConversationScreen')

    }

  
    const renderItem = ({ item }) => {
      const backgroundColor = "white";
      const color = '#FD3A73';
    //   const 
  
      return (
        <Item
          item={item}
          onPress={() => getRoom(item)}
        //   backgroundColor={{ backgroundColor }}
          textColor={{ color }}
          
          
        />
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius : 10,
      borderBottomWidth: 1,
      borderBottomLeftRadius:1,
      borderBottomRightRadius:1,

    },
    title: {
      fontSize: 20,
      fontWeight:'bold',
    },
    profile:{
        borderRadius:1000,
        width: 60,
        height:60
    }
  });
  
  export default Messages;
  export {globalRoomNumber};