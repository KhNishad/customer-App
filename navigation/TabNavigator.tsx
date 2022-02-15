import React from 'react';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";


// services
import { Alert } from 'react-native';

// navigations 

import CartScreen from '../screens/MyCart'
import FavoriteScreen from '../screens/FavoriteScreen'

import Root from '../navigation/DrawerNavigation';
export function TabNav() {


   // const netFunction = ()=>{
   //   NetworkUtils.isNetworkAvailable().then(res=>{
   //     if(!res){
   //       Alert.alert(
   //         "Something Went Wrong!",
   //         "Please Check Your Internet Connection",
   //         [
   //           {
   //             text: "Cancel",
   //             onPress: () => console.log("Cancel Pressed"),
   //             style: "cancel"
   //           },
   //           { text: "Try Again", onPress: () => netFunction() }
   //         ]
   //       );
   //     }
   //   })
   // }
   // netFunction()


   const [totalItems, settotalItems] = useState(0)
   const [renderMe, setrenderMe] = useState(false)


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
          <Tab.Screen name="FavoriteScreen" component={FavoriteScreen}
            options={{
               tabBarLabel: "Favorite",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <AntDesign name="hearto" size={30} color={focused ? '#BB2227' : color} />,
            }}

         />
          <Tab.Screen name="CartScreen" component={CartScreen}
            options={{
               tabBarLabel: "Cart",
               // unmountOnBlur: true,
               header: () => null,

               tabBarIcon: ({ focused, color }) =>
                  <AntDesign name="shoppingcart" size={30} color={focused ? '#BB2227' : color} />,
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