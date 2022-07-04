import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, Image, View, Platform, ScrollView, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';

const url='http://966b-147-210-179-68.ngrok.io';
var count = 0;
export default function UploadImage(props) {
  count = 0;
    // const [image, setImage] = useState({
    //   images:[],
    //   imagesDefined : [false,false,false,false,false],
    // });
    const [imageUploaded, setImageUploaded] = useState(false);
    const [image, setImage] = useState({
      image1:'',
      image2:'',
      image3:'',
      image4:'',
      image5:'',
      image1Defined:false,
      image2Defined:false,
      image3Defined:false,
      image4Defined:false,
      image5Defined:false,
    });
    
    
    useEffect(()=> console.log(image),[image]);
    function goHome()
    {
      // if(imageUploaded === false)
      // {
      //   Alert.alert(
      //     "",
      //     "Must upload at least one image",
      //     [
      //       {
      //         text: "OK",
      //         style: "OK"
      //       },
            
      //     ]
      //   ) ;
      // }
      // else{
        props.navigation.navigate('HomeScreen');
      // }
    }
    async function getUploadImages() {
      // getting token
      // console.log("in get upload ------------------------------------")
      
      try{
      const jsonValue = await AsyncStorage.getItem('token')
      let token_key = JSON.parse(jsonValue).token
 
      const response_token = await fetch(url+'/profile/images?token='+token_key,{
      
      headers: {"Content-Type": "application/json"}
      
      })
      const imagesLink = await response_token.json();
      // console.log("Upload Image screen : ===============================");
      // console.log(imagesLink);
      if(response_token.response === 404)
      {
        console.log("NO UPLOADED IMAGES");
        return null;
      }
      var tmp_links = ["","","","",""];
      var tmp_defined = [false,false,false,false,false];
      for (let index = 0; index < imagesLink.links.length; index++) {
        // var tmp_links = [];
        const element = imagesLink.links[index];
        // console.log('element is ------------------0 ' + element);
        if(element === null)
        {
          tmp_defined[index] = false;
          tmp_links[index] = "";
          continue;
        }
        else{
          tmp_links[index]  = element;
          tmp_defined[index] = true;
        }
      }
      // console.log("defined --------- "+tmp_defined);
      // console.log("links --------- "+tmp_links);
      setImage({
        image1 : tmp_links[0],
        image2 : tmp_links[1],
        image3 : tmp_links[2],
        image4 : tmp_links[3],
        image5 : tmp_links[4],
        image1Defined : tmp_defined[0],
        image2Defined : tmp_defined[1],
        image3Defined : tmp_defined[2],
        image4Defined : tmp_defined[3],
        image5Defined : tmp_defined[4],

      })
  } catch(e){
      console.log(e);
  }
}
if( count === 0)
{
  getUploadImages();
  count = 1;
}
    async function sendImage(data,index)
    {
      // console.log("sent");
      

      try {
        // console.log("sent");

        const jsonValue = await AsyncStorage.getItem('token')
        // console.log(JSON.parse(jsonValue).token);
        let token_key = JSON.parse(jsonValue).token
        // token_key = JSON.stringify(token_key);
        // console.log("sent after try");
        // console.log(data);
        const response = await fetch('http://966b-147-210-179-68.ngrok.io/profile/upload-image',{
        method: 'POST',
        body: JSON.stringify({
            index:index,
            imageLink: data,
            token:token_key
        }),
        headers: {"Content-Type": "application/json"}
        })
      } catch(e) {
        // error reading value
        console.log(e);
      }
       

    }
    const handleUpload = (image,index)=>{
      const data = new FormData()
      data.append('file',image)
      data.append('upload_preset','SmashBros')
      data.append("cloud_name","Soufyane")

      fetch("https://api.cloudinary.com/v1_1/Soufyane/image/upload",{
          method:"post",
          body:data
      }).then(res=>res.json()).
      then(data=>{
        console.log("API CLOUNDINARY -----------------");
        console.log(data);
        sendImage( data.url,index);
      })
     
 }
  
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async (number) => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      // sendImage(result)
       
  
      if(!result.cancelled){
        let newfile = { 
          uri:result.uri,
          type:`test/${result.uri.split(".")[1]}`,
          name:`test.${result.uri.split(".")[1]}` 

      }
      getUploadImages();
      setImageUploaded(true);

     
        handleUpload(newfile,number)
        // console.log(number=='1');
        if(number=='1')
        setImage({...image,
          image1 :result.uri,
        image1Defined : true,});
          if(number=='2')
        setImage({...image,
          image2 :result.uri,
          image2Defined : true,
        });
          if(number=='3')
        setImage({...image,
          image3 :result.uri,
          image3Defined : true,});
          if(number=='4')
        setImage({...image,
          image4 :result.uri,
          image4Defined : true,});
          if(number=='5')
        setImage({...image,
          image5 :result.uri,
          image5Defined : true,});
    }
    };
  
    return (
      <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {
          image.image1Defined?
          <Image source={{ uri: image.image1 }} style={{ width: 200, height: 300, borderRadius: 10 , marginBottom: '5%'  }} />
            : 
          <Image source={require("../assets/placeholder.png")} style={{ width: 200, height: 300, borderRadius: 10, marginBottom: '5%' }} />
          }
        <TouchableOpacity onPress={() => pickImage('1')} style = {styles.upload}><Text style = {styles.text}>Upload</Text>
        
        </TouchableOpacity>
        {
          image.image2Defined?
          <Image source={{ uri: image.image2 }} style={{ width: 200, height: 300 ,borderRadius: 10 , marginBottom: '5%' }} />
          : <Image source={require("../assets/placeholder.png")} style={{ width: 200, height: 300, borderRadius: 10, marginBottom: '5%' }} />
        }
        <TouchableOpacity onPress={() => pickImage('2')} style = {styles.upload}><Text style = {styles.text}>Upload</Text></TouchableOpacity>
        {
          image.image3Defined?
          <Image source={{ uri: image.image3 }} style={{ width: 200, height: 300, borderRadius: 10, marginBottom: '5%' }} />
          : <Image source={require("../assets/placeholder.png")} style={{ width: 200, height: 300 ,borderRadius: 10, marginBottom: '5%' }} />
        }
        <TouchableOpacity onPress={() => pickImage('3')} style = {styles.upload}><Text style = {styles.text}>Upload</Text></TouchableOpacity>
        {
          image.image4Defined?
          <Image source={{ uri: image.image4 }} style={{ width: 200, height: 300 ,borderRadius: 10, marginBottom: '5%' }} />
          : <Image source={require("../assets/placeholder.png")} style={{ width: 200, height: 300, borderRadius: 10, marginBottom: '5%'}} />
        }
        <TouchableOpacity onPress={() => pickImage('4')} style = {styles.upload}><Text style = {styles.text}>Upload</Text></TouchableOpacity>
       
        {
          image.image5Defined?
          <Image source={{ uri: image.image5 }} style={{ width: 200, height: 300 ,borderRadius: 10, marginBottom: '5%' }} />
          : <Image source={require("../assets/placeholder.png")} style={{ width: 200, height: 300 ,borderRadius: 10, marginBottom: '5%'}} />
        }
        <TouchableOpacity onPress={() => pickImage('5')} style = {styles.upload}><Text style = {styles.text}>Upload</Text></TouchableOpacity>
  
        <TouchableOpacity style = {[styles.button, {borderColor: '#FD3A73',
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 15,
                marginLeft : '1%',
                marginBottom: 10,
                backgroundColor : '#FD3A73',
                }]} 
                onPress={() => goHome()}
                >
                <Text style={styles.CreatAcc}>Save changes</Text>
            </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    upload: {
      borderColor: '#FD3A73',
        borderRadius: 10,
        backgroundColor : '#FD3A73',
        paddingHorizontal:'5%',
        paddingVertical:'1%',
        marginTop : '0.1%',
        marginRight:'0.1%',
        marginBottom:'2%',
    },
    text : {
     color : 'white', 
     fontSize:15, 
     fontWeight:'bold',
    },
    button : {
      width : '80%',
  },
  CreatAcc : {
    textAlign:'center',
    fontWeight: 'bold',
    fontSize: 13,
    color:'white',
    paddingTop : 10,
    paddingBottom: 12,

},
  })