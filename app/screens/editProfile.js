import React, { useContext, useState } from "react";
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
} from "react-native";
import { MEDIA_URL, BASE_URL } from "../utils/config";
import { AuthContext } from "../utils/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import { Card, TextInput, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_URL = `${BASE_URL}/account-update`;

export default function EditProfile() {
  const { userInfo, suggestions, setUserInfo } = useContext(AuthContext);
  const [cover, setCover] = useState(
    `${MEDIA_URL}/media/${userInfo.backgroundPic}`
  );
  const [prof, setProf] = useState(`${MEDIA_URL}/media/${userInfo.image}`);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);

  // console.log(`${MEDIA_URL}/media/${userInfo.backgroundPic}`);
  // console.log(suggestions["posts"]);

  const handleImagePicker = (imageNumber) => {
    ImagePicker.showImagePicker(
      {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error);
        } else {
          const source = { uri: response.uri };
          if (imageNumber === 1) {
            setCover(source);
          } else if (imageNumber === 2) {
            setProf(source);
          }
        }
      }
    );
  };

  const handleInputChange = (value, inputNumber) => {
    if (inputNumber === 1) {
      setInputOne(value);
    } else if (inputNumber === 2) {
      setInputTwo(value);
    }
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();
    formData.append("imageOne", {
      uri: imageOne.uri,
      type: "image/jpeg",
      name: "imageOne.jpg",
    });
    formData.append("imageTwo", {
      uri: imageTwo.uri,
      type: "image/jpeg",
      name: "imageTwo.jpg",
    });
    formData.append("inputOne", inputOne);
    formData.append("inputTwo", inputTwo);

    try {
      const token = "YOUR_AUTH_TOKEN_HERE";
      const headers = {
        Authorization: `Token ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post(`${API_URL}/your-endpoint/`, formData, {
        headers,
      });

      console.log("Response: ", response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0]["uri"]);

    if (!result.canceled) {
      setCover(result.assets[0]["uri"]);
    }
  };

  const pickProfileImage = async () => {
    let result1 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result1.assets[0]["uri"]);

    if (!result1.canceled) {
      setProf(result1.assets[0]["uri"]);
    }
  };

  const uploadImage = async () => {
    const formData = new FormData();
    let coverUri = cover;
    console.log(coverUri);
    let filename = coverUri.split("/").pop();
    console.log(`cover ${filename}`);

    let match = /\.(\w+)$/.exec(filename);
    console.log(match[1]);
    let type = match ? `image/${match[1]}` : `image`;
    // console.log(type);
    formData.append("background_pic", { uri: coverUri, name: filename, type });

    let profUri = prof;
    console.log(profUri);
    let profFile = profUri.split("/").pop();
    console.log(`profile ${profFile}`);

    let profMatch = /\.(\w+)$/.exec(profFile);
    console.log(profMatch);
    type = profMatch ? `image/${profMatch[1]}` : `image`;
    // console.log(profType);
    formData.append("profile_pic", { uri: profUri, name: profFile, type });

    formData.append("full_name", name);
    formData.append("email", email);
    formData.append("user", userInfo.userId);
    // formData.append("user_name", userInfo.user);

    const token = userInfo.token; // replace with your token
    // console.log(`${API_URL}/account-update/${userInfo.token}`);
    console.log(formData);
    try {
      const response = await axios.post(
        `${API_URL}/${userInfo.accountId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log(response.data);
      updatedValue = {
        image: profFile,
        backgroundPic: filename,
        name: name,
        email: email,
      };
      setUserInfo((prev) => ({
        ...prev,
        ...updatedValue,
      }));

      alert("Posted successfully!");
    } catch (error) {
      console.log(error);
      alert("Error occured. Please try again");
    }
  };

  return (
    <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.background}>
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

                uri: cover,
              }}
              blurRadius={1}
            />
            <Image
              source={{
                width: 120,
                height: 120,
                uri: prof,
              }}
              style={{
                alignSelf: "center",
                borderRadius: 60,
                borderWidth: 8,
                borderColor: "lightgray",
                position: "absolute",
                top: 180,
              }}
              blurRadius={8}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 17,
                top: 10,
                backgroundColor: "lightgray",
              }}
              onPress={() => pickCoverImage()}
            >
              <Ionicons name="create" size={20} color="dodgerblue">
                <Text
                  style={{
                    color: "dodgerblue",
                    fontSize: 15,
                  }}
                >
                  Edit Cover Image
                </Text>
              </Ionicons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 165,
                top: 230,
                backgroundColor: "lightgray",
                width: 80,
              }}
              onPress={() => pickProfileImage()}
            >
              <Ionicons name="create" size={11} color="dodgerblue">
                <Text
                  style={{
                    color: "dodgerblue",
                    fontSize: 11,
                  }}
                >
                  Edit Profile Image
                </Text>
              </Ionicons>
            </TouchableOpacity>
          </Card.Content>
          <View style={{ marginTop: 60 }}>
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                fontFamily: "tilt-neon",
                fontSize: 20,
                marginBottom: 20,
              }}
            >
              Account Details
            </Text>
            <Card.Content style={styles.cardContent}>
              <TextInput
                label="Full Name"
                value={name}
                onChangeText={(text) => setName(text)}
              ></TextInput>
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              ></TextInput>
              <Button
                mode="contained"
                style={{ marginHorizontal: 120, marginVertical: 30 }}
                onPress={uploadImage}
              >
                Update
              </Button>
            </Card.Content>
          </View>
        </Card>
      </View>
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
