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
          
        </div>
      </div>
    </header>
  );
};

export default Header;