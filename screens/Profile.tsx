import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import profileService from "../services/profileService";

//components

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function HomeScreen(props: any) {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const isFocused = useIsFocused();

  const [token, settoken] = useState("");
  const [phone, setphone] = useState("");
  const [name, setname] = useState("");

  useEffect(() => {
    const token = async () => {
      let tokenn = await SecureStore.getItemAsync("accessToken");

      if (tokenn) {
        settoken(tokenn);
        profileService
          .getUser()
          .then((res) => {
            setname(res?.data?.name);
            setphone(res?.data?.phone);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setname("");
        setphone("");
        settoken("");
      }
    };

    token();
  }, [isFocused]);

  // useFocusEffect(() => {
  //   if(token){

  //    profileService.getUser().then((res)=>{
  //     console.log('.........resdd',res);

  //      setname(res?.data?.name)
  //      setphone(res?.data?.phone)
  //    }).catch(err=>{
  //       console.log(err);

  //    })
  //   }

  //  })

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={`black`} /> */}
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <AntDesign
              onPress={() => navigation.navigate("HomeScreen")}
              name="left"
              size={25}
              color={"black"}
            ></AntDesign>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              Profile
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <View style={styles.card}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../assets/images/essa-logo.jpeg")}
                ></Image>

                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {name}
                  </Text>
                  <Text style={{ color: "#1239" }}>{phone}</Text>
                </View>
              </View>
              {/* <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <AntDesign name="logout" size={20} color="red" />
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 5,
                    color: "#004C3F",
                    fontWeight: "bold",
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          <View style={styles.card1}>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => navigation.navigate("AddressScreen")}
              style={styles.profileSection}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 35,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="user" size={25} color="#1239" />
                </View>

                <Text style={styles.title}>Profile</Text>
              </View>
              <Entypo name="chevron-right" size={25} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => navigation.navigate("Requisition")}
              style={styles.profileSection}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 35,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="car" size={25} color="#1239" />
                </View>
                <Text style={styles.title}>My Requisition</Text>
              </View>
              <Entypo name="chevron-right" size={25} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => navigation.navigate("MyOrdersScreen")}
              style={styles.profileSection}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 35,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="bell" size={25} color="#1239" />
                </View>
                <Text style={styles.title}>My Orders</Text>
              </View>
              <Entypo name="chevron-right" size={25} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("HurryOrderList")}
              style={styles.profileSection1}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 35,
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons name="support-agent" size={25} color="#1239" />
                </View>
                <Text style={styles.title}>Hurry Order</Text>
              </View>
              <Entypo name="chevron-right" size={25} color="#000" />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.profileSection}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 35,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="file-text" size={25} color="#1239" />
                </View>
                <Text style={styles.title}>Terms & Condition</Text>
              </View>
              <Entypo name="chevron-right" size={25} color="#000" />
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.profileSection1}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 35,
                    alignItems: "center",
                  }}
                >
                  <AntDesign name="questioncircle" size={25} color="#1239" />
                </View>
                <Text style={styles.title}>FAQs</Text>
              </View>
              <Entypo name="chevron-right" size={25} color="#000" />
            </TouchableOpacity> */}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: "#004C3F",
    borderBottomWidth: 0.5,
    backgroundColor: "#fff",
  },
  card: {
    width: deviceWidth / 1.1,
    // height: 190,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  card1: {
    width: deviceWidth / 1.1,
    // height: 190,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  img: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderWidth: 0.01,
    borderRadius: 100,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#1239",
  },
  profileSection1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  title: {
    fontSize: 18,
    marginLeft: 15,
    color: "#000",
  },
});
