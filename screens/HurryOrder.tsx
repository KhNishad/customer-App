
import { View, Text, StyleSheet, StatusBar, Image, ActivityIndicator, SafeAreaView, TextInput, Button } from 'react-native';
import { Dimensions } from 'react-native'
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';

import productService from '../services/productService';

const apiImagepath = "http://103.119.71.9:4400/media";

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

// service
import AddToCartServices from '../services/AddToCartServices';
import profileService from '../services/profileService';
import HurryOrderService from '../services/HurryOrderService';


import SuccessModal from '../components/filterModal';

export default function TabTwoScreen() {

  const navigation = useNavigation();

  const [total, setTotal] = useState('')
  const [searchItem, setsearchItem] = useState('')
  const [userInfo, setuserInfo] = useState<any>({})
  const [openFilter, setopenFilter] = useState(false)
  const [requisitionData, setrequisitionData] = useState([])
  const [Imagee, setImagee] = useState([])
  const [renderMe, setrenderMe] = useState(false);
  const [texts, settexts] = useState([])
  const [note, setnote] = useState('')


  useEffect(() => {
    let total = 0;
    let qty = 0;
    AddToCartServices.getAllCartItem().then((res) => {
      // setcartItem(res?.data?.packageList)
      setsearchItem(res?.data?.extraParams?.searchCode)

      res?.data?.packageList.map((item: any, index: number) => {
        qty = qty + item?.qty;
        total = total + ((item?.productVariation?.salePrice ? item?.productVariation?.salePrice : item?.productVariation?.regularPrice) * item?.qty)

      })
      setTotal(total)

    }).catch(err => {
      console.log('err in cart List', err);
    })

    profileService.getUser().then((res) => {
      // setcartItem(res?.data?.packageList)
      // console.log('...........res',res?.data);
      setuserInfo(res?.data)

    }).catch(err => {
      console.log('err in cart List', err);
    })
  }, [])


  //   image upload
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });

     let img = Imagee
    if (!result.cancelled) {
      const data = {
        file: `data:${`image/${result.uri.split('.').pop()}`};base64,${result.base64}`,
        folderPath: 'appImages'
      }

      try {
        let res = await productService.ImageUpload(data)
        if (res) {
          img.push(res)
          setImagee(img)
          setrenderMe(!renderMe)
        }
      } catch (error) {
        console.log("err in img up", error);
      }
    }
  };

  const textInput = async (index,value)=>{
   let test = texts
   test[index] = value
   settexts(test)
   setrenderMe(!renderMe)
  }


  const hurryOrder = async () =>{
    let arr = [{}]
    Imagee.map((item)=>{
      arr.push({})
    })

    arr.map((item,index)=>{
      item['url'] =  Imagee[index]
      item['alt'] = texts[index]
    })
    arr.pop()
     const data   = {
      images : arr,
      note:note
     }


     try {
      let res  = await HurryOrderService.placeHurryOrder(data)

      if(res){
        showMessage({
          message: `${res.message}`,
          type: "success",
        });
      }
     } catch (error) {
      showMessage({
        message: `${error.message}`,
        type: "warning",
      });

     }

     
  }


  return (
    <View >
      <StatusBar backgroundColor="#FF9411" />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container1}>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign onPress={() => navigation.goBack()} name="left" size={30} color={"black"}></AntDesign>
              <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: deviceWidth / 4.2 }}>Hurry Order</Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            {/* <View style={styles.edit}>
                        <Text style={{fontSize:18}}>Shipping Address</Text>
                        <AntDesign onPress={()=>navigation.navigate('AddressScreen')} name="edit" size={20} color={"black"}></AntDesign>
                    </View> */}

            <View style={styles.card}>
              <View style={{ borderBottomWidth: 3, borderBottomColor: '#ebe8e8' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 15 }}>{userInfo?.name}</Text>
              </View>
              <View style={{ borderBottomWidth: 3, borderBottomColor: '#ebe8e8' }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold', padding: 15 }}>Phone : {userInfo?.phone}</Text>
              </View>
              {userInfo?.shippingAddress?.length ?
                <View>
                  <Text style={{ fontSize: 16, padding: 15 }}>{userInfo?.shippingAddress[0]?.type} : {userInfo?.shippingAddress[0]?.area?.title} ,{userInfo?.shippingAddress[0]?.policeStation?.title} , {userInfo?.shippingAddress[0]?.city?.title} , {userInfo?.shippingAddress[0]?.district?.title}, {userInfo?.shippingAddress[0]?.division?.title} , Bangladesh </Text>
                </View>
                : null}
            </View>

            <View style={{ padding: 5 }}>
              <Text>Product Photo </Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection:'row',
                  alignItems:'center',
                  flexWrap:'wrap',
                  justifyContent:'space-between'
                }}
              >
                {Imagee?.map((item,index)=>
                 <View >
                    <Image
                      style={styles.img}
                      source={{ uri: `${apiImagepath}/${item}` }}
                    />
                     <TextInput
                        style={styles.input}
                        onChangeText={(text)=>textInput(index,text)}
                        // value={phone}
                        placeholder="text...."
                    />
               </View>
                )}
                 <TouchableOpacity  onPress={() => pickImage()} style={{backgroundColor:'#1234',height:deviceWidth/2.5,width:deviceWidth/2.5,alignItems:'center',justifyContent:'center',margin:5}}>
                    <FontAwesome5  style={{ fontSize: 30, color:"#fff"}} name='camera'></FontAwesome5>
                 </TouchableOpacity>

              </View>
            </View>

                        <TextInput
                        style={styles.input}
                        onChangeText={setnote}
                        value={note}
                        placeholder="Note...."
                    />


            <View style={{ alignItems: 'center', marginVertical: 30 }}>
              <TouchableOpacity onPress={()=>hurryOrder()} style={{ backgroundColor: '#1C6E7A', padding: 10, width: deviceWidth / 1.1, alignItems: 'center', borderRadius: 10 }}>
                <Text style={[styles.title,]}>Submit Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* {openFilter? */}
      <SuccessModal setopenFilter={setopenFilter} openFilter={openFilter} data={requisitionData} />
      {/* :null} */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {



  },
  container1: {

    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    //   backgroundColor:'#FAFAFA',
    borderBottomColor: '#FF9411',
    borderBottomWidth: .5

  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: "normal",
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal:15,
    paddingVertical: 10,
  },
  card: {
    //    width:deviceWidth/1.1,
    backgroundColor: '#fff',
    elevation: 7,
    borderRadius: 5,
    marginTop: 10
  },
  img: {
    width: deviceWidth / 2.5,
    height: deviceWidth / 2.5,
    borderWidth: 0.1,
    borderColor: "#FF9411",
    alignItems: "center",
    resizeMode: 'contain'
  },
  card2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginLeft: 15
  },
  card3: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  infoText: {
    color: '#7B7B7B',
    fontSize: 15,
    fontWeight: 'bold'
  },
  productImg: {
    width: 80,
    height: 80,
    // borderWidth:0.5,
    // borderColor:'#1234',
    // resizeMode:'center'
  },
  listContainer: {

  },
  cam: {
    fontSize: 30,
    padding: 5,
    position: "absolute",
    zIndex: 99,
    bottom: "30%",
    left: "30%",
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
