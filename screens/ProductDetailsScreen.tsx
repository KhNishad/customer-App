import * as React from "react";
import { StyleSheet, Text, View, Image, Dimensions, Alert, BackHandler, Share } from "react-native";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Entypo, MaterialIcons,AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { useNavigation, useRoute } from "@react-navigation/native";


// services


const deviceWidth = Dimensions.get("window").width;

// components
import Header2 from "../components/Header";


export default function ProductDetails() {
 
  const navigation = useNavigation();



  return (
    
      <View style={{ zIndex: 0,backgroundColor: '#fff',  }}>
        <Header2 />
          <ScrollView
            style={{ height: '90%' }}
            removeClippedSubviews={true}
          >
                <View style={{ paddingVertical: 5}}>
                    <View style={{ marginBottom: 5}}>
                        {/* image section */}
                        {/* <Carousel
                            style={{ width: deviceWidth, height: deviceWidth }}
                            delay={5000}
                            pageInfo={true}
                            pageInfoBackgroundColor={'#fff'}
                        > */}
                                <View
                                style={{ alignItems: "center" }}
                                >
                                    <Image
                                        style={styles.detailsImg}
                                        source={require('../assets/images/jacket.jpg')}
                                    ></Image>
                                </View>

                        {/* </Carousel> */}

                    </View>

                    <View style={{  marginBottom: 5, paddingTop: 5 }}>
                        {/* price section */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                            <View style={[styles.priceAndWishContainer]}>
                                <View style={{ flexDirection:'row', alignItems:'center'}}>
                                    <Text style={styles.salePrice}>
                                    Tk.250.00
                                    </Text>
                                    
                                </View>
                                {/* offer tag */}
                                {/* <View>
                                    <View style={[styles.discoutDesign,{marginTop:0}]}>
                                        <Text style={{ color: "#e01221", fontSize: 10 }}>
                                        20
                                        % OFF
                                        </Text>
                                    </View>
                                
                                </View> */}
                                 <View style={{ flexDirection:'row', alignItems:'center',paddingLeft:10}}>
                                    <Text style={{ color: "#1239", fontSize: 14,textDecorationLine:'line-through' }}>
                                    Tk.150.00
                                    </Text>
                                    
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:0 }}>
                            
                                <TouchableOpacity style={{ paddingRight: 10 }}>
                                <Entypo name='heart-outlined' size={20} color= {'#1239'}></Entypo>
                                </TouchableOpacity>
                                <TouchableOpacity  style={{ paddingRight: 15 }}>
                                <Entypo name='share' size={20} color='#1239'></Entypo>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                                
                        <View style={styles.shopTileContainer}>
                            <Text style={styles.proTitle}>Samsung Galaxy</Text>

                            <Text
                                style={{ fontSize: 14, color: '#1239' }}>
                                Category : Mobile
                            </Text>
                        </View>

                        {/* review section */}

                        <View style={styles.allReviews}>
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
                                <Text onPress={()=>navigation.navigate('MyReviewsScreen')} style={{ color: "#1239", fontSize: 14 }}>
                                All Reviews
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {/* qty box  */}

                        <View style={styles.qtyContainer}>

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: 'center',
                            // width:'100%'
                          }}
                        >
                          <Text style={{fontSize: 15, marginRight: '20%' }} >
                            Quantity
                          </Text>
                          <TouchableOpacity>
                            <View style={[styles.qtyBtn,{marginRight:10}]}>
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
                              value="10"
                            
                            />
                          </View>
                          <TouchableOpacity >
                            <View style={[styles.qtyBtn,{marginLeft:10}]}>
                              <AntDesign
                                style={{ fontSize: 16, color: "#fff" }}
                                name="plus"
                              ></AntDesign>
                            </View>
                          </TouchableOpacity>
                        </View>
                        </View>

                        {/* total */}

                        <View style={{padding:10,display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                            <Text style={{fontSize:18}}>Total</Text>
                            <Text style={{fontSize:18}}>$ 250 * 1 = 250</Text>

                        </View>

                        {/* btn s s */}

                        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                            <View style={styles.secondBtns}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name="shoppingcart" size={25} color={"#fff"}></AntDesign>
                                    <Text style={{ color: '#fff' }}> Add to Cart</Text>
                                    </TouchableOpacity>
                                </View>
                           </View>
                           <View style={styles.secondBtns}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign name="tago" size={25} color={"#fff"}></AntDesign>
                                    <Text style={{ color: '#fff',marginLeft:5 }}>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                           </View>
                        </View>

                        {/* description */}

                        <View style={{padding:10}}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>Specification & Description :</Text>
                        </View>
                        
                    </View>
                </View>
           </ScrollView>
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
  cardPriceText: {
    textDecorationLine: "line-through",
    fontSize: 10,
    marginRight: 10,
    color: "#999999",
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
    borderBottomColor:'#1234',
    borderBottomWidth:.5,
    borderTopColor:'#1234',
    borderTopWidth:.5
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
  cardPrice: {
    fontSize: 10,
    color: "red",
  },
  cardTitleContainer: {
    height: "60%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  bookNowBtn: {
    backgroundColor: "#ec1d25",
    width: deviceWidth,
    alignItems: "center",
  },
  subscripBtn: {
    flexDirection: "row",
    paddingVertical: 8,
    alignItems: "center",
  },
  addToBtnContainer: {
    backgroundColor: "#ec1d25",
    width: deviceWidth / 3 - 2,
    alignItems: "center",
    paddingVertical: 16,
    marginRight: 1,
    // height:50
  },
  cartBadge: {
    backgroundColor: "#ffffff",
    marginLeft: 1,
    borderRadius: 50,
    paddingHorizontal: 3,
    position: "absolute",
    left: 15,
    bottom: 18,
  },

  cartBadgeText: {
    color: "#ec1d25",
    fontWeight: "bold",
    fontSize: 10,
  },
  subsBtnText: {
    color: "#FFFFFF",
    fontSize: 20,
    marginLeft: 5,
  },
  btnContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 95,
  },
  relatedProImg: {
    width: "100%",
    height: "100%",
    resizeMode: "center",
  },
  metaData: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaDataIcons: {
    fontSize: 15,
    color: "#ec1d25",
    marginRight: 10,
  },
  metaTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  sellerAvater: {
    width: deviceWidth / 3,
    height: 70,
    resizeMode: "center",
    marginLeft: -15
  },
  metaDataSellerInfoContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 5,
    justifyContent: "space-between",

  },
  metaDataText: {
    fontSize: 12,
    color: '#1239'
  },
  highlightsContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  discoutDesign: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor:"#e01221",
    borderWidth:1,
    padding:4,
    // marginLeft:10
  },
  variationBox: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    width: deviceWidth / 1.2,

  },
  secondBtns: {
    paddingVertical: 10,
    backgroundColor: '#ec1d25',
    alignItems: 'center',
    width: 120,
    marginVertical: 10,
    borderRadius: 15

  }


});
