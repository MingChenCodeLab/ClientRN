import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from "react-native";
import ListProduct from "../Products/index";
import NotificationPermission from "../../Services/Notify/NotificationPermission";
import useAuth from "../../Services/auth.services";
import Header from "../../components/Header/Header";
import { useNetworkStatus } from "../../Services/CheckInternet/index";
import CustomStatusBar from "../../components/StatusBar/CustomStatusBar";
export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const isConnected = useNetworkStatus();
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
        translucent={true}
        paddingTop={true}
      />
      <NotificationPermission />
      {/* <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" /> */}
      <Header navigation={navigation} />
      {!isConnected ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ListProduct navigation={navigation} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
