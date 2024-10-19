import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function authHeader() {
  return AsyncStorage.getItem('userToken')
    .then(userData => {
      if (userData) {
        return { token: 'Bearer ' + userData };
      } else {
        return {};
      }
    })
    .catch(error => {
      console.error("Error retrieving user data from AsyncStorage:", error);
      return {};
    });
}
