

import * as React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, BackHandler, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';

// services 
import categoryService from '../services/categoryServices';
import productService from '../services/productService';

// com
import ProductCard from '../components/ProductCard';
import Header2 from '../components/header2'

const apiImagepath = 'http://103.119.71.9:4400/media';
const deviceWidth = Dimensions.get('window').width
const deviceHeaight = Dimensions.get('window').height



export default function TopCategories() {


  const navigation = useNavigation();
  const [topCategories, settopCategories] = useState<any>({})
  const [categoryWisePro, setcategoryWisePro] = useState([])
  const [bannerrs, setbanner] = useState('')
  const [selectedCat, setselectedCat] = useState('')
  const [isLoading, setisLoading] = useState(false);
  const [slugg, setslugg] = useState('')
  const [count, setcount] = useState(0)


  const route = useRoute();
  const isFocused = useIsFocused();

  const { slug, pro,childs } = route.params;
  console.log('...............receoved',pro);
  

  // // back press handle
  // useEffect(() => {

  //   const backAction = () => {

  //     navigation.goBack()

  //     return true;
  //   };

  //   // handle hard back press
  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  //   return () => backHandler.remove();
  // }, []);

  // useEffect(() => {

  //   topCats = []
  //   setslugg(slug)

  //   categoryService.getSingleCategory(slug).then(res => {

  //     setcount(res?.count)
  //     topCats = res?.data
  //     settopCategories(topCats)
  //     setcategoryWisePro(pro)
  //     setselectedCat(res?.data?.category?.title)
  //     setbanner(res?.data?.category?.images?.banner?.url)

  //     if (res?.data?.products?.length > 0) {
  //       setcategoryWisePro(res?.data?.products?.splice(0, 20))
  //     }

  //   }).catch(err => { console.log(err), setisLoading(false) });


  // }, [slug])

  useEffect(() => {

    // topCats = []
    setcategoryWisePro(pro)
    // setcategoryWisePro([])
    // setbanner('')

  }, [slug])

  // get child category or product under category
  const getChildCategory = (slug: any) => {

    productService.getCatWiseProduct(slug).then(res => {
      
      if (res?.data) {
        setcategoryWisePro(res?.data)
        setisLoading(false)
      }
    }).catch(err => { console.log(err), setisLoading(false) })

  }

  // lazay loading in react native
  const lazayLoading = async () => {

    setisLoading(true)
    current = current + 1;

    categoryService.categoryWiseProduct(slugg, limit, current).then(res => {

      if (res?.data?.products?.length > 0) {

        let dataAr = categoryWisePro;
        res?.data?.products?.map((item, i) => {
          dataAr?.push(item)
        })
        setcategoryWisePro(dataAr)


        // setcategoryWisePro(res?.data?.products)
        setisLoading(false)
      } else {
        setisLoading(false)

      }
    }).catch(err => { console.log(err), setisLoading(false) })


  }
  // fire event when scroll ends

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  return (
    <View style={{ backgroundColor: '#fff', height: deviceHeaight }}>
      <Header2/>
      <SafeAreaView>

        <ScrollView style={{ marginBottom: 165 }} removeClippedSubviews={true} onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) { lazayLoading() }
        }}>

          <View removeClippedSubviews={true}>
            <View style={{ paddingHorizontal: 10 }}>
              {bannerrs?
              <Image style={styles.banner} source={{ uri: `${apiImagepath}/${bannerrs}` }}></Image>
              :null}
              {childs && childs.length > 0 ?
                <ScrollView style={styles.horizontalScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={styles.flashSaleContainer}>
                    {childs.map((item: any, index: number) =>
                      <View style={styles.flashSaleCard} key={index}>
                        <View style={{ width: '100%', height: "50%" }}>
                          <TouchableOpacity onPress={() => getChildCategory(item?.slug)}>
                            <Image style={{ width: "100%", height: "100%", resizeMode: 'contain' }} source={{ uri: `${apiImagepath}/${item.images[0]?.imageUrl}`}}></Image>
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: '100%', height: '50%' }}>
                          <View style={{ flexDirection: 'row', height: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <Text onPress={() => getChildCategory(item?.slug)}  numberOfLines={2} style={{ fontSize: 10, flexShrink: 1, textAlign: 'center', width: '90%' }}>{item?.title}</Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </ScrollView >
                :
                null
              }
              {topCategories?.category?.childTermValues?.length > 0 ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <Text style={[styles.title, { color: '#e01221' }]}>{selectedCat ? selectedCat : 'title'}</Text>
                  <Text style={styles.title}>Items {count}</Text>
                </View>
                : null}
            </View>
            {categoryWisePro?.length > 0 ?

              <View style={{ paddingHorizontal: 10,flexDirection:'row',alignItems:'center',flexWrap:'wrap', }}>

                <ProductCard products={categoryWisePro} />

              </View> 
              :
              <>
                {isLoading?
                <ActivityIndicator size="small" color="#e01221" />
                :
                null}
              </>
            }
          </View>

          <View style={{ alignItems: 'center', marginTop: 50 }}>
            {categoryWisePro && !isLoading && categoryWisePro?.length <= 0 ?
              <Text style={{ fontSize: 16 }}>No Items Found</Text>
              : null}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

  flashSaleContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    height: 70,
    borderRadius: 5,


  },
  flashSaleCard: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 5,
    marginTop: 10
  },
  cardPriceText: {
    textDecorationLine: 'line-through',
    fontSize: 10,
    marginRight: 10,
    color: '#999999'
  },
  banner: {
    width: deviceWidth - 20,
    height: 100,
    paddingHorizontal: 2,
    resizeMode: 'stretch',
    borderColor: '#fff',
    borderWidth: .1,
    borderRadius: 5,
    marginVertical: 10

  },
  title: {
    fontSize: 14,
    color: 'black'
  },
  horizontalScroll: {
    borderWidth: .5,
    borderColor: '#ddd',
    height: 80,
    borderRadius: 5,
    marginBottom:5
  }
});
