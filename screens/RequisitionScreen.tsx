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
import Requisition from "../services/RequisitionServices";

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

  const [allRequisition, setallRequisition] = useState([]);

  const [refreshing, setrefreshing] = useState(false);
  const [renderMe, setrenderMe] = useState(false);
  const [loader, setloader] = useState(true);

  useEffect(() => {
    Requisition.getRewuisition()
      .then((res) => {
        // console.log("..................", res);

        setallRequisition(res?.data);
        setloader(false);
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
              My Requisition
            </Text>
            <View></View>
          </View>
        </View>
        {!loader ? (
          <ScrollView>
            <View style={{ marginBottom: 10 }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                {allRequisition?.length > 0 ? (
                  allRequisition?.map((item: any, index: number) => (
                    <View style={styles.card} key={index}>
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: "#ebe8e8",
                          paddingVertical: 10,
                        }}
                      >
                        <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>
                          Requisition No :{item?.requisitionNo}
                        </Text>
                        <Text style={{ fontSize: 12, paddingHorizontal: 15 }}>
                          Date: {moment(item?.updatedAt).format("ll")}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            padding: 15,
                          }}
                        >
                          Qunatity :{item?.cQuantity}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            padding: 15,
                          }}
                        >
                          Total Amount : TK{item?.cSubTotalAmount}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                          paddingHorizontal: 10,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("RequisitionDetails", {
                              id: item?.id,
                            })
                          }
                          style={{
                            backgroundColor: "#FF9411",
                            borderRadius: 5,
                            paddingHorizontal: 10,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: "bold",
                              padding: 10,
                              color: "#fff",
                            }}
                          >
                            Details
                          </Text>
                        </TouchableOpacity>
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
                    <Text style={{ color: "red" }}>
                      {" "}
                      No Requisition Created
                    </Text>
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
    marginBottom: 10,
  },
});
