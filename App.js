import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Task from './Task'
import Home from './home'
import Signin from './Signin'
import Signup from './Signup'
import { Button, Text,  View,  StyleSheet, TextInput } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();
export default function App() {
    return ( <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="main"
          component={loginScreen}
          options={{ title: 'You already Use your phone for everything else, why not use it for yourself?', headerStyle: { backgroundColor: 'blue', width: 100, height: 300 },
          headerTitleStyle: { color: 'white' }, headerTitleAlign:'center',}}
          
        />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Task" component={TaskScreen} />
      </Stack.Navigator>
      </NavigationContainer>
    );
  };
  const loginScreen = ({ navigation }) => {
    return (
      <View>
         <Button 
        title="Sign up"
        onPress={() =>
          navigation.navigate('Signup', { navigation: {navigation}})
        }
      />
      <Button 
        
        title="Login"
        onPress={() =>
          navigation.navigate('Signin', { navigation: {navigation}})
        }
      />
    
      </View>
    );
  };
  const AboutScreen = ({  navigation }) => {
    return <Text style={styles.info}>This is my app. It was built by a college student named Fatumata.
    I wanted to create a place for people to manage their time by creating and tracking tasks.
    </Text>;
  };

  const HomeScreen = ({ navigation }) => {
    return <Home  />;
  };
  const TaskScreen = ({  navigation}) => {
    return <Task  />;

  };
  const SigninScreen = ({ navigation }) => {
    return <Signin  />;

  };
  const SignupScreen = ({ navigation }) => {
    return <Signup  />;

  };
  const styles = StyleSheet.create({
    info: {
      color: 'blue',
      fontSize: 40,
      textAlign: 'center',
    },
    input: {
      border: 'none',  
      alignSelf: 'center',
      alignContent: 'center', 
    },
   start:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'space-between',
    marginTop: 300,
    textAlign: 'center',
    marginBottom: 100,
    alignSelf: 'center', 
    maxWidth: 300,
    alignContent: 'center',
    height: 200,
  
   },
   input:{
     textAlign:'center',
   },
   welcome:{
     textAlign:'center',
   },
  });
