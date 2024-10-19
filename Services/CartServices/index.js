import Config from "../../Api/Config";
import axios from "axios";
const CartServices = {
    getInfoCart: async (headersToken) => {
        try {
            const response = await axios.get(
                `${Config.API_BASE_URL}/carts/total-cart`,
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
    updateProductInCart: async (headersToken, cart_id, product_detail_id, quantity) => {
        try {
            const response = await axios.put(
                `${Config.API_BASE_URL}/carts/update`,
                {
                    cartId: cart_id,
                    productDetailId: product_detail_id,
                    quantity: quantity,

                },
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
    addtocart: async (headersToken, cart_id, product_detail_id, quantity) => {
        try {
            const response = await axios.post(
                `${Config.API_BASE_URL}/carts/add-product-cart`,
                {
                    cartId: cart_id,
                    productDetailId: product_detail_id,
                    quantity: quantity,

                },
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
    deleteProductInCart: async (headersToken, itemId) => {
        console.log("jjhjijijijij", itemId);

        try {
            const response = await axios.delete(`${Config.API_BASE_URL}/carts/delete-cart-user/${itemId}`, {
                headers: headersToken,
            });
            if (response.data) {
                return response.data;
            }
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error.message);
            throw error;
        }
    }


}

export default CartServices;