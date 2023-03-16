import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { useInteractionManager } from "@react-native-community/hooks";
import Navigation from "../routes/homeStack";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [posts, setPosts] = useState(null);
  const [following, setFollowing] = useState(null);
  const [splashLoading, setSplashLoading] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState(null);
  const [accInfo, setAccInfo] = useState(null);

  const [liked, setLiked] = useState(null);

  // console.log(`userInfo ${userInfo}`);

  // const refresh = () => window.location.reload(true);

  const register = (username, first_name, last_name, email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/register`, {
        username,
        first_name,
        last_name,
        email,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo.token));
        setIsLoading(false);
        setToken(userInfo.token);
        setUserImage(userInfo.image);
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`register error: ${err}`);
      });
  };

  const login = (username, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/login`, {
        username,
        password,
      })
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        console.log(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo.token));
        setIsLoading(false);
        setToken(userInfo.token);
        setUserImage(userInfo.image);
        // console.log(JSON.stringify(userInfo.token));
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`login error: ${err}`);
      });
    // console.log(`userInfo ${userInfo.token}`);
    // console.log(AsyncStorage.getItem("userinfo"));
  };

  const home = () => {
    const likeArray = [];
    console.log(userInfo.token);
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/account-detail/${userInfo.token}`, {
        headers: { Authorization: `Token ${userInfo.token}` },
      })
      .then((res) => {
        setIsLoading(false);
        setSuggestions(res.data);
        res.data["likes"].forEach((x) => likeArray.push(x["post_id"]));
        setLiked(likeArray);
        AsyncStorage.setItem("userData", JSON.stringify(userData));
        // if (suggestions) {
        //   console.log(suggestions["posts"]);
        // }
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`suggestiomns error: ${err}`);
      });
  };

  const logout = () => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: { Authorization: `Token ${userInfo.token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        AsyncStorage.removeItem("userInfo");
        setUserInfo({});
        setSuggestions(null);
        setComment(null);
        setUserImage(null);
        setAccInfo(null);
        setSplashLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`logout error: ${err}`);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userData = await AsyncStorage.getItem("userData");
      userData = JSON.parse(userData);

      if (userData) {
        setUserInfo(userData);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error: ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  // const addPost = (file = null, text = null) => {
  //   setIsLoading(true);
  //   //////////////////////////////////////////////////////////
  //   const formData = new FormData();

  //   formData.append("File", {
  //     uri: file,
  //     type: "image/jpeg", // or photo.type
  //     name: "testPhotoName",
  //   });

  //   formData.append("description", text);

  //   const options = {
  //     method: "POST",
  //     body: formData,
  //     // If you add this, upload won't work
  //     // headers: {
  //     //   'Content-Type': 'multipart/form-data',
  //     // }
  //   };

  //   fetch(`${BASE_URL}/post-create`, options, {
  //     headers: {
  //       Authorization: `Token ${userInfo.token}`,
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       console.log("Fetch Success==================");
  //       console.log(responseData);
  //     });
  //   }

  ////////////////////////////////////////////////////////////
  //   axios
  //     .post(
  //       `${BASE_URL}/post-create`,
  //       // File: file,
  //       // // user_name: userInfo.user,
  //       // description: text,
  //       // user_id: userInfo.accountId,
  //       // // profile: userInfo.image,
  //       options,
  //       {
  //         headers: {
  //           Authorization: `Token ${userInfo.token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       setIsLoading(false);
  //       home();
  //       // console.log(`comment ${comment}`);
  //       // AsyncStorage.setItem("userData", JSON.stringify(userData));
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.warn(`posts error: ${err}`);
  //     });
  // };

  const comments = (id) => {
    console.log(id);
    setIsLoading(true);
    setComment(null);
    axios
      .get(`${BASE_URL}/comments/${String(id)}`, {
        headers: { Authorization: `Token ${userInfo.token}` },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        setComment(res.data);
        console.log(`comment ${comment}`);
        // AsyncStorage.setItem("userData", JSON.stringify(userData));
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`comments error: ${err}`);
      });
  };

  const addComment = (comment, postId, accountId, user) => {
    axios
      .post(
        `${BASE_URL}/add-comment`,
        { text: comment, post_id: postId, user_id: accountId, user_name: user },
        {
          headers: { Authorization: `Token ${userInfo.token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        comments(postId);
        // setComment(res.data);
        // console.log(`comment ${comment}`);
        // AsyncStorage.setItem("userData", JSON.stringify(userData));
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`add comment error: ${err}`);
      });
  };

  const like = (postId, postBy, likedBy) => {
    axios
      .post(
        `${BASE_URL}/like`,
        {
          post_id: postId,
          user_id: postBy,
          liked_by: likedBy,
        },
        {
          headers: { Authorization: `Token ${userInfo.token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        // setLiked((oldArray) => [...oldArray, postId]);
        home();
        // setComment(res.data);
        // console.log(`comment ${comment}`);
        // AsyncStorage.setItem("userData", JSON.stringify(userData));
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`like error: ${err}`);
      });
  };

  const unlike = (postId, userId, likedBy) => {
    axios
      .delete(`${BASE_URL}/unlike/${postId}/${userId}/${likedBy}`, {
        headers: { Authorization: `Token ${userInfo.token}` },
      })
      .then((res) => {
        console.log(res.data);
        setIsLoading(true);
        home();
        // setComment(res.data);
        // console.log(`comment ${comment}`);
        // AsyncStorage.setItem("userData", JSON.stringify(userData));
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`like error: ${err}`);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const accountInfo = (id) => {
    setAccInfo(null);
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/account-info/${id}/${userInfo.token}`, {
        headers: { Authorization: `Token ${userInfo.token}` },
      })
      .then((res) => {
        setIsLoading(false);
        setAccInfo(res.data);
        // res.data["likes"].forEach((x) => likeArray.push(x["post_id"]));
        // setLiked(likeArray);
        // AsyncStorage.setItem("userData", JSON.stringify(userData));
        // if (suggestions) {
        //   console.log(suggestions["posts"]);
        // }
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`follows error: ${err}`);
      });
  };

  const addFollow = (followee, follower) => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/follow`,
        {
          follower: follower,
          followee: followee,
        },
        {
          headers: { Authorization: `Token ${userInfo.token}` },
        }
      )
      .then((res) => {
        setIsLoading(false);
        home();
        // res.data["likes"].forEach((x) => likeArray.push(x["post_id"]));
        // setLiked(likeArray);
        // AsyncStorage.setItem("userData", JSON.stringify(userData));
        // if (suggestions) {
        //   console.log(suggestions["posts"]);
        // }
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`add follows error: ${err}`);
      });
  };

  const unFollow = (followee, follower) => {
    setIsLoading(true);
    axios
      .delete(`${BASE_URL}/unfollow/${followee}/${follower}`, {
        headers: { Authorization: `Token ${userInfo.token}` },
      })
      .then((res) => {
        setIsLoading(false);
        home();
        // res.data["likes"].forEach((x) => likeArray.push(x["post_id"]));
        // setLiked(likeArray);
        // AsyncStorage.setItem("userData", JSON.stringify(userData));
        // if (suggestions) {
        //   console.log(suggestions["posts"]);
        // }
      })
      .catch((err) => {
        setIsLoading(false);
        console.warn(`add follows error: ${err}`);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        suggestions,
        isLoading,
        userInfo,
        setUserInfo,
        splashLoading,
        userImage,
        image,
        comment,
        liked,
        accInfo,
        unFollow,
        addFollow,
        accountInfo,
        pickImage,
        unlike,
        like,
        addComment,
        comments,
        // addPost,
        logout,
        home,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
