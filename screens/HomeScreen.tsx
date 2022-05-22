
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TextInput, Button, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';

// components
import Header from '../components/Header';
import Slider from '../components/bannerCarosel';
import ProductCard from '../components/ProductCard';
import LoginModal from '../components/LoginModal';

//services

import HomeServices from '../services/HomeServices';

// img




const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default function TabTwoScreen(props: any) {

  const navigation = useNavigation();
  const [ModalOpen, setModalOpen] = useState(false);
  const [banner, setbanner] = useState([])
  const [homeSection, setHomeSection] = useState<any>({})
  const [refreshing, setrefreshing] = useState(false)

  useEffect(() => {

    const data = {
      "homePage:banners": [
        {}
      ],

      "homePage:innerSections": [{

      }],
    }
    HomeServices.homeSettings(data).then((res) => {
      setHomeSection(res?.data)
      console.log('====================================', res?.data);

    })

  }, [refreshing])





  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF9411" />

      <SafeAreaView>
        <ScrollView>
          <Header />
          <View>
            <Slider banner={homeSection?.['homePage:banners']} />
          </View>
          <View style={styles.iconSection}>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen')} style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/categories.png')}></Image>
              <Text style={{ fontSize: 10, textAlign: 'center' }}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AllBrandScreen', { origin: 'Brand' })} style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/layers.png')}></Image>
              <Text style={{ fontSize: 10 }}>All Brand</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AllBrandScreen', { origin: 'Shop' })} style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/gift-card.png')}></Image>
              <Text style={{ fontSize: 10 }}>All Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/mobile-app.png')}></Image>
              <Text style={{ fontSize: 10 }}>Mobile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/clothes-rack.png')}></Image>
              <Text style={{ fontSize: 10 }}>Fashion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/electronics.png')}></Image>
              <Text style={{ fontSize: 10 }}>Electronics</Text>
            </TouchableOpacity>
          </View>
          {homeSection?.['homePage:innerSections']?.length > 0 ?
            <View>
              {homeSection?.['homePage:innerSections'].map((item: any, index: number) =>

                <View style={{ marginBottom: 10 }} key={index}>
                  <View style={styles.ProductSection}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item?.title}</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("AllProductScreen", {
                        title: item?.title,
                        products:item?.source,
                        
                      })}>
                      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>See All </Text>

                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.CardContainer}>
                      <ProductCard products={item?.source.slice(10)} />
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>
            : null}
        </ScrollView>
      </SafeAreaView>
      {ModalOpen ?
        <LoginModal setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
        : null}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor:'#FF9411',
    // paddingTop:deviceHeight/6
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
    borderColor: '#BBE5EB',
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
    paddingHorizontal: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  card: {
    width: deviceWidth / 3 - 15,
    height: 180,
    borderWidth: .5,
    borderRadius: 10

  },
  icons: {
    alignItems: 'center',
    width: deviceWidth / 6 - 2,
    textAlign: 'center'

  },
  ProductSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  iconSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5
  }
});
