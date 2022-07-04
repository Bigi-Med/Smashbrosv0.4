import React from 'react';
import Home from './Home'
import Chat from './Chat'
import { StyleSheet,View , Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import News from './News';
import Likes from './Likes';
import ModifyProfile from './ModifyProfile';

const Tab = createBottomTabNavigator();

const BottomBar = () =>{
    return (
        
        <Tab.Navigator
            screenOptions={{headerShown:false}}
        >
            
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Settings" component={ModifyProfile}/>
            <Tab.Screen name="Likes" component={Likes}/>
            <Tab.Screen name="Chat" component={Chat}/>

        </Tab.Navigator>
    )
}

































// function BottomBar(props) {
//     return (
//             <View style={styles.BottomBar} >
//                 <Button title="Home"></Button>
//                 <Button title="News"></Button>
//                 <Button title="Like"></Button>
//                 <Button title="Chat"></Button>
//              </View>
            
        
//     );

// }

const styles = StyleSheet.create({
    BottomBar:{
        width:"100%",
        height:60,
        backgroundColor:"white",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"

    }
})

export default BottomBar;
