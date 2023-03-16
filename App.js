// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Home from "./app/screens/home";
import Register from "./app/screens/register";
import * as Font from "expo-font";
import { useFonts } from "@use-expo/font";
import AppLoading from "expo-app-loading";
import Navigator from "./app/routes/homeStack";
import { AuthProvider } from "./app/utils/AuthContext";
import BottomTab from "./app/routes/bottomTab";
import { AppRegistry, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

AppRegistry.registerComponent("main", () => App);
AppRegistry.registerComponent("main".toLowerCase(), () => App);

const getFonts = () =>
  Font.loadAsync({
    "tilt-neon": require("./app/assets/fonts/TiltNeon-Regular.ttf"),
    "tilt-warp": require("./app/assets/fonts/TiltWarp-Regular.ttf"),
  });

export default function App() {
  const [isLoadingComplete, setLoading] = useState(false);

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <AuthProvider>
        <NavigationContainer>
          <BottomTab />
        </NavigationContainer>
      </AuthProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }
}

// import {
//   Image,
//   Button,
//   Dimensions,
//   Text,
//   View,
//   StyleSheet,
//   StatusBar,
//   Platform,
//   SafeAreaView,
//   useWindowDimensions,
// } from "react-native";

// import FadeInOut from "react-native-fade-in-out";

// import RenderHtml from "react-native-render-html";

// import { useDeviceOrientation, useLayout } from "@react-native-community/hooks";
// import WelcomeScreen from "./app/screens/WelcomeScreen";

// export default function App() {
//   const [visible, setVisible] = useState(true);
//   const toggleVisible = () => {
//     console.log("loaded");
//     setVisible(!visible);
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.fadeContainer}>
//         <FadeInOut
//           style={styles.logo}
//           visible={visible}
//           rotate={true}
//           duration={3000}
//           scale={true}
//         >
//           <View style={styles.logoContainer}>
//             <Image
//               style={styles.logo}
//               source={require("./app/assets/network.png")}
//             />
//           </View>
//         </FadeInOut>
//       </View>

//       <Button onPress={toggleVisible} title="login" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: "#fff",
//     // alignItems: "center",
//     // justifyContent: "center",
//     backgroundColor: "lightgreen",
//   },
//   logo: {
//     flex: 1,
//     resizeMode: "contain",
//     height: 20,
//   },
//   image: {
//     height: 200,
//   },
//   fadeContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// })
