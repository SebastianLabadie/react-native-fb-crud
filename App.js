
import React from 'react';
import { StyleSheet, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import UsersList from './screens/UsersList';
import UserDetailScreen from './screens/UserDetailScreen';
import CreateUserScreen from './screens/CreateUserScreen';

const Stack = createStackNavigator()
function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen   name="UsersList" component={UsersList} options={{title:'User'}} />
      <Stack.Screen   name="CreateUserScreen" component={CreateUserScreen} options={{title:'Create a New User'}}/>
      <Stack.Screen   name="UserDetailScreen" component={UserDetailScreen}options={{title:'User Detail'}} />
    </Stack.Navigator>
  )

}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>
  );
}

