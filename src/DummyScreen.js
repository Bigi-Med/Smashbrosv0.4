import React from 'react';
import { StyleSheet,View ,Text,Dimensions ,Button, TouchableOpacity } from 'react-native';
import {redirect} from "./redirectionVar"
function DummyScreen(props)
{
    console.log("in dummy screen");
    if(redirect === false)
    {
        props.navigation.navigate('HomeScreen');
    }
    else{
        props.navigation.navigate('SigninScreen');
    }
    // props.navigation.navigate(redirect === false ? 'HomeScreen' : 'SigninScreen')
    return null;
}

export default DummyScreen;