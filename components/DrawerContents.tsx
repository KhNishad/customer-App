import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity,Text,Linking} from 'react-native';
import {Title,Drawer} from 'react-native-paper';
import {DrawerContentScrollView,DrawerItem,} from '@react-navigation/drawer';
import { Ionicons,FontAwesome5,MaterialIcons,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import {useState,useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
// import { actionTypes } from "../context/reducer";
// import { useStateValue } from '../context/StateProvider'
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from '@react-navigation/native';



// service
import profileService from '../services/profileService'



import LoginModal from '../components/LoginModal';

export function DrawerContent(props:any) {


  const isDrawerOpen = useIsDrawerOpen();
  

  const [notLogin, setnotLogin] = useState(false)
  const [token, settoken] = useState('')
  const [ModalOpen, setModalOpen] = useState(false)
  const [refreshing, setrefreshing] = useState(false)
  const [phone, setphone] = useState('')
  const [name, setname] = useState('')
  const navigation = useNavigation(); 

  
      useEffect(() => {
        const token = async()=>{
         
          let tokenn = await SecureStore.getItemAsync('accessToken')
          if(tokenn != null){
            setnotLogin(true)
            
          }else{
            setnotLogin(false)
          }
          settoken(tokenn)
        }
       
        token()
      }, [isDrawerOpen])
      

        // logout 
        const logout  = async () =>{
       
        let tokenn =   await  SecureStore.deleteItemAsync('accessToken')
          
          if(tokenn == null){
            setname('')
            setphone('')
            props.navigation.closeDrawer()
            showMessage({
              message: `Logged Out Successfully`,
              type: "success",
            });            
          }
       
        }

        useFocusEffect(() => {
         if(token){
           
          profileService.getUser().then((res)=>{
            setname(res?.data?.name)
            setphone(res?.data?.phone)
          }).catch(err=>{

          })
         }
                      
        })  
        

        // close the drawer
        const closeIt = ()=>{
          props.navigation.closeDrawer()

        }
      
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>  
                  <View style={styles.userInfoSection}>
                    <TouchableOpacity style={{paddingBottom:5}} onPress={()=> props.navigation.navigate('Account')}>
                      <View  style={{flexDirection:'row',marginTop: 15,alignItems:'center'}}>
                          {/* <Image  source={require('../assets/images/essa-logo.png')} 
                             style={styles.sellerImg}
                          /> */}
                          
                        <View style={{marginLeft:15}}>
                            <Title  style={styles.title}>{name}</Title>  
                           
                            <Text style={{fontSize:14,color:'#1234'}}>{phone}</Text>                              
                        </View>
                     </View>
                      </TouchableOpacity>
                      
                    </View>
                
                         {/* {notLogin?
                         null:
                         <> */}
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons name="shopping-search" size={25} color={color} />
                            )}
                            label="All Categories"
                            onPress={() => {
                              props.navigation.navigate('CategoryScreen')
                            }}
                        />

                           <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons name="note-add" size={25} color={color} />
                            )}
                            label="Favorites"
                            onPress={() => {
                              props.navigation.navigate('FavoriteScreen')
                            }}
                        />

                           <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons name="bookmark" size={25} color={color} />
                            )}
                            label="My Cart"
                            onPress={() => {
                              props.navigation.navigate('MyCart')
                            }}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons name="assignment-return" size={25} color={color} />
                            )}
                            label="Profile"
                            onPress={() => {
                            }}
                        />
                              
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons name="rate-review" size={25} color={color} />
                            )}
                            label="Address"
                            onPress={() =>{
                              props.navigation.navigate('AddressScreen')
                            }}
                        />
                           <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons name="gift-sharp" size={25} color={color} />
                            )}
                            label="My Requisition"
                            onPress={() => {props.navigation.navigate('MyOrdersScreen')}}
                        />
                         {/* <DrawerItem 
                            icon={({color, size}) => (
                              <Entypo name='heart' size={25} color='#1239'></Entypo>
                              )}
                            label="Notification"
                            onPress={() => {props.navigation.navigate('FavScreen')}}
                        /> */}
                         {/* <DrawerItem 
                            icon={({color, size}) => (
                              <Entypo name='heart' size={25} color='#1239'></Entypo>
                              )}
                            label="Hurry Orders"
                            onPress={() => {props.navigation.navigate('FavScreen')}}
                        /> */}
                        {!notLogin? 
                           <DrawerItem 
                           icon={({color, size}) => (
                             <Entypo name='login' size={25} color='#1239'></Entypo>
                             )}
                           label="Registration"
                           onPress={() => {props.navigation.navigate('LoginScreen')}}
                       />
                       :
                       null 
                      }
                        
                        {/* </>
                          } */}
                    
                          <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons name="ios-settings-outline" size={25} color={color} />
                            )}
                            label="Privacy Policies"
                            onPress={() => Linking.openURL('')}
                        />
                </View>
              
            </DrawerContentScrollView>
            {!notLogin?
               <Drawer.Section style={styles.bottomDrawerSection}>
               <DrawerItem onPress={()=> setModalOpen(true) }
                   icon={({color, size}) => (
                       <Entypo
                       name="login" 
                       color="green"
                       size={size}
                       />
                   )}
                   label="Sign In"
               />
           </Drawer.Section>
            :
              <Drawer.Section style={styles.bottomDrawerSection}>
                  <DrawerItem onPress={()=> logout()}
                      icon={({color, size}) => (
                          <FontAwesome5
                          name="sign-out-alt" 
                          color="#ec1d25"
                          size={size}
                          />
                      )}
                      label="Sign Out"
                  />
              </Drawer.Section>
             } 
            {ModalOpen?
              <LoginModal closeIt={closeIt}  setModalOpen={setModalOpen} ModalOpen={ModalOpen}/>
             :null}
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
      paddingBottom:10,
      borderBottomWidth:1,
      borderBottomColor:'#f4f4f4'
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    sellerImg:{
      borderColor:'#BB2227',
      borderWidth:1,
      width:50,
      height:50,
      borderRadius:50
    }
  });