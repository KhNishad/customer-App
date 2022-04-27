
import { View, Text, StyleSheet, StatusBar,TouchableOpacity, SafeAreaView, TextInput, Button, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Ionicons,MaterialIcons } from '@expo/vector-icons';



const deviceWidth = Dimensions.get('window').width

import LoginService from '../services/LoginService';

export default function ModalScreen({setopenFilter,openFilter,data}:any) {

console.log(".............daata",data);

    
const navigation = useNavigation();


    
  return (
    <View style={styles.container}>
           <Modal isVisible={openFilter} style={{alignItems:'center'}}>
              <View style={{ width:deviceWidth-50,backgroundColor:'#fff',borderRadius:10,height:200 }}>
                  <View style={{alignItems:'flex-end',justifyContent:'flex-end',marginRight:5}}>
                    <Ionicons  onPress={()=>setopenFilter(false)} name='close' color={'red'} size={30}/>
                  </View>
                <View style={{paddingHorizontal:10,alignItems:'center'}}>
                   <MaterialIcons  name='celebration' color={'red'} size={50}/>

                    <Text style={{fontSize:18,color:'green',fontWeight:'bold',marginBottom:5}}>Success</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate('Requisition')}>
                       <Text style={{fontSize:14,color:'blue'}}>Requisition No: {data?.requisitionNo}</Text>
                    </TouchableOpacity>

                </View>
               
              
              </View>
           </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   alignItems: 'center',
      // backgroundColor:'#FF9411',
      // paddingTop:deviceHeight/6
    },
    title: {
      fontSize: 30,
      color: '#fff',
      fontWeight: "normal",
    },
    input: {
      height: 40,
      width: deviceWidth / 1.2,
      margin: 12,
      borderWidth: .5,
      padding: 10,
      borderColor: '#BBE5EB',
      borderRadius: 5,
      backgroundColor: '#fff'
    },
    mainBanner: {
      width: 40,
      height: 40,
      borderWidth: .1,
      borderColor: '#fff',
      borderRadius: 5,
      resizeMode: 'stretch'
    },
    CardContainer: {
      paddingHorizontal: 10,
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // flexWrap: 'wrap',
      justifyContent: 'space-between',
      
    },
    card: {
      width: deviceWidth / 3 - 15,
      height: 180,
      borderWidth: .5,
      borderRadius: 10
  
    },
    icons:{
      alignItems: 'center',
      width: deviceWidth / 6 - 2,
      textAlign:'center' 
  
    },
    ProductSection:{
      display: 'flex',
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      paddingHorizontal: 10, 
      alignItems: 'center' ,
    },
    iconSection:{
      display: 'flex', 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      paddingVertical:10,
      paddingHorizontal:5 
    }
  });
  
