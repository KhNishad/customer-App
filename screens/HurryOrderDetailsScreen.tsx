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
import Requisition from "../services/RequisitionServices";
import HurryOrderService from "../services/HurryOrderService";

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


    let labels = ["Created", "Requisition Created"];


    const customStyles = {
        stepIndicatorSize: 25,
        currentStepIndicatorSize: 30,
        separatorStrokeWidth: 2,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: '#ec1d25',
        stepStrokeWidth: 3,
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


    const [allRequisition, setallRequisition] = useState({});

    const [refreshing, setrefreshing] = useState(false);

    useEffect(() => {
        HurryOrderService.getHurryOrderDetails(id)

            .then((res) => {
                console.log('===============', res);
                setallRequisition(res?.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);



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
                            Hurry Order Details
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
                            <View style={[styles.card, { marginTop: 10, paddingHorizontal: 10 }]}>
                                {Object.keys(allRequisition)?.length > 0 ?
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 5, flexWrap: 'wrap' }}>
                                        {allRequisition?.images.map((item, index) =>
                                            <View key={index} >
                                                <Image
                                                    style={styles.img}
                                                    source={{ uri: `${apiImagepath}/${item?.url}` }}
                                                />
                                                <Text style={{ width: deviceWidth / 3.5 }} numberOfLines={2}>{item?.alt}</Text>
                                            </View>
                                        )}

                                    </View>
                                    : null}
                                <View style={{ paddingHorizontal: 20 }}>
                                    <Text>Note: {allRequisition?.note}</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <StepIndicator stepCount={2} customStyles={customStyles} currentPosition={allRequisition?.hurryOrderStatus == 'created' ? 0 : allRequisition?.hurryOrderStatus == 'requisitionCreated' ? 1 : 2} labels={labels} />
                                </View>
                            </View>
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
