
import { View, Text,StyleSheet,StatusBar,ScrollView ,Image,ActivityIndicator,SafeAreaView,TextInput,Button } from 'react-native';
import { Dimensions } from 'react-native'
import { FontAwesome} from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import {Picker} from '@react-native-picker/picker';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as SecureStore from 'expo-secure-store';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

// service 

import LoginService from '../services/LoginService';

export default function TabTwoScreen() {

    const navigation = useNavigation();


    const [phone, setphone] = useState('')
    const [passWord, setpassWord] = useState('')
    const [fullName, setfullName] = useState('')
    const [date, setDate] = useState('')
    const [gender, setgender] = useState('male')

    const [showDate, setshowDate] = useState(false)


  const LoginSubmit = async ()=>{
    const data = {
      
        name: fullName,
        phone: phone,
        password: passWord,
        DOB: date,
        gender: gender
      
    }
    
       try {
         let res  = await LoginService.Registration(data)
         console.log('...........res',res);
         
         showMessage({
          message: `${res.message}`,
          type: "success",
        });
        // SecureStore.setItemAsync('accessToken',res?.data?.token?.accessToken);
        navigation.navigate('TabNav')

       } catch (error) {
        showMessage({
          message: `${error?.message}`,
          type: "danger",
        });
       }
    }

       // select time and date
  const onChange = (event: any, selectedDate: any) => {
    setshowDate(false)

  const currentDate = selectedDate || date;
    setDate(currentDate);

    };


  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#FF9411"/>
            <View style={{borderTopColor:'#fff',alignItems:'center'}}>
                <FontAwesome name='user-circle' size={90} color={'#fff'}/>
                <Image style={{width:deviceWidth/3,height:80,resizeMode:'contain'}} source={require('../assets/images/ESSA_Logo_PNG.png')}></Image>
                <Text style={{color:'black',fontSize:12}}>By signing up, you agree to our Term & Conditions</Text>
            </View>

            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setphone}
                    value={phone}
                    placeholder="Phone Number"
                    keyboardType='numeric'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setfullName}
                    value={fullName}
                    placeholder="Full Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setpassWord}
                    value={passWord}
                    placeholder="Password"
                    secureTextEntry={true}
                 />
                 <View style={{flexDirection:'row'}} >
                  <View >
                      <Text>Birthday</Text>
                      <View>
                          <TouchableOpacity onPress={()=>setshowDate(true)} style={{width:deviceWidth/2-20,alignItems:"center",marginVertical:10,borderRadius:2,borderColor:'#1234',borderWidth:.8}}>
                            <Text style={{color:'black',paddingVertical:17}}>{date? moment(date).format('ll'):'Select Date'}</Text>
                          </TouchableOpacity>
                        
                        </View>
                    </View>
                    <View>
                       <Text>Gender</Text>
                        <View style={{borderWidth:.8,borderColor:'#1234',borderRadius:2,marginTop:10,paddingLeft:10,width:deviceWidth/2-20}}>
                          <Picker
                            selectedValue={gender}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) =>
                              setgender(itemValue)
                            }>
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                          </Picker>
                          </View>
                    </View>
                 </View>
                
            </View>
            
            <View style={{alignItems:'center',paddingVertical:10}}>
                <TouchableOpacity onPress={()=>LoginSubmit()} style={{backgroundColor:'#faec84',padding:10,width:deviceWidth-40,alignItems:'center',borderRadius:2}}>
                    <Text style={{fontSize:16,color:'black'}}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={{alignItems:'center',paddingBottom:10}}>
                <Text style={[styles.title,{fontSize:14}]}>Already Have An Account?<Text style={{color:'#000000'}} >  Login</Text>
                </Text>
            </View>
                 {showDate ?
                   <DateTimePicker
                     testID="dateTimePicker"
                     value={new Date()}
                     mode={'date'}
                     display="default"
                     onChange={onChange}
                   />
                  : null}       
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#fff',
    // paddingTop:20
  },
  title: {
    fontSize: 30,
    color:'#1239',
    fontWeight:"normal" ,
  },
  input: {
    height: 45,
    // width:deviceWidth/1.2,
    borderWidth: .5,
    marginVertical:10,
    padding: 10,
    borderColor:'#1234',
    borderRadius:2,
    backgroundColor:'#fff'
  },
});
