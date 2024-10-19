import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";


export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return isConnected;
};

// kiểm tra 1 lần 
export const checkNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};
