import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";
import CpnPayment from "../../components/Payment/CpnPayment";
const Payment = ({navigation}) => {
  return (
    <View style={styles.container}>
    <View style={styles.vOrder}>
      <TouchableOpacity
        style={styles.padTop}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={20} />
      </TouchableOpacity>
      <Text style={[styles.padTop, styles.txtTitle]}>Thanh toán</Text>
      <TouchableOpacity style={styles.padTop}>
        <FontAwesomeIcon icon={faSearch} size={20} />
      </TouchableOpacity>
    </View>
    <ScrollView style={styles.vScroll}>
      <CpnPayment navigation={navigation}/>
    </ScrollView>
  </View>
  )
}

export default Payment

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 1000,
    flex: 1,
  },
  vOrder: {
    width: "95%",
    height: 44,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  padTop: {
    paddingTop: 10,
    marginStart: 10,
    marginEnd: 10,
  },
  txtTitle: {
    fontSize: 20,
    width: 140,
    textAlign: "center",
  },
  vScroll: {
    width: "95%",
    height: 990,
    alignSelf: "center",
  },
});