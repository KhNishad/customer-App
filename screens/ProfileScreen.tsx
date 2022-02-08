import * as React from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, TouchableOpacity, TextInput, SafeAreaView, Image } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';




// components
import Header from '../components/Header';



const deviceWidth = Math.floor(Dimensions.get('window').width)



let product: any[];
const ViewProduct = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [phone, setphone] = useState('');
  const [fullname, setfullname] = useState('');
  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [img, setimg] = useState('')


  //   image upload
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setimg(result.uri);
  }
};


  return (
    <SafeAreaView>
      <ScrollView >
        <View >
          <Header />
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Account Info</Text>
            </View>
          </View>
          <View style={styles.uploadimage}>
            <View>
              <Image style={styles.img} source={{ uri: 'https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1' }}>

              </Image>
              <FontAwesome5 onPress={()=>pickImage()} color='#FF9411' style={styles.cam} name='camera'></FontAwesome5>


            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Mithu Korim</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Dhaka</Text>
          </View>
          <View style={{ marginHorizontal: 15,backgroundColor:'#fff' }}>
            <View >
              <Text style={styles.labelText}>Phone Number</Text>
              <TextInput
                style={styles.input}
                onChangeText={setphone}
                placeholder="Phn No"
                value={phone}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Full Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setfullname}
                placeholder="Full Name"
                value={fullname}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={setemail}
                placeholder="Email"
                value={email}
              />
            </View>
            <View >
              <Text style={styles.labelText}>Address</Text>
              <TextInput
                style={styles.input}
                onChangeText={setaddress}
                placeholder="Address"
                value={address}
              />
            </View>
            <View style={{alignItems:'center',margin:12}}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={[styles.title,{fontSize:16}]}>Update</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{alignItems:'center'}}>
                <Text style={[styles.title,{fontSize:14,color:'#FF9411',marginBottom:15}]}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default ViewProduct;
const styles = StyleSheet.create({


  container: {

    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor:'#FAFAFA',
    borderBottomColor: '#FF9411',
    borderBottomWidth: .5

  },
  uploadimage: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30

  },
  img: {
    width: deviceWidth / 3,
    height: deviceWidth / 3,
    // resizeMode:'contain',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#FF9411',
    borderRadius: 100,

  },
  cam: {
    fontSize: 30,
    padding: 5,
    position: 'absolute',
    zIndex: 99,
    bottom: 10,
    right: -10
  },
  labelText: {
    fontWeight: 'bold',
    padding: 5
  },
  input: {
    // width: deviceWidth / 1.1,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    borderColor:'#FF9411'

  },
  title: {
    fontSize: 30,
    color:'#fff',
    fontWeight:"normal" ,
  },
  btn:{
    backgroundColor:'#FF9411',
    padding:10,
    width:deviceWidth/1.1,
    alignItems:'center',
    borderRadius:5
  }










})


