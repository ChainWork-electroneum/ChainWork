import React from "react";
import { Card } from "../components/UI/Card"; 
import { Button } from "../components/UI/Button"; 
import { useNavigate } from "react-router-dom";
import { usePayment } from "../Context/PaymentContext";

export function Home() {
  const navigate = useNavigate();
  const { 
    account, 
    loading, 
    error, 
    connectWallet, 
    disconnectWallet,
    isEtnNetwork,
    balance 
  } = usePayment();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (err) {
      console.error('Wallet connection failed:', err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
    } catch (err) {
      console.error('Wallet disconnection failed:', err);
    }
  };

  const WalletButton = () => {
    if (loading) {
      return (
        <Button disabled className="bg-blue-600">
          Connecting...
        </Button>
      );
    }

    if (account) {
      return (
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <Button 
              className="bg-green-600 flex items-center space-x-2"
              disabled
            >
              <span>{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
              {balance !== null && (
                <span className="border-l border-green-400 pl-2 ml-2">
                  {balance} ETN
                </span>
              )}
            </Button>
            <Button 
              onClick={handleDisconnect}
              variant="secondary"
              className="text-sm"
            >
              Disconnect
            </Button>
          </div>
          {!isEtnNetwork && (
            <span className="text-amber-500 text-sm">
              Please switch to Electroneum network
            </span>
          )}
        </div>
      );
    }

    return (
      <Button 
        onClick={handleConnect}
        className="bg-blue-600"
      >
        Connect Wallet
      </Button>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-blue-600 dark:text-blue-400">ChainWork</span>
        </h1>
        
       
        <div className="mb-8">
          <WalletButton />
          {error && (
            <p className="mt-2 text-red-500 text-sm">
              {error}
            </p>
          )}
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          Connect with skilled professionals or find exciting freelance tasks.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Create a Task
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Post a new task and find talented people to help you.
            </p>
            <Button 
              onClick={() => navigate("/create-task")} 
              className="w-full bg-blue-600"
              disabled={!account || !isEtnNetwork}
            >
              Create Task
            </Button>
          </Card>

          <Card className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Browse Tasks
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Find tasks that match your skills and start earning.
            </p>
            <Button 
              onClick={() => navigate("/tasks")} 
              className="w-full" 
              variant="secondary"
            >
              View Tasks
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}