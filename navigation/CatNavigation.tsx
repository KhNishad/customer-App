
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContent} from '../components/DrawerContents';

import { createStackNavigator } from '@react-navigation/stack';

// import screens 


import CategoryScreen from '../screens/CategoryScreen';
import categoryWiseProductScreen from '../screens/CategoryProductScreen'
import ProductDetails from '../screens/ProductDetailsScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



export default function CatRoot() {
	return (
		<Drawer.Navigator initialRouteName="Categories"  drawerContent = {props => <DrawerContent {...props}/>}>
		    <Drawer.Screen name="CategoryScreen" component={CategoryScreen} />
			<Drawer.Screen name="categoryWiseProductScreen" component={categoryWiseProductScreen} />
			{/* <Drawer.Screen name="ProductDetails" component={ProductDetails} /> */}
		</Drawer.Navigator>

	);
}