import React, {   useEffect, useState } from "react";
import 'react-native-gesture-handler';
import Calendar from 'react-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import {  Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Jumbotron from 'react-bootstrap/Jumbotron';
import { useIsFocused,useNavigation } from '@react-navigation/native';



  
  
const Home = () => {
     const [todaysToDo, setData] = useState([])
     const [username, setUsername] = useState("")
     const [mood, setMood] = useState("")
     const today =new Date().toDateString()
     const isFocused = useIsFocused()
     const [delayDate, setSelectedValue] = useState(1);
     const [show, setShow] = useState(false);
     const [mode, setMode] = useState('date');
     useEffect(() => {
        getItems()
    } ,[isFocused])
    useEffect(() => {
        name()
    } ,[isFocused])

   
const saveItems= async(given) => { 
    const items = await AsyncStorage.getItem(today+"mood") ;
    let data = []
    if(items){
      data = JSON.parse(items)
    }
    data.push(given)
       
   await AsyncStorage.setItem(today+"mood", JSON.stringify(data));
  
  } 

  const navigation = useNavigation();
  const name = async () => {
     try{
      var jsonValue = await AsyncStorage.getItem('@profile_info');
       var data = null
      if (jsonValue!=null) {
        data = JSON.parse(jsonValue)
        console.log(data.username)
        setUsername(data.username)
      }else{
       console.log("wronnggg")
      }
  } catch(e) {
    // read error
  }
}
const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
const getItems= async ()=>  { 
    try{
    const items = await AsyncStorage.getItem(today);
    let info = null
    if (items != null){
        info = JSON.parse(items)
        console.log(items)
        setData(info)
        console.log(todaysToDo)
    }
}catch(e) {
    // read error
  }
 
}
const saveDelay= async(given, newDate) => { 
    const items = await AsyncStorage.getItem(newDate.toDateString()) ;
    let data = []
    if(items){
      data = JSON.parse(items)
    }
    data.push(given);
       
   await AsyncStorage.setItem(newDate.toDateString(), JSON.stringify(data));
   
  } 
const delay = async(item)=> {
    setShow(Platform.OS === 'ios');
     deleteItem(item.id, new Date().toDateString())
     if (delayDate != null){
       saveDelay(item, delayDate)
    }
    getItems()

}
const deleteItem= async (key, date) => {
    try {
        const items = await AsyncStorage.getItem(date);
        var info = JSON.parse(items)
        
        const postsItems = info.filter(function(e){ return e.id != key });
        console.log(key)
        console.log(postsItems)
        await AsyncStorage.setItem(date, JSON.stringify(postsItems));
        getItems()
        return true;
    }
    catch(exception) {
        return false;
    }
}
  return (
    
  <View >
    
    <Text>
    
      Hey {username}, how are you feeling today?
    </Text>
    <TextInput
       
          onChangeText={text => {setMood(text)}}
          placeholder="I'm feeling ...."
          />
          <Button 
        title="save todays mood"
        onPress={() =>
         saveItems(mood)
        }
      />
     
        <Button 
        title="+"
        onPress={() =>
            navigation.navigate('Task')
        }
      />
     
    <View >
    <Text>Due Today </Text>
   
        {todaysToDo.map(r =>
     <View>
        
         <Button onPress={showDatepicker} title="Delay" />
         {show && (
        <DateTimePicker
        testID="dateTimePicker"
        value={delayDate}
        mode={mode}
        display="default"
        onChange={() =>{setSelectedValue 
          delay(delayDate, r)} }
      />
        
      )}
        
        <Text>{r.name}   {r.Description} {r.due}  </Text>
      <Button  title="Done"
                onPress={() => {
                    deleteItem(r.id,r.due)
                    }}/>
     
      </View>)}  
              
         </View>
        
        
  </View>
  );
};
const styles = StyleSheet.create ({
    
});

export default Home;