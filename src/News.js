import React from 'react';
import { StyleSheet,View ,Text } from 'react-native';

import TopBar from './TopBar';

function News(props) {
    return(
    <View style={styles.container}>
        <TopBar  margin="0"/>
        <View style={styles.app}>
          <Text>News  Screen</Text>
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
    app:{
      flex:7, width:"98%", marginBottom:10,  justifyContent:"flex-end",
      alignItems:"baseline",  paddingBottom:10 
    },
    actions:{
      width:"100%",
      height:60,
      flexDirection:"row",
      justifyContent:"space-around",
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
export default News;