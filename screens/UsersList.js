import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { db } from './firebase'

export default function UsersList({navigation}) {
    const [users,setUsers] = useState([])


    useEffect(() => {
        db.collection('users').onSnapshot(querySnapshot=>{
            const users=[]
            querySnapshot.docs.forEach(doc=>{
                users.push({...doc.data(),id:doc.id})
            })

            setUsers(users)
        })

    }, [])

    const renderUsers=users?.map(user=>{
        return (
            <ListItem 
            key={user.id}
                bottomDivider
                onPress={()=>navigation.navigate('UserDetailScreen',user.id)}
            >
                <ListItem.Chevron />
                <Avatar rounded source={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}} />
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    })

    return (
        <ScrollView>
           <Button title="Create User " onPress={()=>navigation.navigate('CreateUserScreen')} />
           {renderUsers}
        </ScrollView>
    )
}
