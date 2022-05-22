import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import { StateProvider } from "./context/StateProvider";
import reducer, { initialState } from "./context/reducer";

// navigations

import { TabNav } from "./navigation/TabNavigator";
import Root from "./navigation/DrawerNavigation";
import LoginScreen from "./screens/LoginScreen";
import ProductDetails from "./screens/ProductDetailsScreen";
import FavoriteScreen from "./screens/FavoriteScreen"
import MyReviewsScreen from "./screens/MyReviewsScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import MyCart from './screens/MyCart'
import categoryWiseProductScreen from './screens/CategoryProductScreen'
import AddressScreen from './screens/AddressScreen'
import AllBrandScreen from './screens/AllBrandScreen'
import BrandWiseProductScreen from './screens/BrandWiseProductScreen'
import MyOrdersScreen from './screens/MyOrdersScreen'
import Requisition from './screens/RequisitionScreen'
import RequisitionDetails from './screens/requisitionDetails'
import OrderDetails from './screens/OrderDetailsScreen'
import AllProductScreen from './screens/AllProductScreen'

// import categoryWiseProductScreen from './screens/CategoryProductScreen'

import { useEffect } from "react";
// import CheckoutScreen from './screens/CheckoutScreen';


const Stack = createStackNavigator();

export default function App() {





  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"TabNav"}>

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
          {/* <Stack.Screen
          name="categoryWiseProductScreen"
          component={categoryWiseProductScreen}
          options={{ header: () => null }}
        /> */}

          <Stack.Screen
            name="FavoriteScreen"
            component={FavoriteScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="Requisition"
            component={Requisition}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="MyOrdersScreen"
            component={MyOrdersScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="BrandWiseProductScreen"
            component={BrandWiseProductScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="AllBrandScreen"
            component={AllBrandScreen}
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

          <Stack.Screen
            name="categoryWiseProductScreen"
            component={categoryWiseProductScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="AddressScreen"
            component={AddressScreen}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="RequisitionDetails"
            component={RequisitionDetails}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name="AllProductScreen"
            component={AllProductScreen}
            options={{ header: () => null }}
          />



        </Stack.Navigator>
        <FlashMessage style={{ alignItems: 'center' }} duration={3000} position="top" />

      </NavigationContainer>
    </StateProvider>
  );
}
