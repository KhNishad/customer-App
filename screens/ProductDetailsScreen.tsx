import * as React from "react";
import { StyleSheet, Text, View, Image, Dimensions, Alert, BackHandler, Share } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { useNavigation, useRoute } from "@react-navigation/native";
import productService from "../services/productService";
import AddToCartServices from "../services/AddToCartServices";
import { showMessage, hideMessage } from "react-native-flash-message";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";


// services


const deviceWidth = Dimensions.get("window").width;

// components
import Header2 from "../components/header2";
import LoginModal from '../components/LoginModal'


const apiImagepath = 'http://103.119.71.9:4400/media';


export default function ProductDetails() {

  const navigation = useNavigation();
  const [refreshing, setrefreshing] = useState(false);
  const [productDetail, setproductDetail] = useState<any>({});
  const route = useRoute();
  const [Counter, setCounter] = useState(1);
  const [ModalOpen, setModalOpen] = useState(false)

  const { title } = route.params;


const closeIt = ()=>{

}
  // pull refresh  function
  function wait(time: any) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }

  const refresh = React.useCallback(() => {
    setrefreshing(true)
    wait(1000).then(() => {
      setrefreshing(false)
    })
  }, [refreshing])

  useEffect(() => {
    productService.getSingleProductDetails(title).then((res) => {
      setproductDetail(res?.data);
      // console.log("...............res", res?.data);

    })
  }, [refreshing,title])


  //Add to cart 
  const addToCart = async () => {
    let tokenn =   await  SecureStore.getItemAsync('accessToken')

    if(tokenn){
      const data = {
        prodId: productDetail?.id,
        prodVarId: productDetail?.variations[0]?.id,
        qty: Counter,
      }
      AddToCartServices.addToCart(data).then((res)=>{
        showMessage({
          message: `${res?.message}`,
          type: "success",
          textStyle: { fontSize: 30 }
        });
        
      }).catch(err=>{
        showMessage({
          message: `${err.message}`,
          type: "danger",
          textStyle: { fontSize: 30 }
        });
      })
    }else{
      setModalOpen(true)
    }
  }


  // quantity inc dec

  const qtyInc = () => {

    // if(Counter < productDetail?.variations[0]?.maxOrderQty)   
    setCounter(Number(Counter) + 1);

  };

  const qtyDec = () => {
    if (Counter > 1) setCounter(Counter - 1);

  };

  return (

    <View style={{ backgroundColor: '#fff', flex: 1 }}>
      <Header2 />
      <ScrollView
        style={{ height: '100%',marginBottom:50 }}
        removeClippedSubviews={true}
      >

        <View style={{ paddingVertical: 5 }}>
          <View style={{ marginBottom: 5 }}>
            {/* image section */}
            {/* <Carousel
                            style={{ width: deviceWidth, height: deviceWidth }}
                            delay={5000}
                            pageInfo={true}
                            pageInfoBackgroundColor={'#fff'}
                        > */}
            {productDetail?.images?.length > 0 ?
              <View
                style={{ alignItems: "center" }}
              >
                <Image
                  style={styles.detailsImg}
                  source={{ uri: `${apiImagepath}/${productDetail?.images[0]?.url}` }}
                ></Image>
              </View>
              : null}

            {/* </Carousel> */}

          </View>

          <View style={{ marginBottom: 5, paddingTop: 5 }}>
            {/* price section */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
              {productDetail?.variations?.length > 0 ?
                <View style={[styles.priceAndWishContainer]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.salePrice}>
                      Tk.{productDetail?.variations[0]?.salePrice>0 ? productDetail?.variations[0]?.salePrice : productDetail?.variations[0]?.regularPrice}
                    </Text>

                  </View>
                  {productDetail?.variations[0]?.salePrice > 0 ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                      <Text style={{ color: "#1239", fontSize: 14, textDecorationLine: 'line-through' }}>
                        Tk.{productDetail?.variations[0]?.salePrice ? productDetail?.variations[0]?.regularPrice : null}
                      </Text>

                    </View>
                    : null}
                </View>
                : null}

              {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 0 }}>

                <TouchableOpacity style={{ paddingRight: 10 }}>
                  <Entypo name='heart-outlined' size={20} color={'#1239'}></Entypo>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingRight: 15 }}>
                  <Entypo name='share' size={20} color='#1239'></Entypo>
                </TouchableOpacity>
              </View> */}

            </View>

            <View style={[styles.shopTileContainer,{marginBottom:10}]}>
              <Text style={styles.proTitle}>{productDetail?.title}</Text>

              <Text
                style={{ fontSize: 14, color: '#1239' }}>
                Category : {productDetail?.category?.title}
              </Text>
            </View>



            {/* review section */}

            {/* <View style={styles.allReviews}>
              <Rating
                type='custom'
                readonly={true}
                startingValue={5}
                imageSize={18}
              // onFinishRating={''}
              // ratingColor='#3498db'

              />

              <TouchableOpacity
                style={styles.allReview}
              >
                <Text style={{ color: "#1239", fontSize: 14 }}>
                  All Reviews
                </Text>
              </TouchableOpacity>
            </View> */}
            {/* qty box  */}

            <View style={styles.qtyContainer}>

              <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',
                // width:'100%'
              }}
              >
                <Text style={{ fontSize: 15, marginRight: '20%' }} >
                  Quantity
                </Text>
                <TouchableOpacity onPress={() => qtyDec()}>
                  <View style={[styles.qtyBtn, { marginRight: 10 }]}>
                    <AntDesign
                      style={{ fontSize: 16, color: "#fff" }}
                      name="minus"
                    ></AntDesign>
                  </View>
                </TouchableOpacity>

                <View style={styles.qtyInputBox}>
                  <TextInput
                    keyboardType='numeric'
                    style={{
                      fontSize: 14,
                      color: "#1239",
                      textAlign: 'center',
                      marginVertical: -2
                    }}
                    value={Counter.toString()}

                  />
                </View>
                <TouchableOpacity onPress={() => qtyInc()} >
                  <View style={[styles.qtyBtn, { marginLeft: 10 }]}>
                    <AntDesign
                      style={{ fontSize: 16, color: "#fff" }}
                      name="plus"
                    ></AntDesign>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* total */}
            {productDetail?.variations?.length > 0 ?
              <View style={{ padding: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={{ fontSize: 18 }}>Total</Text>
                <Text style={{ fontSize: 18 }}>$ {productDetail?.variations[0]?.salePrice ? productDetail?.variations[0]?.salePrice : productDetail?.variations[0]?.regularPrice} * {Counter} = {productDetail?.variations[0]?.salePrice ? productDetail?.variations[0]?.salePrice * Counter : productDetail?.variations[0]?.regularPrice * Counter}</Text>

              </View>
              : null}

            {/* btn s s */}

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <TouchableOpacity onPress={()=> addToCart()} style={styles.secondBtns}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity  style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="shoppingcart" size={25} color={"#fff"}></AntDesign>
                    <Text style={{ color: '#fff' }}> Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              {/* <View style={styles.secondBtns}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AntDesign name="tago" size={25} color={"#fff"}></AntDesign>
                    <Text style={{ color: '#fff', marginLeft: 5 }}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View> */}
            </View>

            {/* description */}

            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Specification & Description :</Text>
              <View style={{ marginVertical: 10 }}>
                <Text>{productDetail?.description}</Text>
                <View style={{marginTop:10}}>
                  {productDetail?.attributes?.map((item,index)=>
                    <Text key={index}>{item?.termTitle} : {item?.value}</Text>
                  )}
                </View>
               
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{backgroundColor:'#FF9411',paddingVertical:10,alignItems:"center",position:'absolute',bottom:5,zIndex:9999,width:deviceWidth-20,left:10,borderRadius:5}}>
        <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}  style={{flexDirection:'row'}}>
            <AntDesign name="shoppingcart" size={25} color={"#fff"}></AntDesign>
            <Text style={{color:'#fff',fontSize:18,marginLeft:5}}>View Cart</Text>
        </TouchableOpacity>
      </View>
            {ModalOpen?
              <LoginModal closeIt={closeIt()}  setModalOpen={setModalOpen} ModalOpen={ModalOpen}/>
             :null}
    </View>

  );
}

