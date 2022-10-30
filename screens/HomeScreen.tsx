import {
  useFocusEffect,
  useIsFocused,
  useNavigation
} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

// components
import Slider from "../components/bannerCarosel";
import Header from "../components/Header";
import LoginModal from "../components/LoginModal";
import ProductCard from "../components/ProductCard";

//services

import HomeServices from "../services/HomeServices";

// img

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function TabTwoScreen(props: any) {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [ModalOpen, setModalOpen] = useState(false);
  const [banner, setbanner] = useState([]);
  const [homeSection, setHomeSection] = useState<any>({});
  const [refreshing, setrefreshing] = useState(false);
  const [token, settoken] = useState("");
  const [loader, setloader] = useState(true);

  useEffect(() => {
    const data = {
      "homePage:banners": [{}],

      "homePage:innerSections": [{}],
    };
    HomeServices.homeSettings(data).then((res) => {
      setHomeSection(res?.data);
      setloader(false);
    });
  }, []);

  useFocusEffect(() => {
    const token = async () => {
      let tokenn = await SecureStore.getItemAsync("accessToken");
      if (tokenn) {
        settoken(tokenn);
      } else {
        settoken("");
      }
    };
    token();
  });

  // console.log("====================================ddd", homeSection);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF9411" />
      <Header />
      <SafeAreaView>
        {!loader ? (
          <ScrollView removeClippedSubviews={true} style={{width:'100%'}}>
            <View>
              <Slider banner={homeSection?.["homePage:banners"]} />
            </View>
            <View style={styles.iconSection}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CategoryScreen")}
                style={styles.icons}
              >
                <Image
                  style={styles.mainBanner}
                  source={require("../assets/images/categories.png")}
                ></Image>
                <Text style={{ fontSize: 10, textAlign: "center" }}>
                  Categories
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AllBrandScreen", { origin: "Brand" })
                }
                style={styles.icons}
              >
                <Image
                  style={styles.mainBanner}
                  source={require("../assets/images/layers.png")}
                ></Image>
                <Text style={{ fontSize: 10 }}>All Brand</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AllBrandScreen", { origin: "Shop" })
                }
                style={styles.icons}
              >
                <Image
                  style={styles.mainBanner}
                  source={require("../assets/images/gift-card.png")}
                ></Image>
                <Text style={{ fontSize: 10 }}>All Shop</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.icons}>
                <Image
                  style={styles.mainBanner}
                  source={require("../assets/images/mobile-app.png")}
                ></Image>
                <Text style={{ fontSize: 10 }}>Mobile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icons}>
                <Image
                  style={styles.mainBanner}
                  source={require("../assets/images/clothes-rack.png")}
                ></Image>
                <Text style={{ fontSize: 10 }}>Fashion</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icons}>
                <Image
                  style={styles.mainBanner}
                  source={require("../assets/images/electronics.png")}
                ></Image>
                <Text style={{ fontSize: 10 }}>Electronics</Text>
              </TouchableOpacity> */}
            </View>
            {homeSection?.["homePage:innerSections"]?.length > 0 ? (
              <View>
                {homeSection?.["homePage:innerSections"].map(
                  (item: any, index: number) => (
                    <View style={{ marginBottom: 10 }} key={index}>
                      <View style={styles.ProductSection}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          {item?.title}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("AllProductScreen", {
                              title: item?.title,
                              products: item?.productArray,
                            })
                          }
                        >
                          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                            See All{" "}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                      >
                        <View style={styles.CardContainer}>
                          {item?.productArray?.length > 0 ? (
                            <ProductCard
                              products={item?.productArray.slice(0, 10)}
                            />
                          ) : null}
                        </View>
                      </ScrollView>
                    </View>
                  )
                )}
              </View>
            ) : null}
          </ScrollView>
        ) : (
          <View style={{ alignItems: "center", marginTop: deviceHeight / 2.5 }}>
            <ActivityIndicator size="large" color="#FF9411" />
          </View>
        )}
      </SafeAreaView>
      {ModalOpen ? (
        <LoginModal setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor:'#FF9411',
    // paddingTop:deviceHeight/6
    marginBottom:50
    
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "normal",
  },
  input: {
    height: 40,
    width: deviceWidth / 1.2,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderColor: "#BBE5EB",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  mainBanner: {
    width: 40,
    height: 40,
    borderWidth: 0.1,
    borderColor: "#fff",
    borderRadius: 5,
    resizeMode: "stretch",
  },
  CardContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // flexWrap: 'wrap',
    justifyContent: "space-between",
  },
  card: {
    width: deviceWidth / 3 - 15,
    height: 180,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  icons: {
    alignItems: "center",
    width: deviceWidth / 6 - 2,
    textAlign: "center",
  },
  ProductSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  iconSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
