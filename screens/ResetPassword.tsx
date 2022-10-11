import { useNavigation } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { TouchableOpacity } from 'react-native-gesture-handler';



// service

import LoginService from '../services/LoginService';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export default function TabTwoScreen() {

    const navigation = useNavigation<any>();


    const [email, setemail] = useState('')
    const [passWord, setpassWord] = useState('')
    const [loading, setloading] = useState(false)
    const [isOtpLogin, setIsOtpLogin] = useState(false)
    const [isSubmitForOtp, setIsSubmitForOtp] = useState(false)
    const [otpCode, setOtpCode] = useState('')
    const [isOtp, setisOtp] = useState(false)
    const [confirmPassword, setconfirmPassword] = useState('')



    

    const submitEmailForOtp = async ()=>{
      
      setloading(true)
      if (email){
        
  
        try {
          let res = await LoginService.loginOtpSend(email)
          
          if(res){
            showMessage({
              message: `${res.message}`,
              type: 'success',
            });
           setisOtp(true)
           setloading(false)
          }
        } catch (error) {
            console.log('.....',error);
            
          showMessage({
            message: `${error.message}`,
            type: 'warning',
          });
          setloading(false)
        }
      } else{
        showMessage({
          message: `Please Enter phone number`,
          type: 'warning',
        });
        setloading(false)
      }
      
    }

 

    const loginWithPass = async () =>{
      
       setloading(true)
       if(passWord == confirmPassword){
        const data = {
            phone: email,
            newPassword: passWord,
            otpCode: Number(otpCode)
         }

        if(passWord.length >= 6){
          try {
            let res = await LoginService.resetPassword(data)
            
   
            if(res){
              showMessage({
                 message: `${res.message}`,
                 type: 'success',
               });
               
               setloading(false)
               setisOtp(false)
               setemail('')
               setpassWord('')
               setOtpCode('')
               
               navigation.navigate('Home')
  
            }
          } catch (error:any) {
            showMessage({
             message: `${error.message}`,
             type: 'warning',
           });
           setloading(false)
            
          }
        }else{
          showMessage({
            message: `Password Should Be Minimum 6 Characters!`,
            type: 'warning',
          });
          setloading(false)
        }
       }else{
        showMessage({
          message: `Password didn't match!`,
          type: 'warning',
        });
        setloading(false)
       }
       

    }


  return (
    <View style={styles.container}>
        <StatusBar backgroundColor={`#FF9411`}/>
        <SafeAreaView>
   
            <View style={{borderTopColor:'#fff',alignItems:'center',marginBottom:50}}>

                <Text style={[styles.title,{color:'#000',fontSize:25}]}>Reset Your Password</Text>
                {/* <Text style={[styles.title,{color:'#1239'}]}>Login to Your Account</Text> */}

            </View>

            <View >

                
              
                <TextInput
                  style={styles.input}
                  onChangeText={setemail}
                  value={email}
                  placeholder={"Phone "}
                />

                
                 {!isOtp ?
                 null
                
                :
                <View>
                <TextInput
                style={styles.input}
                onChangeText={setOtpCode}
                value={otpCode}
                placeholder={"Otp "}
              />
              <TextInput
                  style={styles.input}
                  onChangeText={setpassWord}
                  value={passWord}
                  placeholder={"Reset password "}
                  secureTextEntry
                /> 
                <TextInput
                  style={styles.input}
                  onChangeText={setconfirmPassword}
                  value={confirmPassword}
                  placeholder={"Confirm Password"}
                  secureTextEntry
                />
                </View>
            }
                 
                

            
              

            </View>

            {isOtp? 
             <View style={{alignItems:'center',margin:12}}>
                <TouchableOpacity  style={styles.loginBtn}
                 onPress={()=>loginWithPass()}
                 >
                  {loading?
                  <ActivityIndicator size={'small'} color='#fff'/>
                  :
                    <Text style={[styles.title,{fontSize:16}]}>Reset password</Text>
                  }
                </TouchableOpacity>
            </View> 
           :

           <View style={{alignItems:'center',margin:12}}>
                <TouchableOpacity  style={styles.loginBtn} onPress={()=>submitEmailForOtp()}>
                    <Text style={[styles.title,{fontSize:16}]}>Send For Otp</Text>
                    {loading?<ActivityIndicator style={{marginLeft:5}} size="small" color="#FFF" />:null}
                </TouchableOpacity>
            </View>
        }

<View style={{ alignItems: "center", paddingVertical: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                fontSize: 14,
                color: `#FF9411`,
                textDecorationLine: "underline",
              }}
            >
              Go Back To Profile
            </Text>
          </TouchableOpacity>
        </View>

          
        </SafeAreaView>
            

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff',
    paddingTop:deviceHeight/5,
    position:'relative'

  },
  title: {
    fontSize: 12,
    color:'#fff',
    fontWeight:"bold" ,
  },
  input: {
    height: 40,
    width:deviceWidth/1.2,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor:'#1234',
    // borderRadius:5,
    backgroundColor:'#fff'
  },
  loginBtn:{
    backgroundColor:`#FF9411`,
    padding:10,
    width:deviceWidth/1.2,
    borderRadius:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'

  },
  signUpSection:{
    alignItems:'center',
    position:'absolute',
    bottom:10,
    borderTopColor:'#1234',
    borderTopWidth:1,
    width:deviceWidth
  }
});
