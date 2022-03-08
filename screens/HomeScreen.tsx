
import { View, Text, StyleSheet, StatusBar, SafeAreaView, TextInput, Button, Image } from 'react-native';
import { Dimensions } from 'react-native'
import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import Modal from "react-native-modal";
import { Ionicons } from '@expo/vector-icons';

// components
import Header from '../components/Header';
import Slider from '../components/bannerCarosel';
import ProductCard from '../components/ProductCard';
import LoginModal from '../components/LoginModal';

// img




const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const data = [
  {
    id: "1",
    imageLink: require('../assets/images/jacket.jpg')
  },
  {
    id: "2",
    imageLink: require('../assets/images/mobile.jpg')
  },
  {
    id: "3",
    imageLink: require('../assets/images/product.jpg')
  }
]
export default function TabTwoScreen() {

  const navigation = useNavigation();
  const [ModalOpen, setModalOpen] = useState(false)






  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF9411" />

      <SafeAreaView>
        <ScrollView>
          <Header />
          <View>
            <Slider />
          </View>
          <View style={styles.iconSection}>
            <TouchableOpacity onPress={()=>setModalOpen(true)} style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/gift-card.png')}></Image>
              <Text  style={{ fontSize: 10,textAlign:'center' }}>Categories</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/gift-card.png')}></Image>
              <Text style={{ fontSize: 10 }}>Essential</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/gift-card.png')}></Image>
              <Text style={{ fontSize: 10 }}>Offer Zone</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/gift-card.png')}></Image>
              <Text style={{ fontSize: 10 }}>Mobile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/gift-card.png')}></Image>
              <Text style={{ fontSize: 10 }}>Fashion</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icons}>
              <Image style={styles.mainBanner} source={require('../assets/images/gift-card.png')}></Image>
              <Text style={{ fontSize: 10 }}>Electronics</Text>
            </TouchableOpacity>
          </View>

          <View style={{marginBottom:10}}>
              <View style={styles.ProductSection}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Popular </Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>See All </Text>
              </View>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.CardContainer}>
                  {Array.apply(null,{length:10}).map((item,index)=>
                      <ProductCard image={data[0]}/>
                  )}
                </View>
              </ScrollView>
          </View>
          <View style={{marginBottom:10}}>
            <View style={styles.ProductSection}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>New In Store </Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>See All </Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.CardContainer}>
                {Array.apply(null, {length: 10}).map((item,index)=>
                  <ProductCard key={index} image={data[1]}/>
                )}
              </View>
            </ScrollView>
           
          </View>

          <View style={{marginBottom:10}}>
            <View style={styles.ProductSection}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Editor Choice</Text>
              <Text style={{ fontSize: 15, fontWeight: 'bold' }}>See All </Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={styles.CardContainer}>
                {Array.apply(null, {length: 10}).map((item,index)=>
                  <ProductCard key={index} image={data[2]}/>
                )}
              </View>
            </ScrollView>
           
          </View>

        </ScrollView>
      </SafeAreaView>
      {ModalOpen?
           <LoginModal setModalOpen={setModalOpen} ModalOpen={ModalOpen}/>
      :null}


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
  icons:{
    alignItems: 'center',
    width: deviceWidth / 6 - 2,
    textAlign:'center' 

  },
  ProductSection:{
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10, 
    alignItems: 'center' ,
  },
  iconSection:{
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical:10,
    paddingHorizontal:5 
  }
});