const styles = StyleSheet.create({
  flashSaleContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    width: deviceWidth / 1.5,
  },

  displayImgSmall: {
    borderWidth: 0.5,
    borderColor: "red",
    width: 70,
    height: 70,
    padding: 2,
    resizeMode: "center",
  },
  displayImgContainer: {
    marginLeft: 5,
    padding: 2,
    flexWrap: "wrap",
    flexDirection: "row",
    flex: 1,
  },

  var2: {
    paddingHorizontal: 6,
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },

  var1: {
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
    borderRadius: 50,
    marginHorizontal: 2
  },

  variation1Row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 2
  },

  variationText: {
    fontSize: 10,
    color: "#1239",
    fontWeight: "600",
    textAlign: "center",
    // marginLeft:2
  },
  relatedProductcard: {
    width: "48%",
    height: deviceWidth / 2 + 30,
    backgroundColor: "#FFFF",
    justifyContent: "center",
    marginBottom: 12,
  },

  relatedProductContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  showAllSection: {
    // paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  allReview: {
    paddingVertical: 10,
  },
  detailsImg: {
    width: deviceWidth,
    height: deviceWidth,
    marginLeft: -1
  },
  priceAndWishContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    backgroundColor: '#fff'
  },
  salePrice: {
    fontSize: 20,
    color: "#CB0000",
    paddingBottom: 5,
    marginRight: 5
  },
  priceLineThrough: {
    fontSize: 14,
    color: "#BBBBBB",
    textDecorationLine: "line-through",
  },
  HeartIcon: {
    fontSize: 30,
    color: "#787A8D",
    paddingRight: 15,
  },
  allReviews: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  shopTileContainer: {
    paddingHorizontal: 10,
  },
  proTitle: {
    color: "#000000",
    fontSize: 16,
    paddingBottom: 5,
  },
  qtyContainer: {
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#1234',
    borderBottomWidth: .5,
    borderTopColor: '#1234',
    borderTopWidth: .5
  },
  qtyBtn: {
    backgroundColor: "#1239",
    borderRadius: 100,
    padding: 2,
  },
  qtyInputBox: {
    borderWidth: 1,
    borderColor: "#1239",
    borderRadius: 5,
    paddingHorizontal: 18,
    justifyContent: "center",
    textAlign: 'center',

  },
  relatedProPrice: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    paddingHorizontal: 5,
  },
 

  secondBtns: {
    paddingVertical: 10,
    backgroundColor: '#ec1d25',
    alignItems: 'center',
    width:deviceWidth-20,
    marginVertical: 10,
    borderRadius: 5

  }


});
