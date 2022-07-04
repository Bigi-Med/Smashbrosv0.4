import React ,{useState, useEffect}from 'react';
import { StyleSheet,View ,Text,Dimensions ,Button, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import SwipeableCard from './SwipeableCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import BottomBar from './BottomBar';
import TopBar from './TopBar';
var count=0;
const colors = {
  red: '#EC2379',
  blue: '#0070FF',
  gray: '#777777',
  white: '#ffffff',
  black: '#000000'
};


const swiperRef = React.createRef();
const Card = ({card})=>(
      <View>
        
           <SwipeableCard data= {card.uri} swiperRef={swiperRef} />
            
        <View style={{position: 'absolute' , top:"70%"}}>
          <View style={styles.informations}>
            <View style={{flexDirection: 'row',marginBottom: 20, marginLeft:20}}>
              <Text style={styles.Name}>{card.firstName} </Text>
              <Text style={styles.Age}>{card.Age} </Text>
          </View>
            <Text style={styles.description }> {card? card.description:null} </Text>
            <Text style={styles.passions}> {card? card.passions:null}</Text>
          </View>
          <View style={styles.actions}>
              {/* <Image  style ={styles.Icon1} source={require("../assets/buttons/relike.png")}></Image> */}
              <TouchableOpacity style={styles.button} onPress={()=>{swiperRef.current.swipeLeft()}}>
              <Image  style ={styles.Icon2} source={require("../assets/buttons/dislike.png")}></Image>
              </TouchableOpacity>
              
              {/* <Image  style ={styles.Icon1} source={require("../assets/buttons/superlike.png")}></Image> */}
              <TouchableOpacity style={styles.button} onPress={()=>{swiperRef.current.swipeRight()}}>
              <Image  style ={styles.Icon2} source={require("../assets/buttons/like.png")}></Image> 
              </TouchableOpacity>
              
              
              {/* <Image  style ={styles.Icon1} source={require("../assets/buttons/ultralike.png")}></Image>  */}
          </View> 
          </View>
          </View>       
)

function Home(props) {
 
  const [index,setIndex] = React.useState(0);
  const [Users,setUsers] = useState([])
  const [isFull,setisFull]=useState(false);
  const [isMatch, setisMatch]=useState(false);
  const [matchindex, setmatchindex]=useState(0);
  // useEffect( ( )=> console.log("Use effect :"+Users),[Users]);
  async function sendLike(cardIndex,state){
   
    // console.log("hello");
    // try {
      console.log("send like"+cardIndex);
      const jsonValue = await AsyncStorage.getItem('token')
      // console.log(JSON.parse(jsonValue).token);
      let token_key = JSON.parse(jsonValue).token
    //  useEffect(()=>{
      // console.log("send like");
       const response = await fetch('http://966b-147-210-179-68.ngrok.io/home/likes',{
         
         method: 'POST',
         body: JSON.stringify({
             token: token_key,
              id:Users[cardIndex].id,
              state:state
         }),
       headers: {"Content-Type": "application/json"}
       
       })
       console.log("send like");
        const data = await response.json();
    
       if(data.match){
           setisMatch(true);
           console.log("its a match");
           setTimeout(() => {
             setmatchindex(cardIndex);
             console.log(Users[matchindex].uri[0].uri);
            setisMatch(false);
        }, 2000);
     
       }
    
  }
  async function getImages() {

    try {

      const jsonValue = await AsyncStorage.getItem('token')
      let token_key = JSON.parse(jsonValue).token
     
      const response = await fetch('http://966b-147-210-179-68.ngrok.io/home?token='+token_key,{
      
      headers: {"Content-Type": "application/json"}
      
      })
      const data = await response.json();
      var users=new Array;
      
      setisFull(false);
      // if(data.received.length === 0)
      // {
      //   setNoUsers(false);
      // }
     
      for (var index = 0; index < data.received.length; index++) {

        var user={id:'',firstName:'',Age:'',uri:[],description:'',passions:'Passions: '}
        user.id = data.received[index].uid;
        user.firstName=data.received[index].firstName;
        user.Age=data.received[index].age;
        user.description=data.received[index].description;
        for (var index_images = 0; index_images < data.received[index].imageLinks.length; index_images++) {
          var element='';
          element = data.received[index].imageLinks[index_images];
          if(element!=null)
            user.uri.push({uri:element});
        }
        for (let index_passions = 0;  index_passions < data.received[index].passions.length;  index_passions++) {
          let element='';
          element = data.received[index].passions[ index_passions];
          user.passions=user.passions+element+",";
        //  console.log("element:"+element);   
        }
        users.push(user);
       
        
      }
       setUsers(
         users
       )
       setisFull(true);
       
    } catch(e) {
      console.log(e);
    }
        
  }
  if(count==0){
     getImages();
    count=1;
    }
  const onSwiped= ()=>{
    setIndex(index+1);
  }  
  return(
    <View style={styles.container}>
    {
           isMatch?
           <View>
              {/* <Image style ={[{color:"rgb(230,0,0)", marginTop:'50%', zIndex:6}]} source={"https://res.cloudinary.com/soufyane/image/upload/v1651781729/gy7niy77zwfpscvjrykf.jpg"} ></Image> */}
              <Text style={[{color:"rgb(230,0,0)", marginTop:'50%', zIndex:5, fontSize:40,fontWeight:'bold'}]}>its a match</Text>
           </View>
           
           :null
        }
        {
          isFull? 
        
        <Swiper
          ref={swiperRef}
        backgroundColor={"rgb(230,230,230)"}
        useViewOverflow={false}
        cards={Users}
        cardIndex={index}
        marginTop={30}
        marginBottom={-20}
     
        // infinite={true}
        renderCard={(card)=> < Card card={card}/>}
       onSwiper={onSwiped}
       stackSize={1}
      //  stackScale={10}
      //  stackSeparation={14}
      onSwipedAll={()=>getImages()}
      disableTopSwipe
      disableBottomSwipe
      onSwipedLeft= {(cardIndex) => {sendLike(cardIndex,false)}}
      onSwipedRight= {(cardIndex) => {sendLike(cardIndex,true)}}
      overlayLabels={{
        left: {
          title: 'NOPE',
          style: {
            label: {
              backgroundColor: colors.red,
              borderColor: colors.red,
              color: colors.white,
              borderWidth: 1,
              fontSize: 24
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              marginTop: 20,
              marginLeft: -20
            }
          }
        },
        right: {
        
          title: 'LIKE',
          style: {
            label: {
              backgroundColor:"rgb(0,200,100)" ,
              borderColor: "rgb(0,200,0)",
              color: colors.white,
              borderWidth: 1,
              fontSize: 24
            },
            wrapper: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginTop: 20,
              marginLeft: 20
            }
          }
        }
      }}
       />
       :null
    }
    
       <TopBar margin="670%"/>
         
        
        
        {/* <BottomBar style={{flex:1}}/> */}
        
        <View style = {{width:"100%", paddingBottom:5,paddingTop:3,flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center", backgroundColor:"rgb(255,255,255)" }}>
        <TouchableOpacity
        onPress={()=>{count=0;
          props.navigation.navigate('ProfileMod')}}>
           <Image style={styles.bar} source={require("../assets/buttons/profile.png")}></Image>
          {/* <Image ></Image> */}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{count=0;props.navigation.navigate('MsgScreen')}}>
          <Image style={styles.bar} source={require("../assets/buttons/matches.png")}></Image>
         
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{count=0;props.navigation.navigate('UploadImageScreen')}}>
           <Image style={ {width: 40, height:37}} source={require("../assets/buttons/upload.png")}></Image>
        </TouchableOpacity>
        </View>
    </View>
   );
}
const styles = StyleSheet.create({
    container: {
      width:"100%", 
      height:"100%",
      flexDirection:'column',
  
       backgroundColor: 'rgb(230,230,230)',
       alignItems: 'center',
    },
    bar:{
      width: 40,
      height:40,
    },
    passions: {
      color:"white",
      fontWeight:"bold", 
      fontSize:15,
      marginLeft:20
    },
    informations:{
      paddingBottom:"1%"
    },
    description:{
      color:"white",
      fontSize:20,
      marginTop:-20,
      marginLeft:20,
      
    },
    app:{
      flex:8, 
      width:"100%", 
      marginBottom:10,  
      justifyContent:"flex-end",
      alignItems:"center", 
      paddingBottom:10,
      marginBottom:30,
      paddingLeft:10,
      marginTop:-20,
    },
    match:{
      color:"rgb(230,0,0)", marginTop:'50%', zIndex:5,
      fontSize:40,fontWeight:"bold"
    },
    Name:{
      color:"white",
      fontWeight:"bold", 
      fontSize:28
    },
    Age:{
      color:"white",
      fontSize:28
    },
    actions:{
      width:"100%",
      height:60,
      flexDirection:"row",
      justifyContent:"space-evenly",//space-around (if we have 4)
      alignItems:"center"
    },
    Icon1:{
      borderRadius:1000,
      marginLeft:-10,
      width: 50,
      height:50,
      
    },
    Icon2:{
      borderRadius:1000,
      width: 80,
      height:80,
    
    }
  });
export default Home;