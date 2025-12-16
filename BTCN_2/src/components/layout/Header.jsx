import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogIn, LogOut, User } from "lucide-react";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-pink-100 dark:bg-gray-800 border-b dark:border-gray-700 transition-colors">
      <div className="max-w-content mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="text-gray-600 dark:text-gray-300 font-mono font-bold">
          23120096
        </div>

        <h1 className="text-2xl font-bold text-red-800 dark:text-red-500 uppercase absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          Movies Info
        </h1>

        <div className="flex items-center gap-6">
          
          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            {isDarkMode ? (
                <Moon className="w-5 h-5 text-red-500" />
            ) : (
                <Sun className="w-5 h-5 text-yellow-700" />
            )}
          </div>

          <div className="pl-4 border-l border-gray-300 dark:border-gray-600">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-600 transition">
                     <User size={18} />
                  </div>
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-200 hidden sm:block group-hover:text-blue-600 dark:group-hover:text-red-400 transition">
                    {user?.username}
                  </span>
                </Link>
                
                <button 
                  onClick={handleLogout} 
                  title="Logout"
                  className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-sm font-medium text-sm"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;