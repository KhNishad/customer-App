import { Ionicons } from "@expo/vector-icons";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Header2 from "../components/header2";
// com
import ProductCard from "../components/ProductCard";
// services
import categoryService from "../services/categoryServices";
import productService from "../services/productService";

const apiImagepath = "http://103.119.71.9:4400/media";
const deviceWidth = Dimensions.get("window").width;
const deviceHeaight = Dimensions.get("window").height;

let current=1;
export default function TopCategories() {
  const navigation = useNavigation();
  const [topCategories, settopCategories] = useState<any>({});
  const [categoryWisePro, setcategoryWisePro] = useState<any>([]);
  const [bannerrs, setbanner] = useState("");
  const [selectedCat, setselectedCat] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [count, setcount] = useState(0);
  const [filterItems, setfilterItems] = useState([]);
  const [openFilter, setopenFilter] = useState(false);
  const [subSub, setsubSub] = useState("");
  const [selectedIds, setselectedIds] = useState([]);

  const route = useRoute();
  const isFocused = useIsFocused();

  const { slug, pro, childs } = route.params;

  useEffect(() => {
    setcategoryWisePro(pro);
    setselectedIds([]);
    categoryService
      .categoryFilter(slug)
      .then((res) => {
        setfilterItems(res?.data?.filterOptions);
      })
      .catch((err) => {
        console.log("err....", err);
      });
  }, [slug]);

  // get child category or product under category
  const getChildCategory = (slugg: any) => {
    current = 1
    setsubSub(slugg);
    productService
      .getCatWiseProduct(slugg,1,18)
      .then((res) => {
        if (res?.data) {
          setcategoryWisePro(res?.data);
          categoryService
            .categoryFilter(slugg)
            .then((res) => {
              setfilterItems(res?.data?.filterOptions);
            })
            .catch((err) => {
              console.log("..err", err);
            });
          setisLoading(false);
        }
      })
      .catch((err) => {
        console.log(err), setisLoading(false);
      });
  };
  // filter
  const makeFilter = async (id: number) => {
    let idArr = selectedIds;
    let indexMe = idArr.findIndex((e) => e == id);
    if (indexMe > -1) {
      idArr.splice(indexMe, 1);
    } else {
      idArr.push(id);
    }
    setselectedIds(idArr);
    try {
      let res = await categoryService.categoryFilterSPec(
        subSub ? subSub : slug,
        idArr
      );
      filterProduct(idArr);
      setfilterItems(res?.data?.filterOptions);
    } catch (error) {}
  };

  const filterProduct = async (id: number) => {
    try {
      let res = await categoryService.getCatWiseProductss(
        subSub ? subSub : slug,
        id
      );
      // console.log(".................products", res?.data);

      setcategoryWisePro(res?.data);
    } catch (error) {}
  };



  // lazay loading in react native
  const lazayLoading = async () => {
    setisLoading(true);
    current = current + 1;

    productService
      .getCatWiseProduct(subSub || slug, current, 18)
      .then((res) => {
          setcategoryWisePro([...categoryWisePro, ...res?.data]);
          setisLoading(false);
      })
      .catch((err) => {
        console.log(err), setisLoading(false);
      });
  };
  // fire event when scroll ends

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  return (
    <View
      style={{
        backgroundColor: "#fff",
        height: deviceHeaight,
        alignItems: "center",
      }}
    >
      <Header2 filter={true} setopenFilter={setopenFilter} />
      {/* <SafeAreaView> */}
      <ScrollView
        style={{ marginBottom: 10 }}
        removeClippedSubviews={true}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            lazayLoading();
          }
        }}
      >
        <View removeClippedSubviews={true}>
          <View
            style={{
              paddingHorizontal: 10,
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            {childs?.images?.length ? (
              <Image
                style={styles.banner}
                source={{
                  uri: `${apiImagepath}/${childs.images[0]?.bannerUrl}`,
                }}
              ></Image>
            ) : null}
            {childs && childs.length > 0 ? (
              <ScrollView
                style={styles.horizontalScroll}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.flashSaleContainer}>
                  {childs.map((item: any, index: number) => (
                    <View style={styles.flashSaleCard} key={index}>
                      <View style={{ width: "100%", height: "50%" }}>
                        <TouchableOpacity
                          onPress={() => getChildCategory(item?.slug)}
                        >
                          <Image
                            style={{
                              width: "100%",
                              height: "100%",
                              resizeMode: "contain",
                            }}
                            source={{
                              uri: `${apiImagepath}/${item.images[0]?.imageUrl}`,
                            }}
                          ></Image>
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: "100%", height: "50%" }}>
                        <TouchableOpacity
                         onPress={() => getChildCategory(item?.slug)}
                          style={{
                            flexDirection: "row",
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            onPress={() => getChildCategory(item?.slug)}
                            numberOfLines={2}
                            style={{
                              fontSize: 10,
                              flexShrink: 1,
                              textAlign: "center",
                              width: "90%",
                            }}
                          >
                            {item?.title}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            ) : null}
            {topCategories?.category?.childTermValues?.length > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={[styles.title, { color: "#e01221" }]}>
                  {selectedCat ? selectedCat : "title"}
                </Text>
                <Text style={styles.title}>Items {count}</Text>
              </View>
            ) : null}
          </View>
          {categoryWisePro?.length > 0 ? (
            <View
              style={{
                paddingHorizontal: 5,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <ProductCard products={categoryWisePro} />
            </View>
          ) : (
            <>
              {isLoading ? (
                <ActivityIndicator size="small" color="#e01221" />
              ) : null}
            </>
          )}
        </View>

        <View style={{ alignItems: "center", marginTop: 50 }}>
          {categoryWisePro && !isLoading && categoryWisePro?.length <= 0 ? (
            <Text style={{ fontSize: 16 }}>No Items Found</Text>
          ) : null}
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
      {openFilter ? (
        // <FilterModal  setopenFilter={setopenFilter} openFilter={openFilter} filterItems={filterItems}/>
        <View
          style={[styles.filterDrawer, { marginLeft: openFilter ? 0 : 300 }]}
        >
          <ScrollView removeClippedSubviews={true} style={{ marginBottom: 60 }}>
            <TouchableOpacity
              onPress={() => setopenFilter(false)}
              style={{ alignItems: "flex-end", padding: 5, marginRight: 5 }}
            >
              <Ionicons name="close-circle-outline" color="#BB2227" size={30} />
            </TouchableOpacity>
            {filterItems?.brands?.length > 0 ? (
              <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 16, padding: 5 }}>Brands</Text>
                <View
                  style={{
                    flexDirection: "row",
                    paddingBottom: 10,
                    flex: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {filterItems?.brands?.map((item, index) => (
                    <View
                      style={{ margin: 2, width: "30%", alignItems: "center" }}
                    >
                      {/* {selectedBrand == item?.id? */}
                      <TouchableOpacity
                        onPress={() => makeFilter(item?.id)}
                        style={{
                          backgroundColor: "#BB2227",
                          paddingHorizontal: 5,
                        }}
                      >
                        <Text style={{ padding: 5, color: "#ffffff" }}>
                          {item?.title}
                        </Text>
                      </TouchableOpacity>
                      {/* :
                 <TouchableOpacity onPress={()=> selectBrand(item?.id)} style={{backgroundColor:'#F2F3F3',paddingHorizontal:5}}>
                     <Text style={{padding:5,color:'black'}}>{item?.title}</Text>
                 </TouchableOpacity>
                } */}
                    </View>
                  ))}
                </View>
              </View>
            ) : null}
            <View style={{ paddingHorizontal: 10 }}>
              <View>
                {filterItems?.attributes?.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      borderBottomWidth: 0.5,
                      borderBottomColor: "red",
                      borderTopColor: "red",
                      borderTopWidth: 0.5,
                      paddingVertical: 4,
                    }}
                  >
                    <TouchableOpacity style={styles.termValues}>
                      <Text style={{ padding: 4, fontSize: 14 }}>
                        {item?.term?.title}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        width: deviceWidth / 1.5,
                        flex: 1,
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {item?.values?.map((items, indexs) => (
                        <View
                          key={indexs}
                          style={{
                            backgroundColor: items?.isSelected
                              ? "red"
                              : "#F2F3F3",
                            margin: 5,
                            width: "42%",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => makeFilter(items?.id)}
                          >
                            <Text
                              style={{
                                padding: 5,
                                color: items?.isSelected ? "#fff" : "black",
                              }}
                            >
                              {items?.title}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flashSaleContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    height: 70,
    borderRadius: 5,
  },
  filterDrawer: {
    backgroundColor: "#fff",
    width: deviceWidth / 1.5,
    height: deviceHeaight,
    position: "absolute",
    zIndex: 9999,
    borderRightColor: "red",
    borderRightWidth: 0.5,
    left: 130,
    top: 55,
    borderLeftWidth: 1,
    borderLeftColor: "#1234",
  },
  termValues: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  flashSaleCard: {
    width: 80,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 5,
    marginTop: 10,
  },
  cardPriceText: {
    textDecorationLine: "line-through",
    fontSize: 10,
    marginRight: 10,
    color: "#999999",
  },
  banner: {
    width: deviceWidth - 20,
    height: 100,
    paddingHorizontal: 2,
    resizeMode: "stretch",
    borderColor: "#fff",
    borderWidth: 0.1,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    color: "black",
  },
  horizontalScroll: {
    borderWidth: 0.5,
    borderColor: "#ddd",
    height: 80,
    borderRadius: 5,
    marginBottom: 5,
  },
});
