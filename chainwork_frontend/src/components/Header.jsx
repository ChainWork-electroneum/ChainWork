import React from "react";
import { Menu, X, Sun, Moon } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext"; 

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme(); 

  return (
    <header className="border-b bg-white dark:bg-primary dark:border-gray-700 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
              ChainWork
            </Link>
          </div>

          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Services
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </Link>
            <Link to="/profile" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Profile
            </Link>
          </nav>

          
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="md:hidden p-2 rounded-md text-gray-900 dark:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

     
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md transition-colors">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link to="/" className="block py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="block py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link to="/services" className="block py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Services
            </Link>
            <Link to="/contact" className="block py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Contact
            </Link>
            <Link to="/profile" className="block py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}