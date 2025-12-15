import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="bg-pink-100 dark:bg-gray-800 border-b dark:border-gray-700 transition-colors">
      <div className="max-w-content mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="text-gray-600 dark:text-gray-300 font-mono font-bold">
          MSSV: 23120096
        </div>

        <h1 className="text-2xl font-bold text-red-800 dark:text-red-500 uppercase">
          Movies Info
        </h1>

        <div className="flex items-center gap-4">
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
      </div>
    </header>
  );
};

export default Header;