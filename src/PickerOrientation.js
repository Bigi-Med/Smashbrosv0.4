import React, { useState, useEffect} from "react";

import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from "react-native";
var orientation = ""

function PickerOrientation(props){
	

	function setHetero()
	{
		orientation = "Hetero";
		props.navigation.navigate('ProfileMod'); 

	}
	function setGay()
	{
		interest = "Gay";
		props.navigation.navigate('ProfileMod'); 

	}
	function setLesbian()
	{
		interest = "Lesbian";
		props.navigation.navigate('ProfileMod'); 
	}
    function setBi()
	{
		interest = "Bisexual";
		props.navigation.navigate('ProfileMod'); 
	}
    function setAs()
	{
		interest = "Asexual";
		props.navigation.navigate('ProfileMod'); 
	}
    function setPan()
	{
		interest = "Pansexual";
		props.navigation.navigate('ProfileMod'); 
	}
    function setQueer()
	{
		interest = "Queer";
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
export {interest};
