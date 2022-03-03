import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";



// navigations

import { TabNav } from "./navigation/TabNavigator";
import  Root  from "./navigation/DrawerNavigation";
import LoginScreen from "./screens/LoginScreen";
import ProductDetails from "./screens/ProductDetailsScreen";
import FavoriteScreen from "./screens/FavoriteScreen"
import MyReviewsScreen from "./screens/MyReviewsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import MyCart from './screens/MyCart'


const Stack = createStackNavigator();

export default function App() {



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"LoginScreen"}>

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="FavoriteScreen"
          component={FavoriteScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="MyReviewsScreen"
          component={MyReviewsScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="CheckoutScreen"
          component={CheckoutScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="MyCart"
          component={MyCart}
          options={{ header: () => null }}
        />

        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{ header: () => null }}
        />

      </Stack.Navigator>
    </NavigationContainer>

  );
}
