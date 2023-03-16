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
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, TextInput, Button } from "react-native-paper";
import { AuthContext } from "../utils/AuthContext";
import { globalStyles } from "../styles/globalStyles";

export default function Login({ navigation }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const { isLoading, login } = useContext(AuthContext);
  const pressHandler = () => navigation.navigate("Register");

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={globalStyles.background}
    >
      {/* <ActivityIndicator animating={isLoading} /> */}
      <View style={globalStyles.container}>
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
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
          </Card.Content>
          <Card.Content style={styles.login}>
            <Text style={styles.loginText}>New User?</Text>
            <TouchableOpacity onPress={pressHandler}>
              <Text style={styles.loginTouchable}>Register</Text>
            </TouchableOpacity>

            <Button
              mode="contained"
              style={styles.button}
              onPress={() => {
                login(username, password);
              }}
            >
              Login
            </Button>
          </Card.Content>
        </Card>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 60,
    fontSize: 30,
    fontFamily: "tilt-warp",
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 20,
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
