import React, { useState, useEffect} from "react";
import {globalInterest, setGlobalIntrest} from "./ModifyProfile"
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";


function PickerInterest(props){
	

	function setMen()
	{
		setGlobalIntrest("Men");
		props.navigation.navigate('ProfileMod'); 

	}
	function setWomen()
	{
		setGlobalIntrest("Women");
		props.navigation.navigate('ProfileMod'); 

	}
	function setEvery()
	{
		setGlobalIntrest("All");
		props.navigation.navigate('ProfileMod'); 
	}
	

	return (
		<View>
		<TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setMen()}> 
                    <Text style={styles.CreatAcc}>Men</Text>
		</TouchableOpacity>
		<TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setWomen()}> 
                    <Text style={styles.CreatAcc}>Women</Text>
		</TouchableOpacity>
		<TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setEvery()}> 
                    <Text style={styles.CreatAcc}>All</Text>
		</TouchableOpacity>
		<StatusBar style = 'auto'/>
		</View>
	)
}

const styles = StyleSheet.create({
	CreatAcc : {
        // textAlign:'center',
        fontWeight: 'bold',
        fontSize: 13,
        color:'grey',
        paddingTop : 10,
        paddingBottom: 12,
		marginLeft : 10,

    },
})
export default PickerInterest;

