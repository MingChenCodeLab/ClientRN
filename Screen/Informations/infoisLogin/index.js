import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from "../../../Services/AuthContext";
import background from "../../../images/backgroundprofile.png";
const UserProfile = ({ avatar, countFavorites }) => {
  const navigation = useNavigation();
  const { favoritesState, authState } = React.useContext(AuthContext);
  console.log("favoritesState = " + JSON.stringify(favoritesState));

  const defaultAvatar = require('../../../assets/avatardefault_92824.png');

  return (
    <ImageBackground style={styles.container} source={background} resizeMode="cover">

      <TouchableOpacity style={styles.avatarButton} onPress={() => navigation.navigate("UploadImage")}>
        <Image
          style={styles.avatar}
          source={avatar ? { uri: avatar } : defaultAvatar}
        />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{authState?.userInfo?.username}</Text>
        <Text style={styles.favorites}>
          {favoritesState.favorites?.value} sản phẩm đã thích
        </Text>
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("Setting")}>
        <FontAwesomeIcon icon={faCog} size={24} style={styles.icon} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    paddingHorizontal: 16,
    backgroundColor: '#fff',

  },
  iconButton: {
    marginRight: 0,
    marginTop: 0,
  },
  icon: {
    color: '#333',
  },
  avatarButton: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  favorites: {
    fontSize: 14,
    color: '#666',
  },
});
