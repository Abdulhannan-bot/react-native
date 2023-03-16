import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createAppContainer } from "react-navigation";
import { AuthContext } from "../utils/AuthContext";
import BottomTab from "./bottomTab";
// import * as appScreens from "app/screens/";

import Home from "../screens/home";
import Register from "../screens/register";
import Login from "../screens/login";
import SplashScreen from "../screens/splashScreen";
import Header from "../screens/header";
import LoginHeader from "../screens/loginHeader";
import AddPost from "../screens/addPost";
import Comments from "../screens/comments";
import Profile from "../screens/profile";
import EditProfile from "../screens/editProfile";
import Suggestions from "../screens/suggestions";
import UserProfile from "../screens/userProfile";
import Sets from "../screens/settings";
import FolloweeSuggestions from "../screens/FolloweeSuggestions";
import FolloweeProfile from "../screens/followeeProfile";

const Stack = createStackNavigator();

const Navigation = () => {
  const { userInfo, userData, splashLoading } = useContext(AuthContext);
  return (
    <>
      <Stack.Navigator>
        {userInfo.token ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: () => <Header />,
              }}
            ></Stack.Screen>
            {/* <Stack.Screen
                name="profile"
                component={Profile}
                options={{
                  title: "Profile",
                }}
              ></Stack.Screen> */}
            <Stack.Screen
              name="comments"
              component={Comments}
              options={{
                title: "Comments",
              }}
            ></Stack.Screen>

            {/* <Stack.Screen name="Header" component={Header}></Stack.Screen> */}

            {/* <Stack.Screen
                name="addPost"
                component={AddPost}
                options={{
                  title: "Add Post",
                }}
              ></Stack.Screen> */}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerTitle: () => <LoginHeader /> }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerTitle: () => <LoginHeader /> }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export { Navigation };

const ProfileNavigation = () => {
  const { userInfo, userData, splashLoading } = useContext(AuthContext);
  return (
    <>
      <Stack.Navigator>
        {userInfo.token ? (
          <>
            {/* <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitle: () => <Header />,
                }}
              ></Stack.Screen> */}
            <Stack.Screen
              name="profile"
              component={Profile}
              options={{
                headerTitle: () => <Header />,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="editProfile"
              component={EditProfile}
              options={{
                title: "Edit Profile",
              }}
            ></Stack.Screen>
            {/* <Stack.Screen
                name="comments"
                component={Comments}
                options={{
                  title: "Comments",
                }}
              ></Stack.Screen> */}

            {/* <Stack.Screen name="Header" component={Header}></Stack.Screen> */}

            {/* <Stack.Screen
                name="addPost"
                component={AddPost}
                options={{
                  title: "Add Post",
                }}
              ></Stack.Screen> */}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerTitle: () => <LoginHeader /> }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerTitle: () => <LoginHeader /> }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export { ProfileNavigation };

const PostNavigation = () => {
  const { userInfo, userData, splashLoading } = useContext(AuthContext);
  return (
    <>
      <Stack.Navigator>
        {userInfo.token ? (
          <>
            {/* <Stack.Screen
                name="Home"
                component={Home}
                options={{
                  headerTitle: () => <Header />,
                }}
              ></Stack.Screen> */}
            {/* <Stack.Screen
                name="profile"
                component={Profile}
                options={{
                  title: "Profile",
                }}
              ></Stack.Screen> */}
            {/* <Stack.Screen
                name="comments"
                component={Comments}
                options={{
                  title: "Comments",
                }}
              ></Stack.Screen> */}

            {/* <Stack.Screen name="Header" component={Header}></Stack.Screen> */}

            <Stack.Screen
              name="addPost"
              component={AddPost}
              options={{
                headerTitle: () => <Header />,
              }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerTitle: () => <LoginHeader /> }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerTitle: () => <LoginHeader /> }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export { PostNavigation };

const SuggestionNavigation = () => {
  const { userInfo, userData, splashLoading } = useContext(AuthContext);
  return (
    <>
      <Stack.Navigator>
        {userInfo.token ? (
          <>
            <Stack.Screen
              name="suggestion"
              component={Suggestions}
              options={{
                headerTitle: () => <Header />,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="userProfile"
              component={UserProfile}
              options={{
                title: "User Profile",
              }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: () => <LoginHeader />,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerTitle: () => <LoginHeader /> }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export { SuggestionNavigation };

const SettingNavigation = () => {
  const { userInfo, userData, splashLoading } = useContext(AuthContext);
  return (
    <>
      <Stack.Navigator>
        {userInfo.token ? (
          <>
            <Stack.Screen
              name="sets"
              component={Sets}
              options={{
                headerTitle: () => <Header />,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="followeeSuggestion"
              component={FolloweeSuggestions}
              options={{
                title: "People You Follow",
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="followeeProfile"
              component={FolloweeProfile}
              options={{
                title: "User Profile",
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="editProfile"
              component={EditProfile}
              options={{
                title: "Edit Profile",
              }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerTitle: () => <LoginHeader />,
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerTitle: () => <LoginHeader /> }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export { SettingNavigation };
