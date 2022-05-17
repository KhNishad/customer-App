import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const apiImagepath = "http://103.119.71.9:4400/media";

export default function ProductCard({ products }: any) {
  const navigation = useNavigation();

  // console.log("..........", products);

  return (
    <>
      {products?.length > 0 ? (
        <>
          {products?.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("ProductDetails", { title: item.slug })
              }
              style={styles.card}
            >
              {item?.images?.length ? (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 5,
                  }}
                >
                  <Image
                    style={styles.img}
                    source={{ uri: `${apiImagepath}/${item?.images[0]?.url}` }}
                  ></Image>
                </View>
              ) : null}
              <View style={{ margin: 5 }}>
                <Text
                  numberOfLines={2}
                  style={{ fontSize: 12, fontWeight: "bold" }}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 10, color: "#1239" }}>
                    {item?.brand?.title}
                  </Text>
                  {/* <EvilIcons name='heart' size={20} /> */}
                </View>
                {item?.productVariation[0]?.isNagotiable == true ? 
                <View>
                  <Text style={{fontSize:11}}> <Text style={{color:'red'}}>**</Text>Price Negotiable</Text>
                </View>
                :
                <>
                
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  Tk.{item?.productVariation[0]?.regularPrice}
                </Text>
                {item?.productVariation[0]?.salePrice == 0 ?
                  null :
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ fontSize: 10, textDecorationLine: "line-through" }}
                    >
                      Tk.{item?.productVariation[0]?.salePrice}
                    </Text>
                  </View>
                }
                </>
}
              </View>
            </TouchableOpacity>
          ))}
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "normal",
  },

  card: {
    width: deviceWidth / 3 - 15,
    height: 190,
    borderWidth: 0.5,
    borderRadius: 5,
    marginRight: 10,
    borderColor: "#1234",
    marginBottom: 10,
    // boxWithShadow: {
    //     elevation: 5
    // }
  },
  icons: {
    alignItems: "center",
    width: deviceWidth / 6 - 2,
    textAlign: "center",
  },
  img: {
    width: "99.9%",
    height: 100,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    // resizeMode:'center',
    // borderWidth:.1
  },
});
