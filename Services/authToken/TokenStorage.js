import AsyncStorage from '@react-native-async-storage/async-storage';
const TokenStorage ={
    saveToken: async (token) => {
        try {
            await AsyncStorage.setItem('userToken', token);
            console.log('Token saved');
        } catch (e) {
            console.log('Save token error', e);
        }
    },
    removeToken: async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            console.log('Token removed');
        } catch (e) {
            console.log('Remove token error', e);
        }
    },
    getToken: async () => {
        try {
            return await AsyncStorage.getItem('userToken');
            
        } catch (e) {
            console.log('Get token error', e);
            return null;
        }
    }
 
}
export default TokenStorage;