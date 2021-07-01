import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {  Button, StyleSheet, Text, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Signup = () => {
    const navigation = useNavigation(); 
    const [info, setInfo] = useState({username:'',password:'',email:''});
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {getData()}
    ,[])

const getData = async () => {
 try {
   // the '@profile_info' can be any string
   const jsonValue = await AsyncStorage.getItem('@profile_info')
   let data = null
   if (jsonValue!=null) {
     data = JSON.parse(jsonValue)
     setInfo(data)
     setUsername(data.username)
     setEmail(data.email)
     setPassword(data.password)
     console.log('just set Info, Name and Email')
   } else {
     console.log('just read a null value from Storage')
     setInfo({})
     setUsername("")
     setEmail("")
     setPassword("")
   }


 } catch(e) {
   console.log("error in getData ")
   console.dir(e)
   // error reading value
 }
}

const storeData = async (value) => {
 try {
   const jsonValue = JSON.stringify(value)
   await AsyncStorage.setItem('@profile_info', jsonValue)
   console.log('just stored '+jsonValue)
 } catch (e) {
   console.log("error in storeData ")
   console.dir(e)
   // saving error
 }
}
    return (
       
    <View>
        
        <Text>Login to track your progress</Text>
        <TextInput
          style ={styles.input}
          onChangeText={text => {setUsername(text)}}
          placeholder="username"
          value = {username}
          />
            <TextInput
          style ={styles.input}
          onChangeText={text => {setEmail(text)}}
           value = {email}
          placeholder="email"
          />
          <TextInput
          style ={styles.input}
          onChangeText={text => {setPassword(text)}}
           value = {password}
          placeholder="password"
          />
          
           <Button 
                title="Start Creating Tasks"
                onPress={() => {
                    const theInfo = {username:username,email:email,password:password}
                    console.log(`theInfo=${theInfo}`)
                    setInfo(theInfo)
                    console.log('data='+JSON.stringify(theInfo))
                    storeData(theInfo)
                    navigation.navigate('Home');
                    }}
        />
                
    </View>
);
};
const styles = StyleSheet.create ({
});

export default Signup;