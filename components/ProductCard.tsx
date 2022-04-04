
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TextInput, Button, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { FontAwesome, EvilIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";



const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default function ProductCard({products}:any) {


    console.log("..........card",products);
    
    
  const navigation = useNavigation();

  // Object {
  //   "activeStatus": 1,
  //   "brand": Object {
  //     "slug": "fresh-1648225292258",
  //     "title": "Fresh",
  //   },
  //   "category": Object {
  //     "slug": "oil-1648225014547",
  //     "title": "Oil",
  //   },
  //   "createdAt": "Mar 26, 2022 1:02:49 PM",
  //   "id": 12,
  //   "productVariation": Array [
  //     Object {
  //       "regularPrice": 200,
  //       "salePrice": 0,
  //     },
  //   ],
  //   "slug": "cooking-oil-2-litre-1648278169485",
  //   "title": "Cooking Oil 2 Litre",
  // },

  return (
             <>
             {products?.map((item:any,index:number)=>
              <TouchableOpacity key={index} onPress={()=> navigation.navigate('ProductDetails',{title:item.slug})} style={styles.card}>

                <View style={{ alignItems: 'center', justifyContent: 'center',elevation:5 }}>
                  {/* <Image style={styles.img} source={image?.imageLink}></Image> */}
                </View>
                <View style={{ margin: 5 ,}}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.title}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10, color: '#1239' }}>{item?.brand?.title}</Text>
                    <EvilIcons name='heart' size={20} />
                  </View>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }}>${item?.productVariation[0]?.regularPrice}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 10, textDecorationLine: 'line-through' }}>${item?.productVariation[0]?.salePrice}</Text>
                    <EvilIcons name='cart' size={20} />
                  </View>
                </View>

              </TouchableOpacity>
             )}

            </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: "normal",
  },
  input: {
    height: 40,
    width: deviceWidth / 1.2,
    margin: 12,
    borderWidth: .5,
    padding: 10,
    borderColor: '#fff',
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  mainBanner: {
    width: 40,
    height: 40,
    borderWidth: .1,
    borderColor: '#fff',
    borderRadius: 5,
    resizeMode: 'stretch'
  },
  CardContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: deviceWidth / 3 - 15,
    height: 180,
    borderWidth: .5,
    borderRadius: 5,
    marginRight:10,
    borderColor:'#1234',
    // boxWithShadow: {
    //     elevation: 5
    // }

  },
  icons:{
    alignItems: 'center',
    width: deviceWidth / 6 - 2,
    textAlign:'center' 

  },
  img:{
    width: '99.9%',
    height: 100,
    borderTopRightRadius:5,
    borderTopLeftRadius:5,
    // resizeMode:'center',
    // borderWidth:.1
  }
});
