import React, {   useEffect, useState } from "react";
import 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {  Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused,useNavigation } from '@react-navigation/native';
  
  
const Home = () => {
     const [todaysToDo, setData] = useState([])
     const [username, setUsername] = useState("")
     const [mood, setMood] = useState("")
     const today =new Date().toDateString()
     const isFocused = useIsFocused()
     const [delayDate, setSelectedValue] = useState(1);
     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

     useEffect(() => {
        getItems()
    } ,[isFocused])
    useEffect(() => {
        name()
    } ,[isFocused])
    
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    
   
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
    getItems()  
   await AsyncStorage.setItem(newDate.toDateString(), JSON.stringify(data));
   
  } 
 
const delay = async(item)=> {
   
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
   <View style={styles.heading}>
    <Text style={styles.intro}>
    
      Hey {username}, how are you feeling today?
    </Text>
    <TextInput
         style={styles.mood}
          onChangeText={text => {setMood(text)}}
          placeholder="I'm feeling ...."
          />
          </View> 
          
      
     
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
        
         <Button title="Delay" onPress={showDatePicker} />
        
         <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={() =>{setSelectedValue 
          delay(r)} }
        onCancel={hideDatePicker}
      />
 
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
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    backgroundColor: 'blue',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  intro:{
    alignSelf: 'center',
    fontSize: 35,
  },
  mood: {
    backgroundColor: 'white',
    fontSize: 20,
    height:40,
    width: 250,
    borderRadius: 10,
 
  },
  textinput:{
    margin:20,
    marginLeft:53,
    fontSize:20
  },
  flex:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default Home;