import React, { useContext } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../utils/AuthContext";
import { MEDIA_URL } from "../utils/config";

export default function Header({ navigation }) {
  console.log(navigation);

  const { userImage, addPost } = useContext(AuthContext);
  return (
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <Image
          source={require("../assets/img/network.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={styles.headerText}>Net..Work..Ing</Text>
      </View>
      <View style={styles.headerOptions}>
        <Image
          source={{
            width: 30,
            height: 30,
            uri: `${MEDIA_URL}/media/${userImage}`,
          }}
          style={{ marginRight: 0, borderRadius: 50 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLogo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    paddingLeft: 10,
    fontStyle: "italic",
    fontWeight: 800,
    color: "darkblue",
  },
  headerOptions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  addPost: {
    fontWeight: 400,
    fontSize: 40,
    marginRight: 20,
  },
});
