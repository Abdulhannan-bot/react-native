import React, { useContext } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { AuthContext } from "../utils/AuthContext";

export default function LoginHeader() {
  const { userImage } = useContext(AuthContext);
  return (
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <Image
          source={require("../assets/img/network.png")}
          style={{ width: 30, height: 30 }}
        />
        <Text style={styles.headerText}>Net..Work..Ing</Text>
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
});
