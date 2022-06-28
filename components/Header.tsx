
import { View, Text, StyleSheet, StatusBar, ScrollView, Image, ActivityIndicator, SafeAreaView, TextInput, Button, Alert } from 'react-native';
import { Dimensions } from 'react-native'
import { Ionicons, Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import { useEffect, useState, } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute,useIsFocused } from "@react-navigation/native";
import SearchService from '../services/SearchService';
import * as SecureStore from 'expo-secure-store';



const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default function TabTwoScreen() {

  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const [searchKeyWord, setsearchKeyWord] = useState('')
  const [suggestPro, setsuggestPro] = useState([])
  const [token, settoken] = useState('')


  // global search for product

   useEffect(() => {
    setsuggestPro([]);
    setsearchKeyWord('')

   },[isFocused])

  useEffect(() => {
    const token = async () => {
      let tokenn = await SecureStore.getItemAsync('accessToken')
      if (tokenn) {
        settoken(tokenn)
      } else {
        settoken('')
      }
    }
    token()

  }, [isFocused])

  const globalSearch = () => {

    SearchService.globalSearch(searchKeyWord).then(res => {

      if (res?.count > 0) {

        navigation.navigate('SearchProductScreen', { result: res?.data, keyWord: searchKeyWord })

      } else if (res?.count == 0) {
        setsearchKeyWord('')
        Alert.alert(
          "O Items found!",
          "Nothing Matched Your Search Key Word",
          [],
          { cancelable: true }
        );
      }
    }).catch(err => console.log("err", err))

  }



  // suggest search options 
  const globalSearch2 = (keyWord: any) => {

    setsearchKeyWord(keyWord)
    if (keyWord) {
      SearchService.globalSearch(keyWord).then(res => {
        setsuggestPro(res?.data.slice(0, 10))
      }).catch(err => console.log("err", err))

    }


  }

  const hurryOrder = () => {
    if (token) {
      navigation.navigate('HurryOrder')
    } else {
      alert('Login First')
    }
  }


  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image style={{ width: 80, height: 30, resizeMode: 'center' }} source={require('../assets/images/ESSA_Logo_PNG.png')}></Image>
          </TouchableOpacity>
          <View style={styles.input}>

            <TextInput
              value={searchKeyWord}
              style={{ width: deviceWidth / 2.7 }}
              placeholder="Search"
              onChangeText={searchKeyWord => {
                globalSearch2(searchKeyWord)
                setsearchKeyWord(searchKeyWord)
              }

              }
              // onBlur={()=>
              //   {
              //     setsearchKeyWord('')
              //     globalSearch2('')
              //     setsuggestPro([])
              //   }

              // }
              onSubmitEditing={() => globalSearch()}
            />
            <TouchableOpacity onPress={() => globalSearch()}>
              <Feather name='search' style={{ paddingRight: 5 }} color={'red'} size={20}></Feather>
            </TouchableOpacity>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* <Feather style={{marginRight:5}} name='mail' color={'#fff'} size={25}></Feather> */}
            {/* <Feather onPress={() => navigation.openDrawer()} name='bell' color={'#fff'} size={25}></Feather> */}
            <TouchableOpacity onPress={() => hurryOrder()}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Hurry Order</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
           <Text style={{fontSize:16,fontWeight:'bold',color:"black"}}>Grocery</Text>
         </View> */}
        </View>

      </View>
      {suggestPro && suggestPro?.length > 0 ? (
        <View
          style={{
            position: "absolute",
            zIndex: 9999,
            top: 55,
            backgroundColor: "#fff",
            width: deviceWidth,
          }}
        >
          {suggestPro &&
            suggestPro?.map((item: any, index: any) => (
              <TouchableOpacity key={index} onPress={() => navigation.navigate('SearchProductScreen', { keyWord: searchKeyWord })}>
                <View style={{ padding: 8 }}>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 16, marginLeft: 5, width: 200 }}
                  >
                    {item?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: '#FF9411',
    width: deviceWidth,
    borderTopColor: '#fff',
    borderTopWidth: .2,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  headerBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  input: {
    height: 35,
    width: deviceWidth / 2.2,
    // margin: 12,
    borderWidth: .5,
    padding: 5,
    borderColor: '#fff',
    borderRadius: 20,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },


});
