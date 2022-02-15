
import { View, Text, StyleSheet, StatusBar, Image, ActivityIndicator, SafeAreaView, TextInput, Button } from 'react-native';
import { Dimensions } from 'react-native'
import { FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let Color = '';

export default function TabTwoScreen() {

    const navigation = useNavigation();


    let arr = ['', '', '', '', '',]





    return (
        <View >
            <StatusBar backgroundColor="#FF9411" />
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container1}>
                        <View style={{ display:'flex',flexDirection: 'row',justifyContent:'space-between',alignItems:'center' }}>
                            <AntDesign name="left" size={30} color={"Black"}></AntDesign>
                            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>MY REVIEWS</Text>
                            <View></View>

                        </View>
                    </View>
                    <View style={{ marginBottom: 25 }} >
                        {arr?.map((item, index) =>
                            <View key={index}>
                                {index % 4 === 0 ?
                                    <Text style={{ display: 'none' }}> {Color = '#FFFFFF'}</Text>
                                    :
                                    <Text style={{ display: 'none' }}>{Color = '#F9F9FF'}</Text>
                                }
                                <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5 }}>
                                    <View style={[styles.listContainer, { backgroundColor: Color }]}>
                                        <View style={styles.tableColumn1} >
                                            <Image style={styles.productImg} source={require('../assets/images/mobile.jpg')} />
                                        </View>

                                        <View style={styles.tableColumn2}>
                                            <Text style={{ color: '#818181', fontWeight: 'bold' }}>Mobile</Text>
                                            <Text style={styles.infoText}>$
                                                <Text style={{ fontWeight: 'bold' }}>50</Text>
                                            </Text>
                                        </View>
                                        <View style={styles.tableColumn3}>
                                            <AntDesign name="closecircleo" size={20} color={"Black"}></AntDesign>
                                            <Entypo name="shopping-cart" size={20} color={"Black"} style={{ marginTop: 25 }}></Entypo>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <View style={{ alignItems: 'center', margin: 12,marginBottom:20 }}>
                        <TouchableOpacity style={{ backgroundColor: '#1C6E7A', padding: 15, width: deviceWidth / 1.2, alignItems: 'center', borderRadius: 10 }}>
                            <Text style={[styles.title, { fontSize: 16 }]}>Add All To My Cart</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,


    },
    container1: {

        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomColor: '#FF9411',
        borderBottomWidth: .5

    },
    title: {
        fontSize: 30,
        color:'#fff',
        fontWeight:"normal" ,
      },
    input: {

    },
    tableColumn1: {
        width: (deviceWidth / 3) - 15,
        flexDirection: 'column',
        paddingHorizontal: 2,
        alignItems: 'flex-start',

    },
    tableColumn2: {
        width: (deviceWidth / 3) - 10,
        flexDirection: 'column',
        paddingHorizontal: 2,
        alignItems: 'flex-start',

    },
    tableColumn3: {
        width: (deviceWidth / 4) + 10,
        flexDirection: 'column',
        paddingHorizontal: 15,
        marginLeft: 5,
        alignItems: 'flex-end',
        justifyContent: 'space-around',

    },
    textColor: {
        color: '#7B7B7B',
    },
    infoText: {
        color: '#7B7B7B',
        fontSize: 15,
        fontWeight: 'bold'
    },
    productImg: {
        width: 80,
        height: 80,
        // borderWidth:0.5,
        // borderColor:'#1234',
        // resizeMode:'center'
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    }
});
