import React, { useState, useEffect, useRef ,useContext } from "react";
import { Pressable, SafeAreaView } from "react-native";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { PulseIndicator } from "react-native-indicators";
const { DateTime } = require("luxon");

const width = Dimensions.get("screen").width;

export default function CouponComponentOrder(props) {
  const [showIndicator, setShowIndicator] = useState(false);
  const { dataVouchers, handlePress, navigation, checkvoucher } = props;
  const [icon, seticon] = useState(null);
  const [value, setvalue] = useState();
  const progress = useRef(new Animated.Value(0)).current;
  const [progressValue, setProgressValue] = useState(
    dataVouchers.usage_remaining
  );

  const [usage_quantity] = useState(dataVouchers.usage_quantity);
  useEffect(() => {
    const progressListener = progress.addListener(({ value }) => {
      setProgressValue(value);
    });

    return () => {
      progress.removeListener(progressListener);
    };
  }, [progress]);

  if (progressValue < usage_quantity) {
    Animated.timing(progress, {
      toValue: dataVouchers.usage_quantity - dataVouchers.usage_remaining,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }
  const loadingvoucher = () => {
    setShowIndicator(true);
    console.log("loadingvoucher");
    handlePress ? handlePress(dataVouchers) : null;

    const intervalId = setTimeout(() => {
      setShowIndicator(false);
    }, 1500);

    return () => clearTimeout(intervalId);
  };
  const UsePaymentVoucher = () => {
    loadingvoucher();
  };

  const width = progress.interpolate({
    inputRange: [0, usage_quantity],
    outputRange: ["0%", "100%"],
  });

  const progressPercentage = Math.max(
    0,
    Math.min(100, (progressValue / usage_quantity) * 100)
  );

  useEffect(() => {
    const intervalId = setTimeout(() => {}, 2000);
    checkVoucherStatus();
    return () => clearTimeout(intervalId);
  }, []);
  const checkVoucherStatus = () => {
    const startDateTimeInSeconds = parseFloat(dataVouchers.start_time);
    const endDateTimeInSeconds = parseFloat(dataVouchers.end_time);

    const startTime = DateTime.fromSeconds(startDateTimeInSeconds, {
      zone: "Asia/Ho_Chi_Minh",
    });
    const endTime = DateTime.fromSeconds(endDateTimeInSeconds, {
      zone: "Asia/Ho_Chi_Minh",
    });
    const timenow = DateTime.now({ zone: "Asia/Ho_Chi_Minh" });

    console.log("timenow", timenow);
    console.log("startTime", startTime);
    console.log("endTime", endTime);

    const diffBetweenStartAndNow = startTime.diff(timenow, "seconds").seconds;
    const diffBetweenNowAndStart = timenow.diff(startTime, "seconds").seconds;
    const diffBetweenEndAndStart = endTime.diff(startTime, "seconds").seconds;
    const diffBetweenEndAndNow = endTime.diff(timenow, "seconds").seconds;
    // console.log("diffBetweenStartAndNow", diffBetweenStartAndNow / 3600);
    // console.log("diffBetweenNowAndStart", diffBetweenNowAndStart / 3600);
    // console.log("diffBetweenEndAndStart", diffBetweenEndAndStart / 3600);
    // console.log("diffBetweenEndAndNow", diffBetweenEndAndNow / 3600);
    if (
      diffBetweenStartAndNow / 3600 >= 24 &&
      diffBetweenStartAndNow / 3600 <= 48
    ) {
      setvalue("Có hiệu lực sau 1 ngày");
      console.log("1 ngay");
      return;
    }
    if (diffBetweenStartAndNow / 3600 >= 48) {
      setvalue(`Có hiệu lực từ ngày ${startTime.toFormat("dd/MM/yyyy")}`);
      return;
    }
    if (
      diffBetweenStartAndNow / 3600 < 24 &&
      diffBetweenStartAndNow / 3600 > 0
    ) {
      setvalue(
        `Có hiệu lực sau ${Math.floor(diffBetweenStartAndNow / 3600)} giờ`
      );
      console.log("gio");
      return;
    }
    if (
      diffBetweenStartAndNow / 3600 < 1 &&
      diffBetweenStartAndNow / 3600 > 0
    ) {
      setvalue(
        `Có hiệu lực sau ${Math.floor(diffBetweenStartAndNow / 60)} phút`
      );
      console.log("phut");
      return;
    }
    if (
      diffBetweenStartAndNow / 3600 < 1 &&
      diffBetweenStartAndNow / 3600 > 0
    ) {
      setvalue(`Có hiệu lực sau ${Math.floor(diffBetweenStartAndNow)} giây`);
      console.log("giay");
      return;
    }
    if (
      diffBetweenNowAndStart / 3600 >= 0 &&
      diffBetweenEndAndNow / 3600 >= 0
    ) {
      seticon("https://cdn-icons-png.flaticon.com/512/109/109613.png");
      setvalue(`HSD ${endTime.toFormat("dd/MM/yyyy")}`);
      console.log("bat dau");
      return;
    }
    if (diffBetweenEndAndNow / 3600 < 24 && diffBetweenEndAndNow / 3600 > 0) {
      seticon("https://cdn-icons-png.flaticon.com/512/109/109613.png");
      setvalue(`Hết hạn sau ${parseInt(diffBetweenEndAndNow / 3600)} giờ`);
      console.log("Hạn sau giờ");
      return;
    }
    if (diffBetweenEndAndNow / 60 < 60 && diffBetweenEndAndNow / 86400 > 0) {
      seticon("https://cdn-icons-png.flaticon.com/512/109/109613.png");
      setvalue(`Hết hạn sau ${parseInt(diffBetweenEndAndNow / 60)} phút`);
      console.log("Hạn sau phút");
      return;
    }
    if (diffBetweenEndAndNow < 60 && diffBetweenEndAndNow > 0) {
      seticon("https://cdn-icons-png.flaticon.com/512/109/109613.png");
      setvalue(`Hết hạn sau ${parseInt(diffBetweenEndAndNow)} giây`);
      console.log("Hạn sau giây");
      return;
    }

    if (diffBetweenEndAndNow / 3600 < 0) {
      seticon("https://cdn-icons-png.flaticon.com/512/109/109613.png");
      setvalue(`Đã hết hạn`);
      console.log("het han");
      return;
    }
  };
  const fun_handlePress = () => {
    handlePress ? handlePress(dataVouchers) : null;
  };

  let imgvoucher, widthvoucher, heightvoucher, voucher_bg, clock_icon;

  if (dataVouchers.reward_type == "2" || dataVouchers.reward_type == "1") {
    imgvoucher =
      "https://images.vexels.com/media/users/3/200093/isolated/preview/596f0d8cb733b17268752d044976f102-shopping-bag-icon.png";
    widthvoucher = "35%";
    heightvoucher = "35%";
    voucher_bg = "https://iili.io/JqhCJjt.png";
  } else if (dataVouchers.reward_type == "3") {
    imgvoucher = "https://iili.io/JqukDpR.png";
    widthvoucher = "40%";
    heightvoucher = "40%";
    voucher_bg = "https://iili.io/JqhCHuI.png";
  }
  let discount_amount;
  if (dataVouchers.reward_type == "1") {
    discount_amount = "đ" + dataVouchers.discount_amount + "k";
    dataVouchers.max_price != 0
      ? (discount_amount = "Giảm tối đa " + dataVouchers.max_price + "k")
      : (discount_amount = "Giảm " + discount_amount);
  } else if (dataVouchers.reward_type == "2") {
    discount_amount = dataVouchers.discount_amount + "%";
    dataVouchers.voucher_type == "1"
      ? (discount_amount = "Giảm " + discount_amount)
      : null;
  }

  return (
    <SafeAreaView onPress={fun_handlePress}>
      {showIndicator && (
        <View style={styles.content}>
          <PulseIndicator color="white" size={100} />
        </View>
      )}
      {!showIndicator && (
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: voucher_bg }}
            style={styles.wallet_page}
            resizeMode="contain"
          >
            <View style={styles.wallet_page_left}>
              <Image
                source={{ uri: imgvoucher }}
                resizeMode="cover"
                style={[
                  styles.imgvoucher_image_page_left,
                  { width: widthvoucher, height: heightvoucher },
                ]}
              />
              <Text style={styles.textvoucher_txt_page_left}>UIMY</Text>
            </View>
            <View style={styles.wallet_page_right}>
              <Text style={styles.namevoucher_txt_page_right}>
                {dataVouchers.voucher_name}
              </Text>
              <Text style={styles.code_txt_page_right}>
                {dataVouchers.voucher_code}
              </Text>
              <View style={styles.value_txt_page_right}>
                {icon ? (
                  <Image source={{ uri: icon }} style={styles.icon} />
                ) : null}

                <Text style={styles.value}>{value}</Text>
              </View>
              <View style={styles.progress}>
                <Animated.View style={[styles.progressBar, { width }]}>
                  <Text
                    style={styles.progressTextInsideBar}
                    ellipsizeMode="head"
                    numberOfLines={1}
                  >
                    Đã dùng
                    <Text> {Math.round(progressPercentage)}%</Text>
                    {/* <Text> {Math.round(progressPercentage)}% ({progressValue.toFixed(2)})</Text> */}
                  </Text>
                </Animated.View>
              </View>
            </View>
            <Pressable
              style={styles.button_page_right}
              onPress={UsePaymentVoucher}
            >
              <LinearGradient
                colors={["rgb(255, 147, 63)", "rgb(249, 55, 130)"]} // Màu với độ trong suốt
                start={{ x: 0.2, y: 0.5 }} // Vị trí bắt đầu (top left)
                end={{ x: 0.5, y: 1 }} // Vị trí kết thúc (bottom right)
                angle={130} // Góc màu chéo (tương đương với 130 độ)
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                }}
              >
                {checkvoucher ? (
                  <Text
                    style={{ color: "black", fontSize: 10, fontWeight: "bold" }}
                  >
                    Đang dùng
                  </Text>
                ) : (
                  <Text
                    style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                  >
                    Dùng ngay
                  </Text>
                )}
              </LinearGradient>
            </Pressable>
          </ImageBackground>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    width: width,
  },
  wallet_page: {
    height: 150,
    marginHorizontal: 8,
    position: "relative",
    justifyContent: "center",
    flexDirection: "row",
  },
  wallet_page_left: {
    width: width / 3.01,
    height: 140,
    position: "absolute",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
  },
  wallet_page_right: {
    width: width / 1.59,
    height: 140,
    position: "relative",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textvoucher_txt_page_left: {
    color: "white",
    fontSize: 13,
    marginVertical: 10,
  },
  code_txt_page_right: {
    color: "black",
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 10,
    position: "absolute",
    top: 40,
    left: 72,
  },
  value_txt_page_right: {
    position: "absolute",
    flexDirection: "row",
    top: 90,
    marginVertical: 10,
    left: 72,
    marginHorizontal: 10,
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: "red",
    position: "absolute",
    left: -8,
  },
  value: {
    color: "red",
    fontSize: 11,
    position: "absolute",
    left: 13,
  },
  namevoucher_txt_page_right: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10,
    position: "absolute",
    top: 20,
    left: 72,
  },
  button_page_right: {
    width: 100,
    height: 30,
    position: "absolute",
    right: 10,
    bottom: 50,
    justifyContent: "center",
  },
  imgvoucher_image_page_left: {
    marginTop: 20,
  },
  progressTextInsideBar: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#fff",
    fontSize: 10,
    overflow: "hidden",
  },
  progressBar: {
    width: 10,
    backgroundColor: "rgba(53, 196, 236, 0.8)",
    borderRadius: 10,
    height: 16,
  },
  progress: {
    width: "80%",

    position: "absolute",
    top: "85%",
    left: 80,
    borderRadius: 10,
    backgroundColor: "rgba(208, 226, 237, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
});
