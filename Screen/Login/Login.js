import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Checkbox from "expo-checkbox";
import { AuthContext } from "../../Services/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icons
import eyeIcon from "../../images/eys.jpg";
import logo from "../../assets/images/logo1.png";
import BackButton from "../../components/Header/BackButton";
import CustomStatusBar from '../../components/StatusBar/CustomStatusBar';
import { LinearGradient } from 'expo-linear-gradient';
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Tên người dùng hoặc email là bắt buộc")
    .test(
      "isValid",
      "Nhập một email hoặc tên người dùng hợp lệ",
      (value) =>
        /^[a-zA-Z0-9_-]{3,16}$/.test(value) || // Kiểm tra tên người dùng
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) // Kiểm tra email
    ),
  password: yup.string().required("Mật khẩu là bắt buộc"),
});

export default function Login({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!agree) {
      ToastAndroid.show("Bạn phải đồng ý với điều khoản", ToastAndroid.SHORT);
      return;
    }
  
    try {
      const result = await signIn(data);
      console.log("result: " + JSON.stringify(result));
      // Kiểm tra trạng thái phản hồi hoặc token từ kết quả đăng nhập
      if (result && result.success && result.accesstoken) {
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show("Đã xảy ra lỗi", ToastAndroid.SHORT);
    }
  };
  

  const BackHandler = () => {
    navigation.navigate("Home");
    return true;
  };

  return (
    <View style={styles.container}>
      <CustomStatusBar
        animated={true}
        backgroundColor="transparent"
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
        translucent={true}
        paddingTop={true}
      />
      <BackButton onPress={BackHandler} />
      <Image source={logo} style={styles.logo} resizeMode="cover" />
      <View style={styles.form}>
        <View style={styles.inputWrapper}>
          <Icon name="user" size={20} style={styles.icon} />
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Tên người dùng hoặc email"
                  autoCapitalize="none"
                />
                {errors.username && (
                  <Text style={styles.errorText}>{errors.username.message}</Text>
                )}
              </>
            )}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={20} style={styles.icon} />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordWrapper}>
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Mật khẩu"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password.message}</Text>
                )}
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Image
                    source={eyeIcon}
                    style={[styles.eyeIcon, showPassword && styles.eyeIconVisible]}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Checkbox
          style={styles.checkbox}
          value={agree}
          onValueChange={() => setAgree(!agree)}
          color={agree ? "#4630EB" : undefined}
        />
        <Text style={styles.agreeText}>Đồng ý với điều khoản</Text>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <View style={styles.separator}>
        <View style={styles.lineWrapper}>
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.lineGradient}
          />
        </View>
        <Text style={styles.orText}>Hoặc</Text>
        <View style={styles.lineWrapper}>
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.lineGradient}
          />
        </View>
      </View>
      <View style={styles.register}>
        <Text style={styles.registerText}>Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 130,
    height: 130,
    marginTop: 20,
  },
  form: {
    marginTop: 5,
    width: 300,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: "#F7F7F9",
  },
  icon: {
    marginRight: 5,
    color: "gray",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    top: 50,
    position: "absolute",
    left: 0,
  },
  passwordWrapper: {
    flex: 1,
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  eyeIcon: {
    width: 22,
    height: 22,
  },
  eyeIconVisible: {
    opacity: 0.3,
  },
  footer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  agreeText: {
    marginTop: 2,
  },
  forgotPassword: {
    marginLeft: 54,
    marginTop: 4,
    fontSize: 10,
    color: "red",
    textDecorationLine: "underline",
  },
  loginButton: {
    marginTop: 25,
    backgroundColor: "#0D6EFD",
    borderRadius: 15,
    width: 300,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 15,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginVertical: 20,
  },
  lineWrapper: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 20,
  },
  lineGradient: {
    height: 1,
    width: '100%',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  register: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#F7F7F9',
    paddingVertical: 10,
    justifyContent: 'center',
    
  },
  registerText: {
    color: 'gray',
  },
  registerLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
