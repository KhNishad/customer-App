import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState, } from "react";
import {
    Dimensions,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import StepIndicator from 'react-native-step-indicator';

// components

// img
import OrderServices from "../services/OrderServices";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const apiImagepath = 'http://103.119.71.9:4400/media';
// pull refresh  function
function wait(time: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

export default function RequisitionDetails() {

    // const [currentPosition, setcurrentPosition] = useState(0)


let labels = ["Pending","Ready to Ship","On The Way","Delivered",'Cancelled'];


const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#ec1d25',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#ec1d25',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#ec1d25',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#ec1d25',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ec1d25',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 10,
  currentStepLabelColor: '#ec1d25',
  
}


    const refresh = React.useCallback(() => {
        setrefreshing(true);
        wait(1000).then(() => {
            setrefreshing(false);
        });
    }, [refreshing]);

    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    // console.log('.......',id);


    const [allRequisition, setallRequisition] = useState([]);

    const [refreshing, setrefreshing] = useState(false);


    useEffect(() => {
        OrderServices.getOrderDetails(id)
            .then((res) => {
                console.log('..................deails', res);

                setallRequisition(res?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [refreshing]);



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#FF9411" />

            <SafeAreaView>

                <View style={styles.container1}>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <AntDesign
                            onPress={() => navigation.goBack()}
                            name="left"
                            size={25}
                            color={"black"}
                        ></AntDesign>
                        <Text
                            style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}
                        >
                            Order Details
                        </Text>
                        <View></View>
                    </View>
                </View>
                <ScrollView>
                    <View style={{ marginBottom: 10 }}>

                        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                            <View style={styles.card}>
                                <View style={{ paddingVertical: 10 }}>
                                    <Text style={{ fontSize: 18, paddingHorizontal: 15 }}>Address</Text>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>Division : {allRequisition?.dlvrDivision}</Text>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>District : {allRequisition?.dlvrDistrict}</Text>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>City : {allRequisition?.dlvrCity}</Text>
                                    <Text style={{ fontSize: 14, paddingHorizontal: 15 }}>Area : {allRequisition?.dlvrArea}</Text>
                                </View>
                            </View>
                            {allRequisition?.orderSeller?.map((items:any,indexs:number)=>
                            <View key={indexs}>
                                <View>
                                  <View style={[styles.card,{marginTop:10,paddingHorizontal:10,marginBottom:-2,borderBottomRightRadius:0,borderBottomLeftRadius:0}]}>
                                   <Text>Seller No : {items?.orderSellerNo}</Text>
                                   <Text>Total : TK {items?.totalAmont}</Text>
                                  </View>
                                </View>
                                {items?.orderSellerDetails.map((item:any,index:number)=>
                                <View style={styles.card} key={index}>
                                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start',paddingHorizontal:10}}>
                                        <View style={{width:100}}>
                                            <Image style={styles.img} source={{ uri: `${apiImagepath}/${item?.product?.images[0].url}` }} />
                                        </View>
                                        <View style={{width:deviceWidth-150}}>
                                            <Text>{item?.product?.title} </Text>
                                            <Text>TK: {item?.price}</Text>
                                        </View>
                                    
                                    </View>
                                    <View style={{marginTop:10}}>
                                    <StepIndicator stepCount={5}  customStyles={customStyles}  currentPosition={items?.orderSellerStatus =='Pending'? 0 : items?.orderSellerStatus == 'ReadyToShip'?1:items?.orderSellerStatus == 'OnTheWay'?2:items?.orderSellerStatus == 'Deivered'?3:4}  labels={labels} />
                                    </View>
                                </View>
                                )}
                            </View>
                           
                            )}
                            
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    container1: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomColor: "#FF9411",
        borderBottomWidth: 0.5,
    },
    deleverd: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5
    },
    card: {
        //    width:deviceWidth/1.1,
        backgroundColor: '#fff',
        elevation: 7,
        borderRadius: 5,
        paddingVertical: 5,
        marginBottom: 10,
    },

    img: {
        width: 80,
        height: 80
    }


});
