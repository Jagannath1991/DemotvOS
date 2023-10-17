import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';

const NetworkContext = createContext();

export const useNetwork = () => {
  return useContext(NetworkContext);
};

export const NetworkProvider = ({children}) => {
  const [isConnected, setIsConnected] = useState(true);

  const checkConnectivity = async () => {
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
  };

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    checkConnectivity();
  }, []);

  return (
    <NetworkContext.Provider value={{isConnected, checkConnectivity}}>
      {children}
    </NetworkContext.Provider>
  );
};
