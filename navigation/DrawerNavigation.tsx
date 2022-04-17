
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native';
// import { useIsDrawerOpen } from '@react-navigation/drawer';
import {DrawerContent} from '../components/DrawerContents';

// import screens 
import HomeScreen from '../screens/HomeScreen';
import ProductDetails from '../screens/ProductDetailsScreen'



const Drawer = createDrawerNavigator();



export default function Root() {
	return (
		<Drawer.Navigator initialRouteName="Home" drawerContent = {props => <DrawerContent {...props}/>}>

			<Drawer.Screen name="Home" component={HomeScreen} />
			{/* <Drawer.Screen name="ProductDetails" component={ProductDetails} /> */}

			

		</Drawer.Navigator>

		

	);
}