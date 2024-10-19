import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.notificationItem}>
      <Image source={{ uri: item.image }} style={styles.shoeImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>${item.oldPrice}</Text>
          <Text style={styles.newPrice}>${item.newPrice}</Text>
        </View>
      </View>
      <Text style={styles.timeAgo}>{item.timeAgo}</Text>
    </TouchableOpacity>
  );
};

const Notification = () => {
  const notifications = [
    {
      id: "1",
      title: "We Have New Products With Offers",
      oldPrice: "364.95",
      newPrice: "260.00",
      image: "https://i.pinimg.com/originals/34/86/54/348654cc9b185bcccbeea80d2fae2bf8.png",
      timeAgo: "7 min ago",
    },
    {
      id: "2",
      title: "New Arrival: Latest Collection",
      oldPrice: "299.95",
      newPrice: "199.00",
      image: "https://i.pinimg.com/originals/34/86/54/348654cc9b185bcccbeea80d2fae2bf8.png",
      timeAgo: "15 min ago",
    },
    {
      id: "3",
      title: "Limited Time Offer on Bestsellers",
      oldPrice: "499.95",
      newPrice: "349.00",
      image: "https://i.pinimg.com/originals/34/86/54/348654cc9b185bcccbeea80d2fae2bf8.png",
      timeAgo: "30 min ago",
    },
    {
      id: "4",
      title: "Flash Sale: 50% Off on All Items",
      oldPrice: "399.95",
      newPrice: "199.00",
      image: "https://i.pinimg.com/originals/34/86/54/348654cc9b185bcccbeea80d2fae2bf8.png",
      timeAgo: "1 hour ago",
    },
    {
      id: "5",
      title: "Exclusive Offer for VIP Members",
      oldPrice: "249.95",
      newPrice: "199.00",
      image: "https://i.pinimg.com/originals/34/86/54/348654cc9b185bcccbeea80d2fae2bf8.png",
      timeAgo: "2 hours ago",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <View
        style={{
          borderWidth: 0.2,
          borderColor: 	"#AAAAAA",
          elevation: 3

        }} />
      <Text style={styles.sectionTitle}>Recent</Text>
      <FlatList
        data={notifications.slice(0, 3)}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id.toString()}  // Ensure this is unique and a string
      />
      <Text style={styles.sectionTitle}>Yesterday</Text>
      <FlatList
        data={notifications.slice(3)}
        renderItem={({ item }) => <NotificationItem item={item} />}
        keyExtractor={(item) => item.id.toString()}  // Ensure this is unique and a string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 30,
  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  shoeImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  oldPrice: {
    fontSize: 14,
    color: "#888",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  newPrice: {
    fontSize: 14,
    color: "#4A7AFF",
    fontWeight: "bold",
  },
  timeAgo: {
    fontSize: 12,
    color: "#888",
  },
});

export default Notification;
