

import * as React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// services 
import categoryService from '../services/categoryServices';

const apiImagepath = 'http://103.119.71.9:4400/media';
const deviceWidth = Dimensions.get('window').width

export default function TopCategories({ childCat, banner }: any) {


  const navigation = useNavigation();


  // const getChildCategory = (slug: any, title: string) => {

  //   categoryService.getSingleCategory(slug).then(res => {
  //     topCats = res?.data

  //     if (res?.data?.products) {

  //       navigation.navigate('CategoryProduct', { slug: slug, pro: res?.data?.products?.slice(0, 70), banner: banner, title: title })

  //     }

  //   }).catch(err => console.log(err));


  // }

  return (
    <View>

      <SafeAreaView>
        <ScrollView style={{ marginBottom: 180 }} removeClippedSubviews={true}>
          <View >
            {childCat?.length > 0 ?
              <View style={{ backgroundColor: '#fff' }}>
                {banner ?
                  <View style={{ alignItems: 'center', paddingVertical: 2 }}>
                    <Image style={styles.bannerImg} source={{ uri: `${apiImagepath}/${banner.slice(0, banner.lastIndexOf(".")) + "_300X300" + banner.slice(banner.lastIndexOf("."))}` }}></Image>
                  </View> : null}
                <View style={styles.flashSaleContainer}>
                  {childCat?.map((item: any, index: number) =>
                    <View style={styles.flashSaleCard} key={index}>
                      <View style={{ width: '100%', height: "60%", marginTop: 2 }}>
                        <TouchableOpacity onPress={() => getChildCategory(item?.slug, item?.title)}>
                          <Image style={{ width: "99%", height: "99%", resizeMode: 'contain', padding: 1 }} source={{ uri: `${apiImagepath}/${item.images[0]?.imageUrl}`}}></Image>
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: '100%', height: '40%' }}>
                        <View style={styles.titleContainer}>
                          <Text style={{ fontSize: 12, flexShrink: 1, textAlign: 'center' }}>{item?.title}</Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
              :
              <View style={{ marginTop: deviceWidth / 2 + 50, marginLeft: deviceWidth / 2.8 }}>
                <ActivityIndicator size="small" color="#e01221" />
              </View>
            }
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({

  flashSaleContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: deviceWidth / 1.4
  },
  flashSaleCard: {
    width: "48%",
    height: deviceWidth / 3,
    backgroundColor: "#FFFF",
    justifyContent: 'center',
    alignItems: "center",
    borderWidth: .5,
    borderColor: '#ddd',
    marginBottom: 10,
    borderRadius: 5
  },

  bannerImg: {
    width: deviceWidth / 1.4,
    height: 100,
    marginLeft: 1,
    resizeMode: 'contain',
    borderColor: '#ddd',
    borderWidth: .5,
    // borderRadius:5
  },
  titleContainer: {
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
