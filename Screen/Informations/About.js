import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const About = ({ navigation }) => {
  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  const hanldPressContact = () => {
    navigation.navigate("Contact");
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => {
          navigation.navigate("LikeProducts");
        }}
      >
        <Image
          style={styles.icon}
          source={{ uri: "https://iili.io/JdjSFSI.png" }}
        />
        <Text style={styles.optionText}>Yêu thích</Text>
        <Image
          style={styles.arrowIcon}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation("Coupon")}
        style={styles.optionContainer}
      >
        <Image
          style={styles.icon}
          source={{ uri: "https://iili.io/JfxcmOb.png" }}
        />
        <Text style={styles.optionText}>Mã giảm giá</Text>
        <Image
          style={styles.arrowIcon}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => hanldPressContact()}
      >
        <Image
          style={styles.icon}
          source={{ uri: "https://iili.io/JdjS2Fp.png" }}
        />
        <Text style={styles.optionText}>Giới thiệu và liên hệ</Text>
        <Image
          style={styles.arrowIcon}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  optionContainer: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    flex: 1,
  },
  arrowIcon: {
    width: 25,
    height: 25,
    tintColor: "#CDCDCD",
  },
});

export default About;
