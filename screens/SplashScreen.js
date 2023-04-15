import React, { useEffect } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("Login");
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logo, { opacity: fadeAnim }]}>
        <Image source={require("../assets/favicon.png")} style={styles.image} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default SplashScreen;
