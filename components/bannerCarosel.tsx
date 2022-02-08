import React from 'react';
import {View,Dimensions,Image,StyleSheet} from 'react-native';
import Carousel from 'react-native-looped-carousel';
// import img from '../assets/images/banner-and-eCommerce.jpg'
import { useNavigation} from '@react-navigation/native';

import { TouchableOpacity } from 'react-native-gesture-handler';



const deviceWidth = Dimensions.get('window').width

const width = Dimensions.get('window').width-20
const height = 180;
export default function CarouselExample({images}:any) {

  const navigation = useNavigation();

  const  banners = [
    {
      img:'',
      id:'1'
    }, {
      img:'',
      id:'2'
    }

  ]
 

    return (
      <View  style={{paddingTop:10,backgroundColor:'#fff'}}>
         {/* {Object.keys(images).length == 0?null: */}
      
         <View style={{alignItems:'center'}}>
            {banners?.length > 0?
              //  main banner 
             <Carousel  bullets={true} bulletStyle={{backgroundColor:"#ec1d25",borderColor:"#ec1d25"}} chosenBulletStyle={{backgroundColor:'red',width:20}} delay={4000} style={{width:width,height:height}}>
                {banners?.map((item,index)=>
                  <TouchableOpacity>
                    <Image style={styles.mainBanner}  source={require('../assets/images/banner-and-eCommerce.jpg')}></Image>
                  </TouchableOpacity>  
                )}

              </Carousel>
            :null}
         </View>
        {/* } */}
       
         
      </View>
    );
  
}
const styles = StyleSheet.create({
 
topBottomBanner:{
  width:deviceWidth/2-15,
  height:105,
  borderRadius:2,

},
topAndBottomContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:10,

},
mainBanner:{
  width:width,
  height:height,
  borderWidth:.1,
  borderColor:'#fff',
  borderRadius:5,
  resizeMode:'stretch'
}

});
