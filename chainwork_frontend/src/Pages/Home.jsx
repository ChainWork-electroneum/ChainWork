import React from "react";
import { Card } from "../components/UI/Card";
import { Button } from "../components/UI/Button";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-blue-600 dark:text-blue-400">ChainWork</span>
        </h1>
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

      {/* Dotted Background at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 bg-[radial-gradient(circle,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:10px_10px] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] dark:bg-[size:10px_10px]"></div>
    </div>
  );
}
