
import React, { useState } from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AuthProvider } from "./Services/AuthContext";
import AppNavigator from "./AppNavigator";
import CustomStatusBar from './components/StatusBar/CustomStatusBar';
const MainApp = () => {

  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
        translucent={true}
      />
      <AppNavigator />
    </SafeAreaView>
  );
};
const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',

  },
});

export default App;
