import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, MEDIA_URL } from "../utils/config";
import {
  FlatList,
  ScrollView,
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  Button,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// import { pressHandler } from "../utils/navigate";
import { AuthContext } from "../utils/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { useDeviceOrientation } from "@react-native-community/hooks";
import { Ionicons } from "@expo/vector-icons";
import BottomTab from "../routes/bottomTab";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Home({ navigation }) {
  console.log(useDeviceOrientation());
  const orientation = useDeviceOrientation();
  // const [suggestions, setSuggestions] = useState(null);
  const [posts, setPosts] = useState(null);
  const [following, setFollowing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo, suggestions, home, logout, like, unlike, liked } =
    useContext(AuthContext);

  useEffect(() => home(), []);
  // let likes = [];
  // if (suggestions && suggestions["likes"]) {
  //   console.log(suggestions["likes"]);
  //   likes = suggestions["likes"];
  //   suggestions["likes"].forEach((x) => likes.push(x["id"]));
  //   console.log(likes);
  // }

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={globalStyles.background}
    >
      <View style={styles.container}>
        {suggestions ? (
          suggestions["posts"].length !== 0 ? (
            <>
              <FlatList
                // scrollEnabled={false}
                data={suggestions["posts"]}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <Card
                        style={{
                          borderWidth: 0, // Remove Border

                          shadowColor: "rgba(0,0,0, 0.0)", // Remove Shadow for iOS
                          shadowOffset: { height: 0, width: 0 },
                          shadowOpacity: 0,
                          shadowRadius: 0,

                          elevation: 0, // Remove Shadow for Android
                        }}
                      >
                        <Card.Content>
                          <Card.Content style={styles.postTitle}>
                            <Image
                              source={{
                                width: 40,
                                height: 40,
                                uri: `${MEDIA_URL}${item.profile}`,
                              }}
                              style={{ borderRadius: 50 }}
                            />
                            <View style={styles.postDetails}>
                              <Text style={styles.postUser}>
                                {item.user_name}
                              </Text>
                              <Text style={styles.postDate}>
                                Published:
                                {new Date(item.created_at).toDateString()}
                              </Text>
                            </View>
                          </Card.Content>
                          {item.File ? (
                            <>
                              <Image
                                source={{
                                  // width: 360,
                                  height: 250,
                                  uri: `${MEDIA_URL}${item.File}`,
                                }}
                                style={styles.postImage}
                              />
                              <View
                                style={{
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                  marginTop: 10,
                                }}
                              >
                                {liked && liked.includes(item.id) ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      unlike(
                                        item.id,
                                        item.user_id,
                                        userInfo.accountId
                                      )
                                    }
                                  >
                                    <Ionicons
                                      name="heart"
                                      size={20}
                                      color="black"
                                      style={{ marginRight: 5 }}
                                    />
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity
                                    onPress={() =>
                                      like(
                                        item.id,
                                        item.user_id,
                                        userInfo.accountId
                                      )
                                    }
                                  >
                                    <Ionicons
                                      name="heart-outline"
                                      size={20}
                                      color="black"
                                      style={{ marginRight: 5 }}
                                    />
                                  </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate("comments", item)
                                  }
                                >
                                  <Ionicons
                                    name="chatbubbles-outline"
                                    size={20}
                                    color="black"
                                  />
                                </TouchableOpacity>
                              </View>
                            </>
                          ) : (
                            <></>
                          )}

                          {item.description ? (
                            <Text style={styles.postDescription}>
                              {item.description}
                            </Text>
                          ) : (
                            <></>
                          )}
                        </Card.Content>
                      </Card>
                    </View>
                  );
                }}
              />
            </>
          ) : (
            <>
              {/* <Button>Hello</Button> */}
              <Text
                style={{
                  alignSelf: "center",
                  color: "darkgray",
                  fontWeight: "bold",
                  fontFamily: "tilt-neon",
                }}
              ></Text>
            </>
          )
        ) : (
          <></>
        )}
        {/* <View style={styles.buttonView}>
          <Button title="logout" onPress={() => logout()} />
        </View> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    postion: "relative",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  buttonView: {
    postion: "fixed",
    bottom: 0,
    flexDirection: "row",
  },
  postTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 90,
  },
  postDetails: {
    paddingLeft: 20,
    // padding: -20,
  },
  postImage: {
    marginTop: -20,
  },
  postUser: {
    fontWeight: "bold",
    fontFamily: "tilt-neon",
    fontSize: 14,
  },
  postDate: {
    color: "gray",
    fontSize: 8,
  },
  postDescription: {
    marginTop: 20,
  },
  suggestions: {
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 135,
    height: 105,
    // paddingBottom: 10,
  },

  suggestions2: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: 135,
    // height: 205,
  },

  suggestionName: {
    fontFamily: "tilt-neon",
    fontSize: 8,
    marginBottom: 5,
    fontWeight: "bold",
    color: "darkblue",
  },
});
