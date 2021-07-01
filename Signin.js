import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {  Button, StyleSheet, Text, TextInput, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = () => {
    const [canLog, setCanLog] = useState(false);
    const navigation = useNavigation(); 
    const [info, setInfo] = useState({username:'',password:'',email:''});
    const [username, setUsername] = useState("");
    const [maybeUsername, setMaybeUsername] = useState("");
    const [email, setEmail] = useState("");
    const [maybePassword, setMaybePassword] = useState("");
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


const compareData = async (value) => {
 try {
   const jsonValue = JSON.stringify(value)
   console.log("Can they log in?"+(maybePassword.valueOf() == password.valueOf()&& maybeUsername.valueOf() == username.valueOf()))
   console.log("actual user"+username)
   console.log("actual pass"+password)
   console.log("acl user"+maybeUsername)
   console.log("acl pass"+maybePassword)
   var ans = (maybePassword.valueOf() == password.valueOf()&& maybeUsername.valueOf() == username.valueOf())
   setCanLog(ans)
   console.log(ans)
   return ans
   
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
          onChangeText={text => {setMaybeUsername(text)}}
          placeholder="username"
          //value = {username}
          />
          <TextInput
          style ={styles.input}
          onChangeText={text => {setMaybePassword(text)}}
           //value = {password}
          placeholder="password"
          />
          
           <Button 
                title="login"
                onPress={() => {
                    getData();
                    compareData();
                    if (canLog){
                        
                    navigation.navigate('Home');
                   
                    }else{
                       setCanLog("Sorry, your password or username don't match, you can't log in")
                    }
                    }}
        />
              <Text>{canLog}</Text>
    </View>
);
};
const styles = StyleSheet.create ({
});

export default Signin;