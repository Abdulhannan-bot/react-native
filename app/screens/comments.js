import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../utils/AuthContext";

export default function Comments({ navigation, route }) {
  const { userInfo, comment, comments, addComment } = useContext(AuthContext);
  const [myComment, setMyComment] = useState(null);

  console.log(route.params.id);
  useEffect(() => comments(route.params.id), []);

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Card.Content style={styles.cardContent}>
          <TextInput
            label="Add Comment"
            value={myComment}
            onChangeText={(text) => {
              setMyComment(text);
            }}
          ></TextInput>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              addComment(
                myComment,
                route.params.id,
                userInfo.accountId,
                userInfo.user
              );
              setMyComment(null);
            }}
          >
            Send
          </Button>
        </Card.Content>
        {comment && comment.length !== 0 ? (
          <FlatList
            data={comment}
            renderItem={({ item }) => {
              return (
                <View>
                  <Card>
                    <Card.Content style={styles.comments}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text style={styles.commentor}>{item.user_name}</Text>
                        <Text style={styles.createdAt}>
                          {new Date(item.created_at).toDateString()}
                        </Text>
                      </View>

                      <Text>{item.text}</Text>
                    </Card.Content>
                  </Card>
                </View>
              );
            }}
          />
        ) : (
          <>
            <View>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 20,
                  fontWeight: 300,
                  fontFamily: "tilt-neon",
                  color: "darkgray",
                }}
              >
                No Comments Yet
              </Text>
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentor: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "tilt-neon",
  },
  createdAt: {
    fontSize: 10,
    fontFamily: "tilt-neon",
    color: "gray",
    paddingLeft: 10,
  },
  cardContent: {
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 80,
    marginTop: 20,
  },
});
