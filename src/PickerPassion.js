import React, { useState, useEffect} from "react";
// import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import {globalGender ,setGlobalGender, setGlobalPassions} from "./ModifyProfile"

function PickerPassion(props){

	
	
    const arr = ["Sports","Fitness","Football","E-sports","Cooking","Surfing","Video games","Fishing","Reading","Swimming","Anime","Manga","Music",
					"Tennis","Movies","Cinema","Cosplay","Marvel","Disney","Youtube","Amongus","Counter strike"]

	return (
		<ScrollView>
		<View>
		{/* <TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setMale()}> 
                    <Text style={styles.CreatAcc}>Sports</Text>
		</TouchableOpacity>
		<TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setFemale()}> 
                    <Text style={styles.CreatAcc}>Fitness</Text>
		</TouchableOpacity>
		<TouchableOpacity style = {[{borderColor: 'grey',
                    borderWidth: 1,
                    marginTop: 15,}]}
                    // {Console.log(this.prps)}
                    onPress={() =>  setOther()}> 
                    <Text style={styles.CreatAcc}>Football</Text>
		</TouchableOpacity> */}
        {arr.map(a=>{
       		return  <TouchableOpacity style = {[{borderColor: 'grey',
						borderWidth: 1,
						marginTop: 15,}]}
						// {Console.log(this.prps)}
						onPress={() =>  setGlobalPassions(a)}
						key={a}> 
						<Text style={styles.CreatAcc}>{a}</Text>
					</TouchableOpacity>
   					   })}
		<StatusBar style = 'auto'/>
		</View>
		</ScrollView>
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
export default PickerPassion;

