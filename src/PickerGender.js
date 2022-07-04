import React, { useState, useEffect} from "react";
// import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";
import {globalGender ,setGlobalGender} from "./ModifyProfile"

function PickerGender(props){
	function setMale()
	{
		setGlobalGender("Male");
		props.navigation.navigate('ProfileMod'); 

	}
	function setFemale()
	{
		setGlobalGender("Female");
		props.navigation.navigate('ProfileMod'); 

	}
	function setOther()
	{
		setGlobalGender("Other");
		props.navigation.navigate('ProfileMod'); 
	}
	

	return (
		<View>
		<TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setMale()}> 
                    <Text style={styles.CreatAcc}>Male</Text>
		</TouchableOpacity>
		<TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setFemale()}> 
                    <Text style={styles.CreatAcc}>Female</Text>
		</TouchableOpacity>
		<TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setOther()}> 
                    <Text style={styles.CreatAcc}>Other</Text>
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
export default PickerGender;

