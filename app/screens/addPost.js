import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../utils/AuthContext";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = `${BASE_URL}/post-create`; // replace with your API URL

const AddPost = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const { userInfo, home } = useContext(AuthContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result["assets"]);

    if (!result.canceled) {
      setImage(result.assets[0]["uri"]);
    }
  };

  const uploadImage = async () => {
    let localUri = image;

    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    console.log(match);
    let type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append("File", { uri: localUri, name: filename, type });
    formData.append("description", description);
    formData.append("user_id", userInfo.accountId);

    const token = userInfo.token; // replace with your token

    try {
      const response = await axios.post(`${API_URL}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });

      console.log(response.data);
      setImage(null);
      setDescription("");
      alert("Posted successfully!");
      home();
    } catch (error) {
      console.log(error);
      alert("Error occured. Please try again");
    }
  };

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF"]}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <ScrollView style={{ marginTop: 60 }}>
        <View style={styles.container}>
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <Button onPress={pickImage}>Pick an image</Button>
          <TextInput
            style={styles.description}
            placeholder="Write something for your post"
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
          <Button mode="contained" onPress={uploadImage} disabled={!image}>
            Post
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  description: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 20,
    width: "80%",
  },
});

export default AddPost;
