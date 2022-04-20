import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions, RefreshControl, Image, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useScrollToTop } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
// import Spinner from 'react-native-loading-spinner-overlay';

// components 
import Header from '../components/Header';
import TopCategories from '../components/topCategories';
// services
import categoryService from '../services/categoryServices';
import productService from '../services/productService';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const apiImagepath = 'http://103.119.71.9:4400/media';
// import BaseUrl from '../utils/imagePath';

// pull refresh  function
function wait(time: any) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export default function CategoryScreen() {

  const ref = React.useRef(null);

  // scroll to top

  useScrollToTop(ref);
  const navigation = useNavigation();

  const [allCategories, setallCategories] = useState<any[]>([])
  const [refreshing, setrefreshing] = useState(false)
  const [renderMe, setrenderMe] = useState(false)
  const [childCat, setchildCat] = useState([])
  const [banner, setbanner] = useState('')
  const [selected, setselected] = useState('')

  // refresh 
  const refresh = React.useCallback(() => {
    setrefreshing(true)
    wait(1000).then(() => {
      setrefreshing(false)
    })
  }, [refreshing])

  // get categories 
  useEffect(() => {

    categoryService.getAllCategories().then(res => {
        // console.log('====================================res',res);
        
      setallCategories(res?.data)
      setchildCat(res[0]?.childTermValues)
      setbanner(res[0]?.images?.banner?.url)
      setselected(res[0]?.slug)
      if (!childCat) {
        setrenderMe(!renderMe)
      }
    }).catch(err => { console.log(err) });
  }, [refreshing])


  // const getProducts = async (slug:any,childs:any) =>{

  //   try {
  //   let res  =  await productService.getCatWiseProduct(slug)
  //         if(res?.data?.length>0){
  //             navigation.navigate('categoryWiseProductScreen', { slug: slug, pro: res?.data,childs:childs})
  //          }
  //   } catch (error) {
  //     console.log('err in cat wise pro',err);
  //   }
  // }
  



  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Header />
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.container}>
          <ScrollView ref={ref} style={{ marginBottom: 200 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
            {allCategories?.length > 0 ?
              allCategories?.map((item, index) =>
                <TouchableOpacity key={index} onPress={() => {
                  setchildCat(item?.children)
                  setbanner(item?.images?.banner?.url)
                  setselected(item?.slug)
                  // getProducts(item?.slug,item?.children)
                }}>
                  {item?.slug == selected ?
                    <View style={[styles.categoryScrollView, { borderColor: '#e01221' }]} >
                      <Image style={{ width: 40, height: 40 }} source={{
                        uri:`${apiImagepath}/${item?.images[0]?.imageUrl}`
                      }}></Image>
                      <Text style={styles.title}>{item?.title}</Text>
                    </View>
                    :
                    <View style={styles.categoryScrollView} >
                      <Image style={{ width: 40, height: 40 }} source={{
                        uri: `${apiImagepath}/${item?.images[0]?.imageUrl}`}}></Image>
                      <Text style={{ color: '#535353', textAlign: 'center', fontSize: 12 }}>{item?.title}</Text>
                    </View>
                  }
                </TouchableOpacity>
              )
              :
              <View style={{ justifyContent: "center", marginTop: deviceHeight / 2 - 100 }}>
                <ActivityIndicator size="small" color="#e01221" />
              </View>
            }
          </ScrollView>
        </View>
        <View>
          {childCat?.length > 0 ?
            <TopCategories childCat={childCat} banner={banner} />
            :
            <View style={{ margin: deviceWidth / 4 }}>
              {allCategories?.length > 0 ?
                <Text style={{ color: '#e01221' }}>No items found</Text>
                : null}
            </View>
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: deviceWidth / 3 - 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },

  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  topCategoryView: {
    width: deviceWidth / 3,
    borderWidth: .5,
    borderColor: '#BB2025',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  categoryScrollView: {
    width: deviceWidth / 3 - 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',


  },
  title: {
    color: '#e01221',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold'
  }

});
