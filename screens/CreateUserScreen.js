import React, { useState } from 'react'
import { View, Text,TextInput,StyleSheet,ScrollView,Button } from 'react-native'
import { db } from './firebase'

export default function CreateUserScreen({navigation}) {
    const [state,setState] = useState({
        name:'',
        email:'',
        phone:'',
    })

    const handleChangeText=(name,value)=>{
        setState({...state,[name]:value})
    }

    const handleCreateUser=async()=>{
        if(!state.name){
            alert('Please provide a name')
        }else{
            await db.collection('users').add({
                ...state
            })
            navigation.navigate('UserList')
        }
    }

    return (
        <ScrollView  style={styles.container}>
            <View style={styles.inputGroup} >
                <TextInput placeholder="Name User"   onChangeText={(value)=>handleChangeText('name',value)} />
            </View >
            <View  style={styles.inputGroup}>
                <TextInput placeholder="Email User"  onChangeText={(value)=>handleChangeText('email',value)} />
            </View>
            <View  style={styles.inputGroup}>
                <TextInput placeholder="Phone User"  onChangeText={(value)=>handleChangeText('phone',value)} />
            </View>
             <View>
                 <Button title="Save user" onPress={()=>handleCreateUser()} /> 
             </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup:{
      flex:1,
      padding:0,
      marginBottom:15,
      borderBottomWidth:1,
      borderBottomColor:"#cccccc"  
    },
})
