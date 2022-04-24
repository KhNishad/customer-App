import React from 'react';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, AntDesign,MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import AddToCartServices from "../services/AddToCartServices";
import { useStateValue } from '../context/StateProvider'
import { actionTypes } from "../context/reducer";

// services
import { Alert } from 'react-native';

// navigations 

import CartScreen from '../screens/MyCart'
import FavoriteScreen from '../screens/FavoriteScreen'
import CatNav from '../navigation/CatNavigation';

import Root from '../navigation/DrawerNavigation';
import NetworkUtils from '../utils/Connection';
export function TabNav() {

   const [{ qnty, token }] = useStateValue();
   const [state, dispatch] = useStateValue();
 
 
   useEffect(() => {
     let qty = 0;
     AddToCartServices.getAllCartItem().then((res)=>{
 
             res?.data?.packageList.map((item,index)=>{
                 qty = qty + item?.qty
             })
             dispatch({
                 type: actionTypes.GET_TOTAL,
                 qnty: qty,
               });
         
     }).catch(err=>{
         console.log('err in cart List',err);
     })
 },[])

   

   const netFunction = ()=>{
     NetworkUtils.isNetworkAvailable().then(res=>{
       if(!res){
         Alert.alert(
           "Something Went Wrong!",
           "Please Check Your Internet Connection",
           [
             {
               text: "Cancel",
               onPress: () => console.log("Cancel Pressed"),
               style: "cancel"
             },
             { text: "Try Again", onPress: () => netFunction() }
           ]
         );
       }
     })
   }
   netFunction()




   const Tab = createBottomTabNavigator();


   return (
      <Tab.Navigator>


         <Tab.Screen name="HomeScreen" component={Root}
            options={{
               tabBarLabel: "Home",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <AntDesign name="home" size={30} color={focused ? '#BB2227' : color} />,
            }}

         />
          {/* <Tab.Screen name="FavoriteScreen" component={FavoriteScreen}
            options={{
               tabBarLabel: "Favorite",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <AntDesign name="hearto" size={30} color={focused ? '#BB2227' : color} />,
            }}

         /> */}
          <Tab.Screen name="CartScreen" component={CartScreen}
            options={{
               tabBarLabel: "Cart",
               tabBarBadge: qnty? qnty : null,
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <AntDesign name="shoppingcart" size={30} color={focused ? '#BB2227' : color} />,
            }}

         />
          <Tab.Screen name="CategoryScreen" component={CatNav}
            options={{
               tabBarLabel: "Categories",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <MaterialIcons name="category" size={30} color={focused ? '#BB2227' : color} />,
            }}

         />


         {/* <Tab.Screen name="Profile"  component={Root}
            
             options={{
                tabBarLabel: "Profile",
                // unmountOnBlur: true,
                header: () => null,
               
             tabBarIcon: ({focused, color }) =>  
             <FontAwesome name="user-o" size={25} color={focused? '#BB2227': color} />,
             }} 
             
            //  listeners={({ navigation, route }) => ({
            //   tabPress: e => {
            //     setrenderMe(!renderMe)
            //     navigation.reset({
            //       index: 0,
            //       routes: [{name: 'Categories'}],
            //     });
              
            //     },
             
            //   })}
           /> */}






      </Tab.Navigator>

   );
}