import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Contacts, NewContact } from '../pages';
import ListContacts from '../pages/ListContacts';




const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Contacts">
            <Stack.Screen name="Contacts" component={Contacts} options={{ headerShown: false}} /> 
            <Stack.Screen name="NewContact" component={NewContact} options={{ headerShown: false}} /> 
            <Stack.Screen name="ListContacts" component={ListContacts} options={{ headerShown: false}} /> 
        </Stack.Navigator>
    )
}

export default Router