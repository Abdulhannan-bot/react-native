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
import { AuthContext } from "../utils/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "react-native-paper";
import { globalStyles } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";

export default function FolloweeSuggestions({ navigation }) {
  const { suggestions, accountInfo, addFollow, userInfo, unFollow } =
    useContext(AuthContext);
  // if (suggestions) console.log(suggestions["suggestions"]);
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={globalStyles.background}
    >
      <View style={styles.container}>
        {suggestions && suggestions["my_follows"] ? (
          <FlatList
            data={suggestions["my_follows"]}
            renderItem={({ item }) => {
              return (
                <View>
                  <Card>
                    <Card.Content style={styles.suggestions2}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Image
                          source={{
                            width: 50,
                            height: 50,
                            uri: `${MEDIA_URL}${item.profile_pic}`,
                          }}
                          style={{ borderRadius: 50, marginBottom: 5 }}
                        />
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "darkblue",
                              fontWeight: "bold",
                            }}
                          >
                            {item.user_name}
                          </Text>

                          <TouchableOpacity>
                            <Text
                              style={{
                                color: "dodgerblue",
                                // textDecorationStyle: "underline",
                                fontWeight: "bold",
                                fontSize: 12,
                              }}
                              onPress={() =>
                                navigation.navigate("followeeProfile", item.id)
                              }
                            >
                              View profile
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View>
                        <Button
                          title="Unfollow"
                          onPress={() => {
                            unFollow(item.id, userInfo.accountId);
                            navigation.popToTop();
                            navigation.navigate("settings");
                          }}
                        />
                      </View>
                    </Card.Content>
                  </Card>
                </View>
              );
            }}
          />
        ) : (
          <></>
        )}
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
