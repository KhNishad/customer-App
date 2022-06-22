import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
// service
import AddToCartServices from "../services/AddToCartServices";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const apiImagepath = "http://103.119.71.9:4400/media";

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const [cartItem, setcartItem] = useState<any[]>([]);
  const [refreshing, setrefreshing] = useState(false);
  const [renderMe, setrenderMe] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setloading] = useState(true);

  const [{ qnty, token }] = useStateValue();
  const [state, dispatch] = useStateValue();

  const isFocused = useIsFocused();

  useEffect(() => {
    let total = 0;
    let qty = 0;
    AddToCartServices.getAllCartItem()
      .then((res) => {
        console.log('====================================',res);
        setcartItem(res?.data?.packageList);
        res?.data?.packageList.map((item:any, index:number) => {
            // qty = qty + item?.qty;
            total = total +  ((item?.productVariation?.salePrice?item?.productVariation?.salePrice:item?.productVariation?.regularPrice) * item?.qty)

        })
        setTotalPrice(total);
        dispatch({
          type: actionTypes.GET_TOTAL,
          qnty: res?.data?.packageList.length,
        });
        setloading(false);
      })
      .catch((err) => {
        console.log("err in cart List", err);
        setloading(false);
      });
  }, [isFocused, refreshing, renderMe]);

  // increment cart item
  const qtyInc = (proId: Number, varId: Number) => {
    const data = {
      prodId: proId,
      prodVarId: varId,
      qty: 1,
    };
    AddToCartServices.addToCart(data)
      .then((res) => {
        showMessage({
          message: `${res?.message}`,
          type: "success",
          textStyle: { fontSize: 30 },
        });
        setrenderMe(!renderMe);
      })
      .catch((err) => {
        showMessage({
          message: `${err.message}`,
          type: "danger",
          textStyle: { fontSize: 30 },
        });
      });
  };

  // decrement cart item
  const qtyDec = (proId: Number, varId: Number, qty: Number) => {
    const data = {
      prodId: proId,
      prodVarId: varId,
      qty: -1,
    };
    if (qty > 1) {
      AddToCartServices.addToCart(data)
        .then((res) => {
          showMessage({
            message: `${res?.message}`,
            type: "success",
            textStyle: { fontSize: 30 },
          });
          setrenderMe(!renderMe);
        })
        .catch((err) => {
          showMessage({
            message: `${err.message}`,
            type: "danger",
            textStyle: { fontSize: 30 },
          });
        });
    }
  };

  // remove item

  const removeItem = async (proId: Number, varId: Number) => {
    const data = {
      prodId: proId,
      prodVarId: varId,
      qty: 0,
    };
    try {
      let res = await AddToCartServices.addToCart(data);
      if (res) {
        showMessage({
          message: `${res?.message}`,
          type: "success",
          textStyle: { fontSize: 30 },
        });
        setrenderMe(!renderMe);
      }
    } catch (error) {
      showMessage({
        message: `${error.message}`,
        type: "danger",
        textStyle: { fontSize: 30 },
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#FF9411" />
      <ScrollView style={{ marginBottom: 95 }}>
        <View style={styles.container1}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <AntDesign
              onPress={() => navigation.goBack()}
              name="left"
              size={30}
              color={"black"}
            ></AntDesign>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>MY CART</Text>
            <View></View>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          {cartItem?.length > 0 ? (
            cartItem?.map((item, index) => (
              <View style={[styles.card, { marginTop: 10 }]} key={index}>
                <View style={{ width: deviceWidth / 4 }}>
                  <Image
                    style={{ width: 100, resizeMode: "center", height: 100 }}
                    source={{
                      uri: `${apiImagepath}/${item?.product?.images[0]?.url}`,
                    }}
                  ></Image>
                </View>

                <View style={{ paddingVertical: 5 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginBottom: 5,
                      width: deviceWidth / 3,
                    }}
                  >
                    {item?.product?.title}
                  </Text>
                  <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Price :{" "}
                    {item?.productVariation?.salePrice
                      ? item?.productVariation?.salePrice
                      : item?.productVariation?.regularPrice}
                  </Text>
                  <View style={styles.qtyContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          qtyDec(
                            item?.product?.id,
                            item?.productVariation?.id,
                            item?.qty
                          )
                        }
                      >
                        <View style={[styles.qtyBtn, { marginRight: 10 }]}>
                          <AntDesign
                            style={{ fontSize: 20, color: "#fff" }}
                            name="minus"
                          ></AntDesign>
                        </View>
                      </TouchableOpacity>

                      <View style={styles.qtyInputBox}>
                        <TextInput
                          keyboardType="numeric"
                          style={{
                            fontSize: 20,
                            color: "#1239",
                            textAlign: "center",
                            marginVertical: -2,
                          }}
                          value={item?.qty.toString()}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          qtyInc(item?.product?.id, item?.productVariation?.id)
                        }
                      >
                        <View style={[styles.qtyBtn, { marginLeft: 10 }]}>
                          <AntDesign
                            style={{ fontSize: 20, color: "#fff" }}
                            name="plus"
                          ></AntDesign>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={styles.card4}>
                  <AntDesign
                    style={{ marginTop: 5 }}
                    onPress={() =>
                      removeItem(item?.product?.id, item?.productVariation?.id)
                    }
                    name="closecircleo"
                    size={20}
                    color="black"
                  ></AntDesign>
                  <Text
                    style={{ fontSize: 16, fontWeight: "700", marginBottom: 5 }}
                  >
                    TK:{" "}
                    {item?.productVariation?.salePrice > 0
                      ? item?.productVariation?.salePrice * item?.qty
                      : item?.productVariation?.regularPrice * item?.qty}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                justifyContent: "center",
                marginTop: deviceHeight / 2 - 100,
              }}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#e01221" />
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 20, color: "red" }}>
                    No Items Found !!
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          zIndex: 999,
          bottom: 0,
          left: 5,
          backgroundColor: "#fff",
          height: 90,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingBottom: 5,
          }}
        >
          <Text style={{ fontSize: 18 }}>Total:</Text>
          <Text style={{ fontSize: 18 }}>TK {totalPrice}</Text>
        </View>

        <TouchableOpacity
          disabled={cartItem?.length > 0 ? false : true}
          onPress={() => navigation.navigate("CheckoutScreen")}
          style={{
            backgroundColor: "#1C6E7A",
            padding: 10,
            width: deviceWidth - 10,
            alignItems: "center",
            borderRadius: 5,
          }}
        >
          <Text style={[styles.title]}>CHECK OUT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  container1: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#FF9411",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "normal",
  },
  qtyContainer: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    // marginTop:40
    // paddingHorizontal: 10,
  },
  card: {
    width: deviceWidth - 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems:'center',
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  card4: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    // paddingVertical: 8,
    alignItems: "flex-end",
  },
  tableColumn3: {
    width: deviceWidth / 4 + 10,
    flexDirection: "column",
    paddingHorizontal: 15,
    marginLeft: 5,
    alignItems: "flex-end",
    justifyContent: "space-around",
  },
  textColor: {
    color: "#7B7B7B",
  },
  infoText: {
    color: "#7B7B7B",
    fontSize: 15,
    fontWeight: "bold",
  },
  img: {
    width: "100%",
    height: "50%",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    // resizeMode:'center',
    // borderWidth:.1
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  qtyBtn: {
    backgroundColor: "#1234",
    borderRadius: 100,
    padding: 2,
  },
  qtyInputBox: {
    paddingHorizontal: 10,
    justifyContent: "center",
    textAlign: "center",
  },
});
