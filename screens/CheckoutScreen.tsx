
import { View, Text, StyleSheet, StatusBar, Image, ActivityIndicator, SafeAreaView, TextInput, Button } from 'react-native';
import { Dimensions } from 'react-native'
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage, hideMessage } from "react-native-flash-message";


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

// service
import AddToCartServices from '../services/AddToCartServices';
import profileService from '../services/profileService';


export default function TabTwoScreen() {

    const navigation = useNavigation();

    const [total, setTotal] = useState('')
    const [searchItem, setsearchItem] = useState('')
    const [userInfo, setuserInfo] = useState({})


    useEffect(() => {
        let total = 0;
        let qty = 0;
        AddToCartServices.getAllCartItem().then((res) => {
            // setcartItem(res?.data?.packageList)
            setsearchItem(res?.data?.extraParams?.searchCode)
            
            res?.data?.packageList.map((item:any, index:number) => {
                qty = qty + item?.qty;
                total = total +  ((item?.productVariation?.salePrice?item?.productVariation?.salePrice:item?.productVariation?.regularPrice) * item?.qty)

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


    const placeOrder = async ()=>{
        const data = {
            
            checkoutSearchCode: searchItem
              
        }
        try {
            let res = await AddToCartServices.placeOrder(data)
            // console.log('.............res order',res);
            showMessage({
                message: `${res.message}`,
                type: "success",
              });

        } catch (error) {
            showMessage({
                message: `${error.message}`,
                type: "danger",
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
                            <AntDesign onPress={()=>navigation.goBack()} name="left" size={30} color={"black"}></AntDesign>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: deviceWidth / 4.2 }}>Check-Out</Text>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:15}}>
                    <View style={styles.edit}>
                        <Text style={{fontSize:18}}>Shipping Address</Text>
                        <AntDesign onPress={()=>navigation.navigate('AddressScreen')} name="edit" size={20} color={"black"}></AntDesign>
                    </View>
                    
                    <View style={styles.card}>
                        <View style={{borderBottomWidth:3,borderBottomColor:'#ebe8e8'}}>
                            <Text style={{fontSize:20,fontWeight:'bold',padding:15}}>{userInfo?.name}</Text>
                        </View>
                        <View style={{borderBottomWidth:3,borderBottomColor:'#ebe8e8'}}>
                            <Text style={{fontSize:16,fontWeight:'bold',padding:15}}>Phone : {userInfo?.phone}</Text>
                        </View>
                        {userInfo?.shippingAddress?.length?
                        <View>
                            <Text style={{fontSize:16,padding:15}}>{userInfo?.shippingAddress[0]?.type} : {userInfo?.shippingAddress[0]?.area?.title} ,{userInfo?.shippingAddress[0]?.policeStation?.title} , {userInfo?.shippingAddress[0]?.city?.title} , {userInfo?.shippingAddress[0]?.district?.title}, {userInfo?.shippingAddress[0]?.division?.title} , Bangladesh </Text>
                        </View>
                        :null}
                    </View>
                    
                    <View style={styles.edit}>
                        <Text style={{fontSize:18}}>Payment</Text>
                        {/* <AntDesign name="edit" size={20} color={"black"}></AntDesign> */}
                    </View>
                    
                    <View style={styles.card}>
                        <View style={styles.card2}>
                             <FontAwesome name="cc-mastercard" size={35} color={"#e63b2c"} ></FontAwesome>
                            <Text style={{fontSize:17,padding:15,marginLeft:10}}>Cash On Delivery</Text>
                        </View>
                    </View>
                    
                    {/* <View style={styles.edit}>
                        <Text style={{fontSize:18}}>Delevery Method</Text>
                        <AntDesign name="edit" size={20} color={"black"}></AntDesign>
                    </View>
                    
                    <View style={styles.card}>
                        <View style={styles.card2}>
                        <Image style={styles.img}source={require('../assets/images/dhl-express-vector.jpg')}></Image>
                            <Text style={{fontSize:17,padding:15,marginLeft:10}}>Fast( 2-3 Days)</Text>
                        </View>
                    </View> */}
                    
                    
                    
                    <View style={[styles.card,{marginTop:40}]}>
                        {/* <View style={styles.card3}>
                            <Text style={{fontSize:17,padding:8,}}>Order: </Text>
                            <Text style={{fontSize:18,padding:8,fontWeight:'700'}}>TK. {total}</Text>
                        </View> */}
                        {/* <View style={styles.card3}>
                            <Text style={{fontSize:17,padding:8,}}>Delevery: </Text>
                            <Text style={{fontSize:18,padding:8,fontWeight:'700'}}>$0.00</Text>
                        </View> */}
                        <View style={styles.card3}>
                            <Text style={{fontSize:17,padding:8,}}>Total: </Text>
                            <Text style={{fontSize:18,padding:8,fontWeight:'700'}}>TK. {total}</Text>
                        </View>
                    </View>
                    

                    <View style={{ alignItems: 'center', marginVertical: 30}}>
                        <TouchableOpacity onPress={()=>placeOrder()} style={{ backgroundColor: '#1C6E7A', padding: 10, width: deviceWidth / 1.1, alignItems: 'center', borderRadius: 10 }}>
                            <Text style={[styles.title,]}>Submit Order</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </SafeAreaView>


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
        color:'#fff',
        fontWeight:"normal" ,
      },
      edit: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        // paddingHorizontal:15,
        paddingVertical:10,
    },
    card: {
    //    width:deviceWidth/1.1,
       backgroundColor:'#fff',
       elevation:7,
       borderRadius:5,
    },
    img:{
        width: '30%',
        height: '50%',
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        // resizeMode:'center',
        // borderWidth:.1
      },
    card2: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:15,
        marginLeft:15
    },
    card3: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10 
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
        
    }
});
