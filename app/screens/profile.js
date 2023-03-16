import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MEDIA_URL, BASE_URL } from "../utils/config";
import { AuthContext } from "../utils/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Card, TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const { userInfo, suggestions } = useContext(AuthContext);
  console.log(`${MEDIA_URL}/media/${userInfo.backgroundPic}`);
  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <Card
            style={{ flexDirecction: "row", justifyContent: "space-between" }}
          >
            <Card.Content style={{ paddingTop: 0 }}>
              <Image
                source={{
                  // Dimensions.get("window").width,
                  width: 380,
                  height: 250,
                  uri: `${MEDIA_URL}/media/${userInfo.backgroundPic}`,
                }}
              />
              <Image
                source={{
                  width: 120,
                  height: 120,
                  uri: `${MEDIA_URL}/media/${userInfo.image}`,
                }}
                style={{
                  alignSelf: "center",
                  borderRadius: 60,
                  borderWidth: 8,
                  borderColor: "lightgray",
                  position: "absolute",
                  top: 180,
                }}
              />
            </Card.Content>
            <Card.Content style={{ marginTop: 80 }}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  paddingBottom: 30,
                }}
              >
                <Text style={styles.userDetails}>
                  Username: {userInfo.user}
                </Text>
                <Text style={styles.userDetails}>Name: {userInfo.name}</Text>
                <Text style={styles.userDetails}>Email: {userInfo.email}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {suggestions && suggestions["followers"] ? (
                  <>
                    <Text style={styles.accountDetails}>
                      {suggestions["followers"].length} Followers
                    </Text>
                    <Text style={styles.accountDetails}>
                      {suggestions["following"].length} Following
                    </Text>
                    <Text style={styles.accountDetails}>
                      {suggestions["my_like"].length} Likes
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </View>
            </Card.Content>
          </Card>
          {suggestions && suggestions["my_posts"] ? (
            <FlatList
              // horizontal
              scrollEnabled={false}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              data={suggestions["my_posts"]}
              renderItem={({ item }) => {
                return (
                  <View
                  // style={{
                  //   flex: 1,
                  //   flexDirection: "column",
                  //   margin: 1,
                  //   // alignItems: "center",
                  // }}
                  >
                    <Image
                      source={{
                        width: 125,
                        height: 125,
                        uri: `${MEDIA_URL}${item.File}`,
                      }}
                      // style={{ borderRadius: 50, marginBottom: 5 }}
                    />
                  </View>
                );
              }}
            />
          ) : (
            <Text
              style={{
                alignSelf: "center",
                marginTop: 20,
                color: "gray",
                fontFamily: "tilt-neon",
                fontSize: 15,
              }}
            >
              You don't have any posts yet
            </Text>
          )}

          {/* <FlatList
          data={suggestions["posts"]}
          renderItems={({ item }) => {
            return (
              <View>
                <Image
                  source={{
                    width: 50,
                    height: 50,
                    uri: `${MEDIA_URL}${item.File}`,
                  }}
                />
              </View>
            );
          }}
        /> */}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
  background: {
    flex: 1,
  },
  accountDetails: {
    fontFamily: "tilt-neon",
    fontWeight: "bold",
  },
  userDetails: {
    fontFamily: "tilt-neon",
    fontWeight: "bold",
    fontSize: 15,
    color: "darkblue",
  },
});
