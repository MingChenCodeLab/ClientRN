import React, { useContext } from "react";
import { View } from "react-native";
import { Badge } from "react-native-elements";
import { AuthContext } from "../../Services/AuthContext";

const CartBadge = () => {
  const { cartState } = useContext(AuthContext);
  const cartCount = cartState.infoCart?.total_cart_items || 0;

  return (
    cartCount > 0 && (
      <View
        style={{
          position: "absolute",
          right: -8,
          top: -2,
        }}
      >
        <Badge
          value={cartCount > 99 ? "99+" : cartCount}
          status="error"
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
          textStyle={{ color: "white", fontWeight: "bold" }}
        />
      </View>
    )
  );
};

export default CartBadge;
