
import { View, Text, StyleSheet, StatusBar, Image, ActivityIndicator, SafeAreaView, TextInput, Button } from 'react-native';
import { Dimensions } from 'react-native'
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import AddressServices from '../services/AddressServices'
import { getCombinedStyles } from 'react-native-paper';


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

import profileService from '../services/profileService';
import { showMessage } from 'react-native-flash-message';
export default function TabTwoScreen() {

    const navigation = useNavigation();
    const [fullName, setfullName] = useState('');
    const [address, setaddress] = useState('');
    const [zipCode, setzipCode] = useState('');
    const [city, setcity] = useState([])
    const [district, setdistrict] = useState([])
    const [division, setdivision] = useState([]);
    const [area, setarea] = useState([])
    const [policeStation, setpoliceStation] = useState([])
    const [refreshing, setrefreshing] = useState(false)
    const [isActive, setisActive] = useState(false)
    const [type, settype] = useState('home')
    const [userInfo, setuserInfo] = useState({})
    // dropdown values
    const [selectedDivision, setSelectedDivision] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedCity, setselectedCity] = useState('')
    const [selectedPolice, setselectedPolice] = useState('')
    const [selectedArea, setselectedArea] = useState('')



    useEffect(() => {

        setSelectedDistrict('')
        setselectedCity('')
        setselectedArea('')
        setselectedPolice('')

        const getDivision = async () => {
            try {
                let res = await AddressServices.getDivision()
                setdivision(res?.data)
            } catch (error) {

            }
        }
        getDivision()

    }, [refreshing])


    useEffect(() => {

        const getUser = async () => {
            
            try {
                let res = await profileService.getUser()
                setfullName(res?.data?.name)
                setuserInfo(res?.data)
                // get district
                setSelectedDivision(res?.data?.shippingAddress[0]?.division?.id)
                if(res?.data?.shippingAddress[0]?.division?.id){
                    getDistrict(res?.data?.shippingAddress[0]?.division?.id)
                }
                // get city
                setSelectedDistrict(res?.data?.shippingAddress[0]?.district?.id)
                if(res?.data?.shippingAddress[0]?.district?.id){
                    getCities(res?.data?.shippingAddress[0]?.district?.id)
                }

                // get getPolice
                setselectedCity(res?.data?.shippingAddress[0]?.city?.id)
                if(res?.data?.shippingAddress[0]?.city?.id){
                    getPolice(res?.data?.shippingAddress[0]?.city?.id)
                }

                setselectedPolice(res?.data?.shippingAddress[0]?.policeStation?.id)
                if(res?.data?.shippingAddress[0]?.policeStation?.id){
                    getArea(res?.data?.shippingAddress[0]?.policeStation?.id)
                }

                setselectedArea(res?.data?.shippingAddress[0]?.area?.id)
                
                
            } catch (error) {

            }
        }
        getUser()

    }, [division])


    const getDistrict = async (id: any) => {
        setSelectedDistrict('')
        setselectedCity('')
        setselectedArea('')
        setselectedPolice('')

        let index = division.findIndex(e => e.id == id)

        setdistrict(division[index]?.children)


    }

    useEffect(() => {
        const getCities = async (id: any) => {
        
            if(district){
                let index = district.findIndex(e => e.id == id)
                setcity(district[index]?.children)
            }
        }
        getCities(selectedDistrict)
    }, [district,selectedDistrict])
    

    const getCities = async (id: any) => {
        
        if(district){
            let index = district.findIndex(e => e.id == id)
            setcity(district[index]?.children)
        }
    }

    const getPolice = async (id: any) => {

        try {
            let res = await AddressServices.getPoliceStation(id)
            setpoliceStation(res?.data?.children)

        } catch (error) {

        }


    }

    useEffect(() => {
        const getArea = async (id: any) => {
            if(policeStation){
                let index = policeStation.findIndex(e => e.id == id)
                setarea(policeStation[index]?.children)
            }
        }
        getArea(selectedPolice)
    }, [policeStation,selectedPolice])
    

    const getArea = async (id: any) => {
        if(policeStation){
            let index = policeStation.findIndex(e => e.id == id)
            setarea(policeStation[index]?.children)
        }
       

    }

    const submit = async () => {

        let division1  = division.findIndex((el:any)=> el.id == selectedDivision)
        let district1  = district.findIndex((el:any)=> el.id == selectedDistrict)
        let city1  = city.findIndex((el:any)=> el.id == selectedCity)
        let police1  = policeStation.findIndex((el:any)=> el.id == selectedPolice)
        let area1  =  area.findIndex((el:any)=> el.id == selectedArea)

        const data = {
            name:fullName,
            address: address,
            shippingAddress: [
                {
                    division: {
                        id: division[division1]?.id,
                        title: division[division1]?.title
                    },
                    district: {
                        id: district[district1]?.id,
                        title: district[district1]?.title
                    },
                    city: {
                        id: city[city1]?.id,
                        title: city[city1]?.title
                    },
                    policeStation: {
                        id: policeStation[police1]?.id,
                        title: policeStation[police1]?.title
                    },
                    area: {
                        id: area[area1]?.id,
                        title: area[area1]?.title
                    },
                    more: "string",
                    type:type,
                    isActive: isActive
                }
            ]
        }
            console.log('...........res',data);

        try {
            let res  = await AddressServices.setAddress(userInfo?.id,data)
            showMessage({
                message: `${res.message}`,
                type: "success",
              });

        } catch (error) {
            showMessage({
                message: `${error.message}`,
                type: "danger",
              });
        }
        
    }



    return (
        <View >
            <StatusBar backgroundColor="#FF9411" />
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container1}>
                        <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <AntDesign onPress={()=> navigation.goBack()} name="left" size={30} color={"black"}></AntDesign>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Add Shipping Address</Text>
                            <View></View>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 15, paddingVertical: 10, }}>
                        <View style={styles.text_input}>
                            <Text style={styles.labelText}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setfullName}
                                placeholder="Full Name"
                                value={fullName}
                            />
                        </View>
                        <View style={styles.text_input}>
                            <Text style={styles.labelText}>Phone</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Phone"
                                value={userInfo?.phone}
                                
                            />
                        </View>
                        <View style={[styles.text_input, { marginTop: 10 }]}>
                            <Text style={styles.labelText}>Address</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setaddress}
                                placeholder="Address"
                                value={address}
                            />
                        </View>

                        <View>
                            <Text>Division</Text>
                            <View style={{ borderWidth: .8, borderColor: '#1234', borderRadius: 2, marginTop: 10, paddingLeft: 10 }}>
                                <Picker
                                    selectedValue={selectedDivision}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) => {
                                        setSelectedDivision(itemValue)
                                        getDistrict(itemValue)
                                        setcity([])
                                        setarea([])
                                        setpoliceStation([])
                                
                                    }
                                    }>
                                    <Picker.Item label='Select Any' value={''} />
                                    {division?.map((item: any, index) =>
                                        <Picker.Item key={index} label={item?.title} value={item?.id} />

                                    )}
                                </Picker>
                            </View>
                        </View>

                        <View>
                            <Text>District</Text>
                            <View style={{ borderWidth: .8, borderColor: '#1234', borderRadius: 2, marginTop: 10, paddingLeft: 10 }}>
                                <Picker
                                    selectedValue={selectedDistrict}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) => {
                                        setSelectedDistrict(itemValue)
                                        getCities(itemValue)

                                    }
                                    }>
                                    <Picker.Item label='Select Any' value={''} />

                                    {district?.map((item: any, index) =>
                                        <Picker.Item key={index} label={item?.title} value={item?.id} />
                                    )}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text>City</Text>
                            <View style={{ borderWidth: .8, borderColor: '#1234', borderRadius: 2, marginTop: 10, paddingLeft: 10 }}>
                                <Picker
                                    selectedValue={selectedCity}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) => {
                                        setselectedCity(itemValue)
                                        getPolice(itemValue)
                                    }
                                    }>
                                    <Picker.Item label='Select Any' value={''} />

                                    {city?.map((item: any, index) =>
                                        <Picker.Item key={index} label={item?.title} value={item?.id} />
                                    )}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text>Police Station</Text>
                            <View style={{ borderWidth: .8, borderColor: '#1234', borderRadius: 2, marginTop: 10, paddingLeft: 10 }}>
                                <Picker
                                    selectedValue={selectedPolice}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) => {
                                        setselectedPolice(itemValue)
                                        getArea(itemValue)
                                    }
                                    }>
                                    <Picker.Item label='Select Any' value={''} />

                                    {policeStation?.map((item: any, index) =>
                                        <Picker.Item key={index} label={item?.title} value={item?.id} />
                                    )}
                                </Picker>
                            </View>
                        </View>
                        <View>
                            <Text>Area</Text>
                            <View style={{ borderWidth: .8, borderColor: '#1234', borderRadius: 2, marginTop: 10, paddingLeft: 10 }}>
                                <Picker
                                    selectedValue={selectedArea}
                                    mode='dropdown'
                                    onValueChange={(itemValue, itemIndex) =>
                                        setselectedArea(itemValue)
                                    }>
                                    <Picker.Item label='Select Any' value={''} />

                                    {area?.map((item: any, index) =>
                                        <Picker.Item key={index} label={item?.title} value={item?.id} />
                                    )}
                                </Picker>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",alignItems:'center',paddingVertical:15}}>
                            <Text style={{marginRight:10,fontSize:16}}>Active</Text>
                            {!isActive?
                            <MaterialCommunityIcons onPress={()=>setisActive(true)} style={{marginRight:10}} size={30} name='checkbox-multiple-blank-outline'></MaterialCommunityIcons>
                            :
                            <MaterialCommunityIcons onPress={()=>setisActive(false)}  size={30} name='checkbox-multiple-marked'></MaterialCommunityIcons>
                            }
                        </View>

                        <View style={{flexDirection:"row",alignItems:'center',paddingVertical:10}}>
                            <Text style={{marginRight:10,fontSize:16}}>Type</Text>
                            <View  style={{flexDirection:"row",alignItems:'center',paddingVertical:15,marginRight:10}}>
                                <Text>Home</Text>
                                {type == 'office'?
                                <MaterialCommunityIcons onPress={()=>settype('home')}  style={{marginRight:10}} size={30} name='checkbox-multiple-blank-outline'></MaterialCommunityIcons>
                                :
                                <MaterialCommunityIcons   size={30} name='checkbox-multiple-marked'></MaterialCommunityIcons>
                                }
                            </View>
                            <View  style={{flexDirection:"row",alignItems:'center',paddingVertical:15}}>
                                <Text>Office</Text>
                                {type == 'home'?
                                <MaterialCommunityIcons onPress={()=>settype('office')}   style={{marginRight:10}} size={30} name='checkbox-multiple-blank-outline'></MaterialCommunityIcons>
                                :
                                <MaterialCommunityIcons  size={30} name='checkbox-multiple-marked'></MaterialCommunityIcons>
                                }
                            </View>
                           
                            
                        </View>

                        <View style={{ alignItems: 'center', margin: 12, marginBottom: 20 }}>
                            <TouchableOpacity onPress={()=>submit()} style={{ backgroundColor: '#1C6E7A', padding: 10, width: deviceWidth / 1.1, alignItems: 'center', borderRadius: 10 }}>
                                <Text style={[styles.title,]}>Add Address</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>


        </View>
    );
}

const styles = StyleSheet.create({

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
        fontSize: 20,
        color: '#fff',
        fontWeight: "normal",
    },
    labelText: {
        fontWeight: 'bold',
        padding: 5
    },
    input: {
        // width: deviceWidth / 1.1,
        height: 40,


        paddingHorizontal: 12,


    },
    text_input: {
        // backgroundColor: '#1234',

    },
    text_input1: {
        backgroundColor: '#fff',
        borderWidth: .5,
    }


});
