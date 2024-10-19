import Config from "../../Api/Config";
import axios from "axios";
const authLogin = {
  // Phương thức đăng nhập người dùng
  signUpUser: async (user) => {
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/auth/register`,
        user
      );
      const successStatus = response.data;

      if (successStatus && successStatus.accesstoken) {
        console.log("Token saved:", successStatus.accesstoken);
        return response.data;
      }
      console.log(successStatus);
    } catch (error) {
      const errorStatus = error.response?.status;
      const errorMessage = error.response?.data?.message;
      console.error(errorMessage);

      if (errorStatus) {
        return errorMessage;
      }
    }
  },
  
  loginUser: async (user) => {
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/auth/login`,
        user
      );
      const successStatus = response.data;

      if (successStatus && successStatus.accesstoken) {
        console.log("Token saved:", successStatus.accesstoken);
        return response.data;
      }
      console.log(successStatus);
    } catch (error) {
      const errorStatus = error.response?.status;
      const errorMessage = error.response?.data?.message;
      console.error(errorMessage);

      if (errorStatus) {
        return errorMessage;
      }
    }
  },
  
};

export default authLogin;
