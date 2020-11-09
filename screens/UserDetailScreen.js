import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { db } from "./firebase";

export default function UserDetailScreen({ route, navigation }) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const getUserById = async (id) => {
    const res = await db.collection("users").doc(id).get();
    const user = res.data();
    setUser({ ...user, id: res.id });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(route.params);
  }, []);

  console.log(loading);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  const handleDeleteUser = async () => {
    const dbRef = db.collection("users").doc(user.id);
    await dbRef.delete();
    navigation.navigate("UsersList");
  };

  const handleUpdateUser = async () => {
    const dbRef = db.collection("users").doc(user.id);
    await dbRef.set({...user});
    navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Remove the user", "Are you sure?", [
      { text: "Yes", onPress: () => handleDeleteUser() },
      { text: "No", onPress: () => console.log('Canceled') },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name User"
          value={user.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email User"
          value={user.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone User"
          value={user.phone}
          onChangeText={(value) => handleChangeText("phone", value)}
        />
      </View>
      <View>
        <Button
          title="Update User"
          color="#19AC52"
          onPress={() => handleUpdateUser()}
        />
      </View>
      <View>
        <Button
          title="Delete User"
          color="#E37399"
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});
