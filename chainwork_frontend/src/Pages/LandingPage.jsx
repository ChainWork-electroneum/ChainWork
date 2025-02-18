import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900 transition-colors duration-300 overflow-hidden"
    >
      {/* Dotted Background with Fade Effect */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(circle,rgba(0,0,0,0.2)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:10px_10px]"
        style={{ opacity: 1 - scrollYProgress }}
      />

      {/* Hero Content */}
      <div className="relative flex flex-col items-center text-center px-6">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Decentralized Data Labeling, Powered by Blockchain
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Label data, earn rewards, and contribute to open AI datasets.
        </p>

        {/* Get Started Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 rounded-2xl text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-600 transition-all"
        >
          Get Started
        </motion.button>

        {/* Floating Cards */}
        <div className="relative mt-10">
          <motion.div
            initial={{ rotate: -6, y: 20, opacity: 0 }}
            animate={{ rotate: -6, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute -top-5 left-5 bg-white dark:bg-gray-800 dark:text-white shadow-xl p-4 rounded-xl w-72"
          >
            <h3 className="font-semibold">Earn Crypto Rewards</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Contribute to labeling and get paid in tokens.
            </p>
          </motion.div>

          <motion.div
            initial={{ rotate: 3, y: -20, opacity: 0 }}
            animate={{ rotate: 3, y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-5 right-5 bg-white dark:bg-gray-800 dark:text-white shadow-lg p-4 rounded-xl w-72"
          >
            <h3 className="font-semibold">Buy High-Quality Datasets</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Access verified labeled datasets for AI/ML projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bg-white dark:bg-gray-800 dark:text-white shadow-2xl p-6 rounded-xl w-80 z-10"
          >
            <h3 className="font-semibold text-lg">Join the AI Revolution</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Start labeling data and contribute to decentralized AI.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
