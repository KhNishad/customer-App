
import { View, Text,StyleSheet,StatusBar,ScrollView ,Image,ActivityIndicator,SafeAreaView,TextInput,Button } from 'react-native';
import { Dimensions } from 'react-native'
import { FontAwesome} from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

export default function TabTwoScreen() {

    const navigation = useNavigation();


    const [email, setemail] = useState('')
    const [passWord, setpassWord] = useState('')


    const LoginSubmit = async ()=>{
        // if(reg.test(email)=== true){
        //     const data = {
        //         email:email,
        //         password:passWord
        //     }
        //     console.log('..............res',data);
        // }else{
        //     alert('Invalid email')
        // }
        navigation.navigate('TabNav')
    }


  return (
    <View style={styles.container}>
        <StatusBar backgroundColor="#FF9411"/>
        <SafeAreaView>
            <View style={{borderTopColor:'#fff',alignItems:'center',marginBottom:40}}>
                <FontAwesome name='user-circle' size={90} color={'#fff'}/>
                {/* <Image style={{width:deviceWidth/3,height:80,resizeMode:'contain'}} source={require('../assets/images/essa-logo.jpeg')}></Image> */}
                <Text style={styles.title}>Login</Text>
            </View>

            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={setemail}
                    value={email}
                    placeholder="email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setpassWord}
                    value={passWord}
                    placeholder="Password"
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity style={{alignItems:'center',paddingBottom:10}}>
                <Text style={[styles.title,{fontSize:14}]}>Forgot Your Password?</Text>
            </TouchableOpacity>
            <View style={{alignItems:'center',margin:12}}>
                <TouchableOpacity onPress={()=>LoginSubmit()} style={{backgroundColor:'#001E42',padding:10,width:deviceWidth/1.2,alignItems:'center',borderRadius:5}}>
                    <Text style={[styles.title,{fontSize:16}]}>Login</Text>
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
    backgroundColor:'#FF9411',
    paddingTop:deviceHeight/6
  },
  title: {
    fontSize: 30,
    color:'#fff',
    fontWeight:"normal" ,
  },
  input: {
    height: 40,
    width:deviceWidth/1.2,
    margin: 12,
    borderWidth: .5,
    padding: 10,
    borderColor:'#fff',
    borderRadius:5,
    backgroundColor:'#fff'
  },
});
