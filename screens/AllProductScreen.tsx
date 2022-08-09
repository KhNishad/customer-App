import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
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
import ProductCard from "../components/ProductCard";
// img

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

// pull refresh  function
function wait(time: any) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export default function TabTwoScreen(props: any) {
  const navigation = useNavigation();
  const route = useRoute();

  const { title, products } = route.params;

  const [isLoading, setisLoading] = useState(false);

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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="left" size={25} color={"black"}></AntDesign>
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
              {title ? title : ""}
            </Text>
            <View></View>
          </View>
        </View>
        <ScrollView>
          <View style={{ marginBottom: 20, alignItems: "center" }}>
            {products?.length > 0 ? (
              <View style={styles.CardContainer}>
                <ProductCard products={products} />
              </View>
            ) : (
              <>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#e01221" />
                ) : (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ color: "red" }}>No Items Found</Text>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // backgroundColor:'#FF9411',
    // paddingTop:deviceHeight/6
  },
  container1: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#FF9411",
    borderBottomWidth: 0.5,
  },

  CardContainer: {
    paddingHorizontal: 5,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
