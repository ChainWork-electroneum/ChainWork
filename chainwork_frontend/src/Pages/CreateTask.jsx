import React, { useState, useMemo } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { usePayment } from "../Context/PaymentContext";
import { ethers } from "ethers";

export function CreateTask() {
  const [submitting, setSubmitting] = useState(false);
  const { account, connectWallet, createTaskWithPayment } = usePayment();

  // Set closest deadline that can be entered as tomorrow
  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  }, []);

  // Submits form to create a task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check wallet connection
      if (!account) {
        await connectWallet();
        return; // Exit function after connecting wallet
      }

      setSubmitting(true);

      // Get form values
      const description = e.target.elements.description.value;
      const amount = e.target.elements.amount.value;
      const deadline = e.target.elements.deadline.value;

      console.log(description, amount, deadline);

      // Convert ETN to Wei (smallest unit)
      const weiAmount = ethers.parseEther(amount);

      // Show confirmation window with ETN amount
      const confirmed = window.confirm(
        `This task will cost ${amount} ETN. Continue?`
      );
      if (confirmed) {
        // Call backend to create the task
        const taskDetails = {
          description,
          deadline,
          bounty: weiAmount.toString(),
        };

        const txHash = await createTaskWithPayment(taskDetails, weiAmount);
        console.log("Transaction hash:", txHash);

        alert("Task created successfully!");
        e.target.reset();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-primary dark:text-white">
      <div className="max-w-2xl mx-auto dark:bg-primary dark:text-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create a Task</h1>
          <div className="mt-4 relative">
            <div className="h-2 dark:bg-secondary bg-gray-500 rounded">
              <div className="h-full w-1/4 bg-blue-600 rounded" />
            </div>
            <div className="mt-2 text-sm text-white">Step 1 of 4</div>
          </div>
        </div>

        <Card>
          <Card.Content>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium dark:text-stone-50 text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  name="description"
                  className="w-full dark:text-white px-4 py-2 border rounded-lg dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                  placeholder="Describe the task in detail..."
                  required
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 dark:text-stone-50">Bounty (in ETN)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium dark:text-stone-50 text-gray-700 mb-1">
                      Amount (ETN)*
                    </label>
                    <input
                      type="number"
                      name="amount"
                      min={1}
                      step="0.000001"
                      className="w-full dark:text-white dark:bg-secondary px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter amount in ETN"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block dark:text-stone-50 text-sm font-medium text-gray-700 mb-1">
                  Deadline*
                </label>
                <input
                  type="date"
                  name="deadline"
                  className="w-full dark:text-white dark:bg-secondary px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={minDate}
                  required
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="bg-secondary dark:bg-secondary rounded-xl border border-white dark:border-white">Cancel</Button>
                <Button type="submit">
                  {!account
                    ? "LinkMetaMask"
                    : submitting
                    ? "Creating Task..."
                    : "Create Task"}
                </Button>
              </div>
            </form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
