import React, { useEffect, useState, createContext, useContext } from 'react';
import { io } from 'socket.io-client';
import { useNotification } from './NotificationContext';
import environmentConfig from '../config/config';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const { showNotification } = useNotification();
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const connectedWallet = localStorage.getItem('walletAddress');
    const newSocket = io(environmentConfig.apiUrl, {
      transports: ['websocket'],
      secure: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      if (connectedWallet) {
        newSocket.emit('registerWallet', connectedWallet);
      }
    });

    newSocket.on('transactionResult', result => {
      setIsLoading(true);
      setTimeout(() => {
        if (result.status === 'success') {
          if (result.type === 'Mint & VC Issue') {
            showNotification('success', '에셋 발행 성공', 'NFT 발행이 성공적으로 완료되었습니다.');
          } else {
            showNotification('success', '에셋 구매 성공', 'NFT 이전이 성공적으로 완료되었습니다.');
          }
        } else if (result.status === 'failed') {
          if (result.type === 'Mint') {
            showNotification('error', '에셋 발행 실패', 'NFT 발행이 실패했습니다.');
          } else {
            showNotification('error', '에셋 구매 실패', 'NFT 이전이 실패했습니다.');
          }
        }
        setIsLoading(false);
      }, 2000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [showNotification]);

  return (
    <SocketContext.Provider value={{ socket, isLoading }}>
      {children}
    </SocketContext.Provider>
  );
};


