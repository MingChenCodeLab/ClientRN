import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Information from "../Informations/Information";
import OrderInfo from "./OrderInfo";
import Repurchase from "../Informations/Repurchase";
import About from "../Informations/About";

export default Profile = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Information navigation={navigation} />
      </View>
      <View style={styles.section}>
        <OrderInfo navigation={navigation} />
      </View>
      <View style={styles.section}>
        <Repurchase navigation={navigation} />
      </View>
      <View style={styles.section}>
        <About navigation={navigation}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


