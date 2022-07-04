import Home from './Home'
import Chat from './Chat';
import Messages from './Messages';
import DummyScreen from './DummyScreen';
import Navigation from './Navigation'
import BottomBar from './BottomBar'
import PickerPassion from './PickerPassion'
import TopBar from './TopBar';

import Signin  from "./Signin";
import Register from "./Register"
import ModifyProfile from "./ModifyProfile"
import PickerGender from "./PickerGender"
import Conversation from './Conversation';
import PickerInterest from "./PickerInterest"
 import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { redirect, getRedirect } from './redirectionVar';
import { useEffect } from 'react';

// var redirect;
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('token')
    if(!jsonValue)
    {
      console.log("no token");
      return null; //if there is no token, no need to do further treatment
    }
    data = JSON.parse(jsonValue).token
    // data = JSON.stringify(data);
    console.log('printing token---------------------------------------');
    console.log(data)
    const response = await fetch('http://ed1e-147-210-179-68.ngrok.io/auth',{
        method: 'POST',
        body: JSON.stringify({
            token: data
        }),
        headers: {"Content-Type": "application/json"}
        })
        var data = await response.json();
        // var status = await response.status();
        // console.log(data);
        console.log("---------------------------------------------IN APP.JS");
        console.log(response.status);
        if(response.status === 200)
        {
          console.log("in navigate")
          // redirect = true;  
            getRedirect(true);
          // props.navigation.navigate('HomeScreen');
            // storeData(data);

        }
        else{
          // redirect = false;
          getRedirect(false)
            

          // props.navigation.navigate('SigninScreen');
        }
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}
getData();

import react from 'react';
import UploadImage from './UploadImage';
console.log("redierct --------- " + redirect)


const RootStack = createStackNavigator(
  {
    // DummyScreen: DummyScreen,
    SigninScreen: Signin,
    HomeScreen: Home,
    RegisterScreen: Register,
    ProfileMod: ModifyProfile,
    PickGender: PickerGender,
    PickInterest: PickerInterest,
    ChatScreen: Chat,
    UploadImageScreen: UploadImage,
    MsgScreen : Messages,
    PickPassion : PickerPassion,
    ConversationScreen : Conversation,
    
},{
defaultNavigationOptions: {
  headerShown: null,
}}
,
{
  initialRouteParams:'RegisterScreen',
  // initialRouteParams: getIn === 'OK' ? 'HomeScreen':'RegisterScreen'
}
);

console.log("------------ redirect + " + redirect);


const AppContainer = createAppContainer(RootStack);


// console.log(AppContainer.navigationOptions )
function App(){
  // getData();
  

  return (
    
    <AppContainer/>
    
    );
  
}
export default App;
export {redirect};

