import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import ProductCard from "../components/ProductCard";
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
  const route = useRoute();
  const { title,slug } = route.params;

  const [products, setproducts] = useState([]);

  const [refreshing, setrefreshing] = useState(false);
  const [renderMe, setrenderMe] = useState(false);

  useEffect(() => {
    BrandAndShopServices.getBrandWiseProduct(slug)
      .then((res) => {
        console.log('.........',res?.data);
        
        setproducts(res?.data);
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
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}
              >
               {title}
              </Text>
              <View></View>
            </View>
          </View>
          <ScrollView>
          <View style={{ marginBottom: 20,alignItems:'center' }}>
            

                <View style={styles.CardContainer}>
                    <ProductCard products={products}/>
                </View>
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
