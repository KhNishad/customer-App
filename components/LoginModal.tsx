
import { View, Text, StyleSheet, StatusBar,TouchableOpacity, SafeAreaView, TextInput, Button, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { useState } from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';


const deviceWidth = Dimensions.get('window').width

import LoginService from '../services/LoginService';

export default function ModalScreen({setModalOpen,ModalOpen}:any) {

    const [number, setnumber] = useState('')
    const [otpCode, setotpCode] = useState('')
    const [isOtp, setisOtp] = useState(false)
    

    const sendOtp = async ()=>{
        console.log('..........called wihh',number);
        if(number){
            try {
                let res  = await LoginService.loginOtpSend(number)
                console.log('............res',res);
                
            } catch (error) {
                console.log('err in send otp',error);
                
            }
        }else{
            alert('Number Required')
        }
      
      
    }

    
  return (
    <View style={styles.container}>
           <Modal isVisible={ModalOpen} style={{alignItems:'center'}}>
              <View style={{ width:deviceWidth-50,justifyContent:'center',height:270,backgroundColor:'#fff',alignItems:'center',borderRadius:10 }}>
                <Ionicons  onPress={()=>setModalOpen(false)} name='close' color={'red'} size={25}/>
                <View style={{marginTop:10}}>
                    {!isOtp?
                    <TouchableOpacity  style={{paddingVertical:10}}>
                      <Text onPress={()=>setisOtp(true)} style={{fontSize:14,fontWeight:'bold',color:'#6bbaf2'}}>Login with Phone & otp</Text>
                    </TouchableOpacity>
                  :
                    <TouchableOpacity  style={{paddingVertical:10}}>
                      <Text onPress={()=>setisOtp(false)} style={{fontSize:14,fontWeight:'bold',color:'#6bbaf2'}}>Login with Phone & Password</Text>
                    </TouchableOpacity>
                    }
               
                </View>
               
               
                <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setnumber}
                    value={number}
                    multiline={true}
                    placeholder="Enter Your Number"
                />
                {isOtp?
                 <TextInput
                    style={styles.input}
                    onChangeText={setotpCode}
                    value={otpCode}
                    multiline={true}
                    placeholder="Otp"
                />
                :
                  <TextInput
                  style={styles.input}
                  onChangeText={setotpCode}
                  value={otpCode}
                  multiline={true}
                  placeholder="Password"
              />}
                </View>
                <View style={{flexDirection:'row',justifyContent:"space-around",width:deviceWidth/1.5}}>
                  <TouchableOpacity onPress={()=>sendOtp()}  style={{backgroundColor:'#1C6E7A',borderRadius:10}}>
                    <Text style={{color:'#fff',paddingHorizontal:20,paddingVertical:10,fontWeight:'bold'}}>Submit</Text>
                  </TouchableOpacity>
                  {isOtp?
                  <TouchableOpacity  style={{backgroundColor:'#1C6E7A',borderRadius:10}}>
                    <Text style={{color:'#fff',paddingHorizontal:20,paddingVertical:10,fontWeight:'bold'}}>Re-send</Text>
                  </TouchableOpacity>
                  :null}
                </View>
              
              </View>
           </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
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
  
