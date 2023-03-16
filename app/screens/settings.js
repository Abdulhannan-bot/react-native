import React, { useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { AuthContext } from "../utils/AuthContext";

export default function Sets({ navigation }) {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Card style={{ marginTop: 20 }}>
        <Card.Content>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("followeeSuggestion");
            }}
          >
            <Text style={styles.text}>View People You Follow</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("editProfile");
            }}
          >
            <Text style={styles.text}>Edit Your Profile</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <TouchableOpacity onPress={() => logout()}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "cneter",
    // justifyContent: "center",
  },
  text: {
    fontFamily: "tilt-neon",
    fontWeight: "bold",
    color: "darkblue",
  },
});
