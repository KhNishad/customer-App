import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

// service
import AddToCartServices from "../services/AddToCartServices";
import profileService from "../services/profileService";

import SuccessModal from "../components/filterModal";

export default function TabTwoScreen() {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [total, setTotal] = useState("");
  const [searchItem, setsearchItem] = useState("");
  const [userInfo, setuserInfo] = useState<any>({});
  const [openFilter, setopenFilter] = useState(false);
  const [requisitionData, setrequisitionData] = useState([]);

  useEffect(() => {
    let total = 0;
    let qty = 0;
    AddToCartServices.getAllCartItem()
      .then((res) => {
        // setcartItem(res?.data?.packageList)
        setsearchItem(res?.data?.extraParams?.searchCode);

        res?.data?.packageList.map((item: any, index: number) => {
          qty = qty + item?.qty;
          total =
            total +
            (item?.productVariation?.salePrice
              ? item?.productVariation?.salePrice
              : item?.productVariation?.regularPrice) *
              item?.qty;
        });
        setTotal(total);
      })
      .catch((err) => {
        console.log("err in cart List", err);
      });

    profileService
      .getUser()
      .then((res) => {
        // setcartItem(res?.data?.packageList)
        // console.log("...........res", res);
        setuserInfo(res?.data);
      })
      .catch((err) => {
        console.log("err in cart List", err);
      });
  }, [isFocused]);

  const placeOrder = async () => {
    const data = {
      checkoutSearchCode: searchItem,
    };
    try {
      let res = await AddToCartServices.placeOrder(data);
      setrequisitionData(res?.data);
      setopenFilter(true);
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
  };
  console.log(".............res order", userInfo);

  return (
    <View>
      <StatusBar backgroundColor="#FF9411" />
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container1}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                onPress={() => navigation.goBack()}
                name="left"
                size={30}
                color={"black"}
              ></AntDesign>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  marginLeft: deviceWidth / 4.2,
                }}
              >
                Check-Out
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.edit}>
              <Text style={{ fontSize: 18 }}>Shipping Address</Text>
              <AntDesign
                onPress={() => navigation.navigate("AddressScreen")}
                name="edit"
                size={20}
                color={"black"}
              ></AntDesign>
            </View>

            <View style={styles.card}>
              <View
                style={{ borderBottomWidth: 3, borderBottomColor: "#ebe8e8" }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold", padding: 15 }}>
                  {userInfo?.name}
                </Text>
              </View>
              <View
                style={{ borderBottomWidth: 3, borderBottomColor: "#ebe8e8" }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold", padding: 15 }}>
                  Phone : {userInfo?.phone}
                </Text>
              </View>
              {userInfo?.shippingAddress?.length ? (
                <View>
                  {userInfo?.shippingAddress?.map((item, index) => (
                    <View key={index}>
                      {item.isActive ? (
                        <Text
                          style={{ fontSize: 16, padding: 15, color: "#000" }}
                        >
                          {item?.more} ,{item?.area?.title} ,
                          {item?.policeStation?.title} , {item?.city?.title} ,{" "}
                          {item?.district?.title}, {item?.division?.title} ,
                        </Text>
                      ) : null}
                    </View>
                  ))}
                </View>
              ) : (
                <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                  <Text style={{ color: "red", fontSize: 15 }}>
                    You Don't Have Any Active Address! Please create Address
                    from Profile Before Placing Order
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.edit}>
              <Text style={{ fontSize: 18 }}>Payment</Text>
              {/* <AntDesign name="edit" size={20} color={"black"}></AntDesign> */}
            </View>

            <View style={styles.card}>
              <View style={styles.card2}>
                <FontAwesome
                  name="cc-mastercard"
                  size={35}
                  color={"#e63b2c"}
                ></FontAwesome>
                <Text style={{ fontSize: 17, padding: 15, marginLeft: 10 }}>
                  Cash On Delivery
                </Text>
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

            <View style={[styles.card, { marginTop: 40 }]}>
              {/* <View style={styles.card3}>
                            <Text style={{fontSize:17,padding:8,}}>Order: </Text>
                            <Text style={{fontSize:18,padding:8,fontWeight:'700'}}>TK. {total}</Text>
                        </View> */}
              {/* <View style={styles.card3}>
                            <Text style={{fontSize:17,padding:8,}}>Delevery: </Text>
                            <Text style={{fontSize:18,padding:8,fontWeight:'700'}}>$0.00</Text>
                        </View> */}
              <View style={styles.card3}>
                <Text style={{ fontSize: 17, padding: 8 }}>Total: </Text>
                <Text style={{ fontSize: 18, padding: 8, fontWeight: "700" }}>
                  TK. {total}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: "center", marginVertical: 30 }}>
              {userInfo?.shippingAddress?.length ? (
                <TouchableOpacity
                  onPress={() => placeOrder()}
                  style={{
                    backgroundColor: "#1C6E7A",
                    padding: 10,
                    width: deviceWidth / 1.1,
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text style={[styles.title]}>Submit Order</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddressScreen")}
                  style={{
                    backgroundColor: "#1C6E7A",
                    padding: 10,
                    width: deviceWidth / 1.1,
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text style={[styles.title]}>Create Address To Order</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      {/* {openFilter? */}
      <SuccessModal
        setopenFilter={setopenFilter}
        openFilter={openFilter}
        data={requisitionData}
      />
      {/* :null} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  container1: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //   backgroundColor:'#FAFAFA',
    borderBottomColor: "#FF9411",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "normal",
  },
  edit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal:15,
    paddingVertical: 10,
  },
  card: {
    //    width:deviceWidth/1.1,
    backgroundColor: "#fff",
    elevation: 7,
    borderRadius: 5,
  },
  img: {
    width: "30%",
    height: "50%",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    // resizeMode:'center',
    // borderWidth:.1
  },
  card2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginLeft: 15,
  },
  card3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  infoText: {
    color: "#7B7B7B",
    fontSize: 15,
    fontWeight: "bold",
  },
  productImg: {
    width: 80,
    height: 80,
    // borderWidth:0.5,
    // borderColor:'#1234',
    // resizeMode:'center'
  },
  listContainer: {},
});
