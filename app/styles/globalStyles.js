import { StyleSheet, Platform, StatusBar } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: "tilt-warp",
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 20,
  },
});
