import React from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import {
  Navigation,
  ProfileNavigation,
  PostNavigation,
  SuggestionNavigation,
  SettingNavigation,
} from "./homeStack";

import Home from "../screens/home";
import Profile from "../screens/profile";
import AddPost from "../screens/addPost";

const home = "Home";
const profile = "Profile";
const addPost = "Settings";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      // screenOptions={{ headerShown: false }}
      // initialRoutename={home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "My Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (rn === "Post") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (rn === "Suggestions") {
            iconName = focused ? "people" : "people-outline";
          } else if (rn === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarOptions: {
          activeTintcolor: "black",
          labelStyle: {
            fontSize: 40,
          },
        },
      })}
    >
      <Tab.Screen name="Home" component={Navigation} />
      <Tab.Screen name="Suggestions" component={SuggestionNavigation} />
      <Tab.Screen name="Post" component={PostNavigation} />
      <Tab.Screen name="My Profile" component={ProfileNavigation} />
      <Tab.Screen name="Settings" component={SettingNavigation} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
