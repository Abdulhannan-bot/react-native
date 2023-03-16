import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, TextInput, Button } from "react-native-paper";
import { AuthContext } from "../utils/AuthContext";
import { globalStyles } from "../styles/globalStyles";

export default function Register({ navigation }) {
  console.log(navigation);
  const [username, setUsername] = useState(null);
  const [first_name, setFirstName] = useState(null);
  const [last_name, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, register } = useContext(AuthContext);

  const pressHandler = () => {
    navigation.navigate("Login");
  };
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={globalStyles.background}
    >
      <View style={globalStyles.container}>
        <ActivityIndicator animating={isLoading} />
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <TextInput
              label="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            ></TextInput>
          </Card.Content>
          <Card.Content style={styles.cardContent}>
            <TextInput
              label="First Name"
              value={first_name}
              onChangeText={(text) => setFirstName(text)}
            ></TextInput>
          </Card.Content>
          <Card.Content style={styles.cardContent}>
            <TextInput
              label="Last Name"
              value={last_name}
              onChangeText={(text) => setLastName(text)}
            ></TextInput>
          </Card.Content>
          <Card.Content style={styles.cardContent}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
          </Card.Content>
          <Card.Content style={styles.cardContent}>
            <TextInput
              label="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </Card.Content>
          <Card.Content style={styles.login}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={pressHandler}>
              <Text style={styles.loginTouchable}>Login</Text>
            </TouchableOpacity>
            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {
                register(username, first_name, last_name, email, password);
              }}
            >
              Register
            </Button>
          </Card.Content>
        </Card>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: "tilt-neon",
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 20,
  },
  card: {
    // backgroundColor: "rgba(255,255,255,.4)",
  },
  cardContent: {
    // backgroundColor: "transparent",
    marginBottom: 10,
  },
  button: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  login: {
    alignSelf: "center",
  },
  loginText: {
    textAlign: "center",
  },
  loginTouchable: {
    textAlign: "center",
    color: "dodgerblue",
  },
});
