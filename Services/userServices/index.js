import Config from "../../Api/Config";
import axios from "axios";
const UserServices = {
    getUserInfo: async (headersToken) => {
        try {
            const response = await axios.get(
                `${Config.API_BASE_URL}/users/info-user/`,
                {
                    headers: headersToken,
                }
            );
            if (response.data) {
                return response.data;
            }
        } catch (error) {
         console.error(error);

        }
    },

}

export default UserServices;
