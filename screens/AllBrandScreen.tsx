import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const apiImagepath = "http://103.119.71.9:4400/media";

// components

// img
import BrandAndShopServices from "../services/BrandAndShopServices";

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

  const [allBrands, setallBrands] = useState([]);

  const [refreshing, setrefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);

  const route = useRoute();
  const { origin } = route.params;

  useEffect(() => {
    setIsLoading(true);
    if (origin == "Brand") {
      BrandAndShopServices.getAllBrand(currentPage)
        .then((res) => {
          // console.log("........", res?.data);

          setallBrands(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      BrandAndShopServices.getAllShop()
        .then((res) => {
          setallBrands(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refreshing]);

  const refresh = React.useCallback(() => {
    setrefreshing(true);
    wait(1000).then(() => {
      setrefreshing(false);
    });
  }, [refreshing]);

  const renderItem = ({ item, index }: any) => {
    return (
      <View key={index} style={{ paddingVertical: 5 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("BrandWiseProductScreen", {
              title: item?.title,
              slug: item?.slug,
              titlee: item?.name,
            })
          }
          style={styles.card3}
        >
          <View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                elevation: 5,
              }}
            >
              {origin == "Brand" ? (
                <>
                  {item?.images.length > 0 && item?.images[0]?.imageUrl ? (
                    <Image
                      style={styles.img}
                      source={{
                        uri: `${apiImagepath}/${item?.images[0]?.imageUrl}`,
                      }}
                    ></Image>
                  ) : (
                    <Image
                      style={styles.img}
                      source={require("../assets/images/gift-card.png")}
                    ></Image>
                  )}
                </>
              ) : (
                <>
                  {item?.logo ? (
                    <Image
                      style={styles.img}
                      source={{ uri: `${apiImagepath}/${item?.logo}` }}
                    ></Image>
                  ) : (
                    <Image
                      style={styles.img}
                      source={require("../assets/images/gift-card.png")}
                    ></Image>
                  )}
                </>
              )}
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
                padding: 2,
              }}
            >
              <Text
                style={{
                  width: 80,
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#000",
                }}
              >
                {origin == "Brand" ? item?.title : item?.name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const loadMoreItem = () => {
    setcurrentPage(currentPage + 1);
    setIsLoading(true);
    if (origin == "Brand") {
      BrandAndShopServices.getAllBrand(currentPage)
        .then((res) => {
          console.log(".................called");

          if (res?.data?.length > 0) {
            let dataArr = allBrands;
            res?.data?.map((item: any) => {
              dataArr?.push(item);
            });
            setallBrands(dataArr);
          } else {
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      BrandAndShopServices.getAllShop()
        .then((res) => {
          setallBrands(res?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="small" color="#FF9411" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF9411" />

      {/* <SafeAreaView> */}

      <View style={styles.container1}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="left" size={30} color={"black"}></AntDesign>
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
            All {origin}
          </Text>
          <View></View>
        </View>
      </View>
      <FlatList
        data={allBrands}
        contentContainerStyle={styles.CardContainer}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
        ListFooterComponent={renderLoader}
        onEndReached={() => loadMoreItem()}
        onEndReachedThreshold={0}
        legacyImplementation={true}
        numColumns={3}
      />
      {/* </SafeAreaView> */}
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
    alignItems: "center",
    paddingHorizontal: 10,
    // marginTop: 10,
  },

  card3: {
    width: deviceWidth / 3.5,
    height: 140,
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
    backgroundColor: "#fff",
  },

  img: {
    width: "99%",
    height: 95,
    resizeMode: "contain",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    // resizeMode:'center',
    // borderWidth:.1
  },
  ProductSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});
