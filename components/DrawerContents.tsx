import React from 'react';
import { View, StyleSheet,Image,TouchableOpacity,Text,Linking} from 'react-native';
import {Title,Drawer} from 'react-native-paper';
import {DrawerContentScrollView,DrawerItem,} from '@react-navigation/drawer';
import { Ionicons,FontAwesome5,MaterialIcons,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import {useState,useEffect} from 'react';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
// import { actionTypes } from "../context/reducer";
// import { useStateValue } from '../context/StateProvider'




export function DrawerContent(props:any) {


  const isDrawerOpen = useIsDrawerOpen();
  
  const [userInfo, setuserInfo] = useState([])
  const [isLoginModalOpen, setisLoginModalOpen] = useState(false)
  const [notLogin, setnotLogin] = useState(false)


    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                  <View style={styles.userInfoSection}>
                    <TouchableOpacity style={{paddingBottom:5}} onPress={()=> props.navigation.navigate('Account')}>
                      <View  style={{flexDirection:'row',marginTop: 15,alignItems:'center'}}>
                          <Image  source={require('../assets/images/essa-logo.png')} 
                             style={styles.sellerImg}
                          />
                          
                        <View style={{marginLeft:15}}>
                            <Title  style={styles.title}>Jhon Cina</Title>  
                           
                            <Text style={{fontSize:14,color:'#1234'}}>01728897456</Text>                              
                        </View>
                     </View>
                      </TouchableOpacity>
                      
                    </View>
                
                         {notLogin?
                         null:
                         <>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialCommunityIcons name="shopping-search" size={25} color={color} />
                            )}
                            label="All Categories"
                            onPress={() => {
                              
                            }}
                        />

                           <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons name="note-add" size={25} color={color} />
                            )}
                            label="Favorites"
                            onPress={() => {
                             
                            }}
                        />

                           <DrawerItem 
                            icon={({color, size}) => (
                                <MaterialIcons name="bookmark" size={25} color={color} />
                            )}
                            label="My Cart"
                            onPress={() => {
                             
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
                               
                            }}
                        />
                           <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons name="gift-sharp" size={25} color={color} />
                            )}
                            label="orders"
                            onPress={() => {props.navigation.navigate('MyRewards')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                              <Entypo name='heart' size={25} color='#1239'></Entypo>
                              )}
                            label="Notification"
                            onPress={() => {props.navigation.navigate('FavScreen')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                              <Entypo name='heart' size={25} color='#1239'></Entypo>
                              )}
                            label="Hurry Orders"
                            onPress={() => {props.navigation.navigate('FavScreen')}}
                        />
                        </>
                          }
                    
                          <DrawerItem 
                            icon={({color, size}) => (
                                <Ionicons name="ios-settings-outline" size={25} color={color} />
                            )}
                            label="Privacy Policies"
                            onPress={() => Linking.openURL('')}
                        />
                </View>
              
            </DrawerContentScrollView>
            {/* {notLogin?
              null
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
             }  */}
           
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