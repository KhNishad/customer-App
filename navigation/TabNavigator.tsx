import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
// services
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import CatNav from "../navigation/CatNavigation";
import Root from "../navigation/DrawerNavigation";
// navigations
import { useIsFocused } from "@react-navigation/native";
import LoginModal from "../components/LoginModal";
import CartScreen from "../screens/MyCart";
import Profile from "../screens/Profile";
import AddToCartServices from "../services/AddToCartServices";
import NetworkUtils from "../utils/Connection";

export function TabNav() {
  const isFocused = useIsFocused();
  const [{ qnty }] = useStateValue();
  const [state, dispatch] = useStateValue();
  const [ModalOpen, setModalOpen] = useState(false);
  const [token, settoken] = useState<any>("");

  useEffect(() => {
    let qty = 0;
    AddToCartServices.getAllCartItem()
      .then((res) => {
        //  res?.data?.packageList.map((item,index)=>{
        //      qty = qty + item
        //  })
        dispatch({
          type: actionTypes.GET_TOTAL,
          qnty: res?.data?.packageList.length,
        });
      })
      .catch((err) => {
        console.log("err in cart List", err);
      });
  }, []);

  useEffect(() => {
    const token = async () => {
      let tokenn = await SecureStore.getItemAsync("accessToken");
      if (tokenn) {
        settoken(tokenn);
      } else {
        settoken("");
      }
    };
    token();
  }, [isFocused]);

  // const netFunction = () => {
  //   NetworkUtils.isNetworkAvailable().then((res) => {
  //     if (!res) {
  //       Alert.alert(
  //         "Something Went Wrong!",
  //         "Please Check Your Internet Connection",
  //         [
  //           {
  //             text: "Cancel",
  //             onPress: () => console.log("Cancel Pressed"),
  //             style: "cancel",
  //           },
  //           { text: "Try Again", onPress: () => netFunction() },
  //         ]
  //       );
  //     }
  //   });
  // };
  // netFunction();

  const Tab = createBottomTabNavigator();

  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeScreen"
          component={Root}
          options={{
            tabBarLabel: "Home",
            // unmountOnBlur: true,
            header: () => null,

            tabBarIcon: ({ focused, color }) => (
              <AntDesign
                name="home"
                size={30}
                color={focused ? "#BB2227" : color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarBadge: qnty ? qnty : null,
            // unmountOnBlur: true,
            header: () => null,

            tabBarIcon: ({ focused, color }) => (
              <AntDesign
                name="shoppingcart"
                size={30}
                color={focused ? "#BB2227" : color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CategoryScreen"
          component={CatNav}
          options={{
            tabBarLabel: "Categories",
            // unmountOnBlur: true,
            header: () => null,

            tabBarIcon: ({ focused, color }) => (
              <MaterialIcons
                name="category"
                size={30}
                color={focused ? "#BB2227" : color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          // listeners={({ navigation, route }) => ({
          //   tabPress: (e) => {
          //     console.log("...........");

          //     if (!token) {

          //     }
          //   },
          // })}
          options={{
            tabBarLabel: "Profile",
            // unmountOnBlur: true,
            header: () => null,

            tabBarIcon: ({ focused, color }) => (
              <FontAwesome
                name="user"
                size={30}
                color={focused ? "#BB2227" : color}
              />
            ),
          }}
        />
      </Tab.Navigator>
      {ModalOpen ? (
        <LoginModal setModalOpen={setModalOpen} ModalOpen={ModalOpen} />
      ) : null}
    </>
  );
}
