import { Moon, Sun, Search, X,LogOut,User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = ({ searchQuery, setSearchQuery}) => {
  const { isDark, toggleTheme } = useTheme();
  const {user,logout} =useAuth();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <img src="/dev.png" alt="DevLogo" className="h-8 w-8" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              DevDirectory
            </h1>
          </div>

     
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
         
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {showMobileSearch ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Search className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{user?.name}</span>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? (
                <Moon className="h-6 w-6 text-gray-300" />
              ) : (
                <Sun className="h-6 w-6 text-gray-600" />
              )}
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Logout"
            >
              <LogOut className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>

          </div>
        </div>


        {showMobileSearch && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search developers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* <div className="md:hidden px-4 py-3 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={onAddClick}
          className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Developer
        </button>
      </div> */}
    </nav>
  );
};

export default Navbar;