import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { AuthContext } from "../../Services/AuthContext";
import InfoIsLogin from "../Informations/infoisLogin/index";
import CustomStatusBar from '../../components/StatusBar/CustomStatusBar';
import background from "../../images/backgroundprofile.png";
import login from "../../images/login.png";

export default function Information({ navigation }) {
  const { authState } = useContext(AuthContext);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimeoutReached(true), 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => navigation.navigate("Login");
  const handleRegister = () => navigation.navigate("Register");

  if (authState.isLoading && !timeoutReached) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {authState.userToken == null ? (
        <ImageBackground
          style={styles.loginContainer}
          source={background}
          resizeMode="cover"
        >
          <CustomStatusBar
            animated
            backgroundColor="transparent"
            barStyle="dark-content"
            showHideTransition="fade"
            hidden={false}
            translucent
            paddingTop
          />
          <Text style={styles.loginPrompt}>
            Đăng nhập để trải nghiệm tốt hơn nhé!
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Image style={styles.loginImage} source={login} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerText}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      ) : (
        <InfoIsLogin />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 160,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  loginPrompt: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 15,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    width: 100,
    height: 45,
    marginRight: 15,
  },
  loginImage: {
    width: "100%",
    borderRadius: 5,
    height: 45,
  },
  registerButton: {
    width: 100,
    height: 45,
    borderColor: "rgba(213, 79, 133, 0.68)",
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  registerText: {
    color: "rgba(0, 123, 167, 0.67)",
    fontWeight: "800",
  },
});
