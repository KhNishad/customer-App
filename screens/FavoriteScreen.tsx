
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
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign onPress={()=>navigation.goBack()} name="left" size={25} color={"black"}></AntDesign>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: deviceWidth / 3.5 }}>Favorite</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: 25 }} >
                        {arr?.map((item, index) =>
                            <View key={index}>
                                {index % 2 === 0 ?
                                    <Text style={{ display: 'none' }}> {Color = '#FFFFFF'}</Text>
                                    :
                                    <Text style={{ display: 'none' }}>{Color = '#F9F9FF'}</Text>
                                }
                                <TouchableOpacity style={{ paddingVertical: 10, paddingHorizontal: 15, borderRadius: 5 }}>
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
                                            <AntDesign name="closecircleo" size={25} color={"Black"}></AntDesign>
                                            <Entypo name="shopping-cart" size={25} color={"Black"} style={{ marginTop: 25 }}></Entypo>

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

        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        //   backgroundColor:'#FAFAFA',
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
