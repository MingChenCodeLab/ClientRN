import React, { useState ,useContext } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import AppButton from "../../components/AppButton";
import { FlatList } from "react-native";

const { width } = Dimensions.get("window");
const OnBoardingItem = [
  {
    id: 1,
    title: "Chào mừng đến với NIKE",
    subtitle: "Khám phá thế giới của sự vận động",
    image: require("../../assets/on_bd1.png"),
  },
  {
    id: 2,
    title: "Hiệu suất đỉnh cao",
    subtitle: "Trang bị công nghệ tiên tiến cho mọi bước chạy",
    image: require("../../assets/on_bd2.png"),
  },
  {
    id: 3,
    title: "Phong cách độc đáo",
    subtitle: "Thể hiện cá tính qua từng thiết kế",
    image: require("../../assets/on_bd3.png"),
  },
];

const OnBoardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    if (currentIndex < OnBoardingItem.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
    if(currentIndex == OnBoardingItem.length - 1){
      // Xử lý chuyển màn hình ở đây ko quay lại màn cũ 
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTabNavigation" }],
      });
      
    }
  };
  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };
  const flatListRef = React.useRef(null);
  const scrollToIndex = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };
  const getOnBoardingTitle = (index) => {
    if (index == 0) {
      return "Bắt đầu";
    }
    if (index == 1) {
      return "Tiếp theo";
    }
    return "Khám phá ngay";
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={OnBoardingItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <ItemOnBoarding
            subtitle={item.subtitle}
            image={item.image}
            title={item.title}
          />
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
      <View style={styles.bottomContainer}>
        <Paginator data={OnBoardingItem} currentIndex={currentIndex} />
        <AppButton onPress={handleNext} title={getOnBoardingTitle(currentIndex)} />
      </View>
    </View>
  );
};

const ItemOnBoarding = ({ image, title, subtitle }) => {
  return (
    <View style={styles.itemContainer}>
      <Image resizeMode="contain" style={styles.image} source={image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const Paginator = ({ data, currentIndex }) => {
  return (
    <View style={styles.paginatorContainer}>
      {data.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              width: currentIndex === index ? 40 : 20,
              backgroundColor: currentIndex === index ? "#ffffff" : "#ffb318",
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6CCFFF",
    justifyContent: "flex-end",
  },
  itemContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  bottomContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  paginatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});

export default OnBoardingScreen;
