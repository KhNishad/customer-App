
import { View, Text,StyleSheet,StatusBar,ScrollView ,Image,ActivityIndicator,SafeAreaView,TextInput,Button } from 'react-native';
import { Dimensions } from 'react-native'
import { Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default function TabTwoScreen() {

    const navigation = useNavigation();


  return (

    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity >
        <AntDesign onPress={() => navigation.goBack()} name="left" size={30} color={"#fff"}></AntDesign>
           {/* <Image  style={{width:80,height:30,resizeMode:'center'}} source={require('../assets/images/ESSA_Logo_PNG.png')}></Image> */}
        </TouchableOpacity>
         <View  style={styles.input}>
              <Feather name='search' style={{paddingRight:5}} color={'red'} size={20}></Feather>
               <TextInput
                    // onChangeText={setemail}
                    // value={email}
                    placeholder="Search"
                />
         </View>
         <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
           <FontAwesome style={{marginRight:5}} name='user' color={'#fff'} size={25}></FontAwesome>
           {/* <Feather style={{marginRight:5}} name='mail' color={'#fff'} size={25}></Feather> */}
           {/* <Feather onPress={() => navigation.openDrawer()} name='bell' color={'#fff'} size={25}></Feather> */}
         </View>
         {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
           <Text style={{fontSize:16,fontWeight:'bold',color:"black"}}>Grocery</Text>
         </View> */}
      </View>
                
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor:'#FF9411',
    width:deviceWidth,
    borderTopColor:'#fff',
    borderTopWidth:.2,
    paddingVertical:5,
    paddingHorizontal:10
  },
  headerBar:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding: 5,
  },
  input: {
    height: 35,
    width:deviceWidth/2,
    // margin: 12,
    borderWidth: .5,
    padding: 5,
    borderColor:'#fff',
    borderRadius:20,
    backgroundColor:'#fff',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
 
 
});
