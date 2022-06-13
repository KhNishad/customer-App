import React from 'react';
import {View,Dimensions,Image,StyleSheet} from 'react-native';
import Carousel from 'react-native-looped-carousel';
// import img from '../assets/images/banner-and-eCommerce.jpg'
import { useNavigation} from '@react-navigation/native';
const apiImagepath = 'http://103.119.71.9:4400/media';

import { TouchableOpacity } from 'react-native-gesture-handler';



const deviceWidth = Dimensions.get('window').width

const width = Dimensions.get('window').width-20
const height = 180;
let  bannerson ;
export default function CarouselExample({banner}:any) {

// bannerson = banner['homePage:banners']


// console.log('....................res',banner);


  const navigation = useNavigation();


    return (
      <View  style={{paddingTop:10,backgroundColor:'#fff'}}>
         {/* {Object.keys(images).length == 0?null: */}
      
         <View style={{alignItems:'center'}}>
            {banner?.length > 0?
              //  main banner 
             <Carousel  bullets={true} bulletStyle={{backgroundColor:"#ec1d25",borderColor:"#ec1d25"}} chosenBulletStyle={{backgroundColor:'red',width:20}} delay={4000} style={{width:width,height:height}}>
                {banner?.map((item:any,index:number)=>
                  <TouchableOpacity key={index}>
                    <Image style={styles.mainBanner}  source={{ uri: `${apiImagepath}/${item?.image?.url}`}}></Image>
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
