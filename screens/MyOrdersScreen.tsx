import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// components

// img
import OrderServices from "../services/OrderServices";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

// pull refresh  function
function wait(time: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default function TabTwoScreen(props: any) {
  const navigation = useNavigation<any>();

  const [allorders, setallorders] = useState([]);

  const [refreshing, setrefreshing] = useState(false);
  const [renderMe, setrenderMe] = useState(false);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    OrderServices.getAllOrder()
      .then((res) => {
        setallorders(res?.data);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refreshing]);

  const refresh = React.useCallback(() => {
    setrefreshing(true);
    wait(1000).then(() => {
      setrefreshing(false);
    });
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF9411" />

      <SafeAreaView>
        <View style={styles.container1}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <AntDesign
              onPress={() => navigation.goBack()}
              name="left"
              size={25}
              color={"black"}
            ></AntDesign>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              My Order
            </Text>
            <View></View>
          </View>
        </View>
        {!loading ? (
          <ScrollView>
            <View style={{ marginBottom: 10 }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                {allorders?.length > 0 ? (
                  allorders?.map((item: any, index: number) => (
                    <View key={index} style={styles.card}>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#ebe8e8",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 14, padding: 15 }}>
                          Order No :{item?.orderNo}
                        </Text>
                        <Text style={{ fontSize: 14, padding: 15 }}>
                          Date:{moment(item?.createdAt).format("ll")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingHorizontal: 15,
                          paddingVertical: 5,
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Qunatity :{item?.cQuantity}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          >
                            Delevery Charge: :TK {item?.cDeliveryCharge}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          Total Amount : TK {item?.cSubTotalAmount}
                        </Text>
                      </View>
                      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 15 }}>Payment Status:{item?.paymentStatus}</Text>
                </View> */}
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("OrderDetails", {
                              id: item?.id,
                            })
                          }
                          style={{
                            backgroundColor: "#FF9411",
                            borderTopRightRadius: 5,
                            borderBottomRightRadius: 5,
                            paddingHorizontal: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              padding: 10,
                            }}
                          >
                            Details
                          </Text>
                        </TouchableOpacity>

                        <Text
                          style={{
                            color: "#ec1d25",
                            fontSize: 14,
                            fontWeight: "bold",
                            padding: 15,
                          }}
                        >
                          {item?.orderStatus}
                        </Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      marginTop: deviceHeight / 2.5,
                    }}
                  >
                    <Text style={{ color: "red" }}>No Order Yet</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={{ alignItems: "center", marginTop: deviceHeight / 2.5 }}>
            <ActivityIndicator size="large" color="#FF9411" />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#FF9411",
    borderBottomWidth: 0.5,
  },
  deleverd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  card: {
    //    width:deviceWidth/1.1,
    backgroundColor: "#fff",
    elevation: 7,
    borderRadius: 5,
    paddingVertical: 5,
  },
});
