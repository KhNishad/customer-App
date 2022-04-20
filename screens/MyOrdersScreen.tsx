import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// components

// img
import BrandAndShopServices  from "../services/BrandAndShopServices";

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

  const [allBrands, setallBrands] = useState([]);

  const [refreshing, setrefreshing] = useState(false);
  const [renderMe, setrenderMe] = useState(false);

  useEffect(() => {
    BrandAndShopServices.getAllBrand()
      .then((res) => {
        setallBrands(res.slice(0,21));
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
                onPress={() => navigation.navigate("HomeScreen")}
                name="left"
                size={25}
                color={"black"}
              ></AntDesign>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}
              >
                My Order
              </Text>
              <View></View>
            </View>
          </View>
          <ScrollView>
          <View style={{ marginBottom: 10 }}>
            

            
          </View>
        </ScrollView>
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

});
