
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
                            <AntDesign name="left" size={30} color={"Black"}></AntDesign>
                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: deviceWidth / 4.2 }}>Check-Out</Text>
                        </View>
                    </View>
                    <View style={{paddingHorizontal:15}}>
                    <View style={styles.edit}>
                        <Text style={{fontSize:18}}>Shipping Address</Text>
                        <AntDesign name="edit" size={20} color={"Black"}></AntDesign>
                    </View>
                    
                    <View style={styles.card}>
                        <View style={{borderBottomWidth:3,borderBottomColor:'#ebe8e8'}}>
                            <Text style={{fontSize:20,fontWeight:'bold',padding:15}}>Mithu Karim</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:16,padding:15}}>Home:04, Road:02, Uttara, Dhaka, Bangladesh</Text>
                        </View>
                    </View>
                    
                    <View style={styles.edit}>
                        <Text style={{fontSize:18}}>Payment</Text>
                        <AntDesign name="edit" size={20} color={"Black"}></AntDesign>
                    </View>
                    
                    <View style={styles.card}>
                        <View style={styles.card2}>
                             <FontAwesome name="cc-mastercard" size={35} color={"#e63b2c"} ></FontAwesome>
                            <Text style={{fontSize:17,padding:15,marginLeft:10}}>**************2587</Text>
                        </View>
                    </View>
                    
                    <View style={styles.edit}>
                        <Text style={{fontSize:18}}>Delevery Method</Text>
                        <AntDesign name="edit" size={20} color={"Black"}></AntDesign>
                    </View>
                    
                    <View style={styles.card}>
                        <View style={styles.card2}>
                        <Image style={styles.img}source={require('../assets/images/dhl-express-vector.jpg')}></Image>
                            <Text style={{fontSize:17,padding:15,marginLeft:10}}>Fast( 2-3 Days)</Text>
                        </View>
                    </View>
                    
                    
                    
                    <View style={[styles.card,{marginTop:40}]}>
                        <View style={styles.card3}>
                            <Text style={{fontSize:17,padding:8,}}>Order: </Text>
                            <Text style={{fontSize:18,padding:8,fontWeight:'700'}}>$90.00</Text>
                        </View>
                        <View style={styles.card3}>
                            <Text style={{fontSize:17,padding:8,}}>Delevery: </Text>
                            <Text style={{fontSize:18,padding:8,fontWeight:'700'}}>$10.00</Text>
                        </View>
                        <View style={styles.card3}>
                            <Text style={{fontSize:17,padding:8,}}>Total: </Text>
                            <Text style={{fontSize:18,padding:8,fontWeight:'700'}}>$100.00</Text>
                        </View>
                    </View>
                    

                    <View style={{ alignItems: 'center', margin: 12,marginBottom:20 }}>
                        <TouchableOpacity style={{ backgroundColor: '#1C6E7A', padding: 15, width: deviceWidth / 1.1, alignItems: 'center', borderRadius: 10 }}>
                            <Text style={[styles.title,]}>Submit Order</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </SafeAreaView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        


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
        fontSize: 25,
        color:'#fff',
        fontWeight:"normal" ,
      },
      edit: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        // paddingHorizontal:15,
        paddingVertical:10,
    },
    card: {
    //    width:deviceWidth/1.1,
       backgroundColor:'#fff',
       elevation:7,
       borderRadius:5,
    },
    img:{
        width: '30%',
        height: '50%',
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        // resizeMode:'center',
        // borderWidth:.1
      },
    card2: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:15,
        marginLeft:15
    },
    card3: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10 
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
        
    }
});
