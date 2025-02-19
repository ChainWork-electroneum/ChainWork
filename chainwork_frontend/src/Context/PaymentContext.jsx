import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { connectWallet, createEscrowPayment, setupETNNetwork } from '../utils/web3Utils';
import { ethers } from 'ethers';

const PaymentContext = createContext();

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};

export const PaymentProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEtnNetwork, setIsEtnNetwork] = useState(false);
  const [balance, setBalance] = useState(null);

  // Check if MetaMask is installed
  const checkMetaMask = useCallback(() => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
    return true;
  }, []);

  // Fetch balance for connected account
  const fetchBalance = useCallback(async () => {
    if (!account || !window.ethereum) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      const formattedBalance = ethers.formatEther(balance);
      setBalance(parseFloat(formattedBalance).toFixed(4));
    } catch (err) {
      console.error('Error fetching balance:', err);
      setBalance(null);
    }
  }, [account]);

  // Check network status
  const checkNetwork = useCallback(async () => {
    try {
      if (!checkMetaMask()) return;
      
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const isEtn = Number(chainId) === 5201420;
      setIsEtnNetwork(isEtn);
      return isEtn;
    } catch (err) {
      console.error('Error checking network:', err);
      setError('Failed to check network status');
      return false;
    }
  }, [checkMetaMask]);

  // Handle wallet connection
  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);

      checkMetaMask();
      
      // Ensure connection to ETN network
      await setupETNNetwork();
      
      const address = await connectWallet();
      setAccount(address);
      
      await checkNetwork();
      await fetchBalance();

      // Store wallet connection state in local storage
      localStorage.setItem('walletConnected', 'true');

      return address;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      setLoading(true);
      
      // Clear all wallet-related state
      setAccount(null);
      setBalance(null);
      setIsEtnNetwork(false);
      setError(null);
      
      // Remove wallet connection status from local storage
      localStorage.removeItem('walletConnected');
      
      // Remove event listeners if needed
      if (window.ethereum && window.ethereum.removeAllListeners) {
        window.ethereum.removeAllListeners();
      }
      
    } catch (err) {
      setError('Failed to disconnect wallet');
      console.error('Disconnect error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create task with payment
  const createTaskWithPayment = async (taskDetails, bountyAmount) => {
    try {
      if (!account) {
        throw new Error('Please connect your wallet first');
      }

      if (!isEtnNetwork) {
        throw new Error('Please switch to the Electroneum network');
      }

      const txHash = await createEscrowPayment(account, taskDetails, bountyAmount);
      await fetchBalance(); // Update balance after transaction
      return txHash;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Effect to check network and balance when account changes
  useEffect(() => {
    if (account) {
      checkNetwork();
      fetchBalance();
    } else {
      setBalance(null);
    }
  }, [account, checkNetwork, fetchBalance]);

  // Auto-connect wallet if previously connected
  useEffect(() => {
    const autoConnect = async () => {
      if (localStorage.getItem('walletConnected') === 'true') {
        try {
          await handleConnect();
        } catch (err) {
          console.error('Auto-connect failed:', err);
        }
      }
    };
    autoConnect();
  }, []);

  // Listen for network and account changes
  useEffect(() => {
    if (!window.ethereum) return;

    const handleChainChanged = async () => {
      await checkNetwork();
      await fetchBalance();
      window.location.reload();
    };

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== account) {
        setAccount(accounts[0]);
      }
    };

    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [account, checkNetwork, fetchBalance]);

  // Context values
  const value = {
    account,
    loading,
    error,
    isEtnNetwork,
    balance,
    connectWallet: handleConnect,
    disconnectWallet,  
    createTaskWithPayment,
    checkNetwork,
    fetchBalance,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
