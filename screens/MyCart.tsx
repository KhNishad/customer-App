
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
        <View  style={{flex:1}}>
            <StatusBar backgroundColor="#FF9411" />
                <ScrollView style={{marginBottom:95}}>
                    <View style={styles.container1}>
                        <View style={{ display:"flex",flexDirection: 'row',alignItems:'center',justifyContent:'space-between' }}>
                            <AntDesign name="left" size={25} color={"Black"}></AntDesign>
                            <Text style={{ fontSize: 18, fontWeight: 'bold'}}>MY CART</Text>
                            <View></View>
                        </View>
                    </View>
                    {Array.apply(null,{length:14}).map((item,index)=>
                      <View key={index} style={{ paddingHorizontal: 10 }}>
                        <View style={[styles.card, { marginTop: 8 }]}>
                            <Image style={{ width: deviceWidth/4, height: deviceWidth/4}} source={require('../assets/images/mobile.jpg')}></Image>
                            <View style={{paddingVertical:5,marginLeft:-20}}>
                                <Text style={{fontSize:16,marginBottom:5}}>Realme X2</Text>
                                <Text style={{fontSize:14,marginBottom:15}}>Realme Brand</Text>
                                <View style={styles.qtyContainer}>
                                    <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: 'center',
                                    }} >

                                        <TouchableOpacity>
                                            <View style={[styles.qtyBtn, { marginRight: 10 }]}>
                                                <AntDesign
                                                    style={{ fontSize: 20, color: "#fff" }}
                                                    name="minus"
                                                ></AntDesign>
                                            </View>
                                        </TouchableOpacity>

                                        <View style={styles.qtyInputBox}>
                                            <TextInput
                                                keyboardType='numeric'
                                                style={{
                                                    fontSize: 20,
                                                    color: "#1239",
                                                    textAlign: 'center',
                                                    marginVertical: -2
                                                }}
                                                value="10"

                                            />
                                        </View>
                                        <TouchableOpacity >
                                            <View style={[styles.qtyBtn, { marginLeft: 10 }]}>
                                                <AntDesign
                                                    style={{ fontSize: 20, color: "#fff" }}
                                                    name="plus"
                                                ></AntDesign>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.card4}>
                                <AntDesign name="closecircleo" size={20} color="Black"></AntDesign>
                                <Text style={{ fontSize: 18, fontWeight: '700' }}>$10.00</Text>
                            </View>
                        </View>
                        
                       
                      </View>
                     )}
                </ScrollView>
                
                <View style={{position:'absolute',zIndex:999,bottom:0,left:5,backgroundColor:'#fff',height:90 }}>
                    <View style={{display:'flex',flexDirection:"row",alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,paddingBottom:10}}>
                        <Text style={{fontSize:20}}>Total:</Text>
                        <Text style={{fontSize:20}}>$ 250</Text>
                    </View>
                   
                    <TouchableOpacity style={{ backgroundColor:'#1C6E7A', padding: 10, width: deviceWidth-10, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={[styles.title,]}>CHECK OUT</Text>
                    </TouchableOpacity>
                </View>


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
        fontSize: 18,
        color: '#fff',
        fontWeight: "normal",
    },
    qtyContainer: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        // marginTop:40
        // paddingHorizontal: 10,
    },
    card: {
        //    width:deviceWidth/1.1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:"space-between",
        backgroundColor: '#fff',
        elevation: 3,
        borderRadius: 5,

    },
    card4: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 8,
        alignItems:'flex-end'
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
    img: {
        width: '100%',
        height: '50%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        // resizeMode:'center',
        // borderWidth:.1
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    qtyBtn: {
        backgroundColor: "#1234",
        borderRadius: 100,
        padding: 2,
    },
    qtyInputBox: {
        paddingHorizontal: 10,
        justifyContent: "center",
        textAlign: 'center',

    },
});
