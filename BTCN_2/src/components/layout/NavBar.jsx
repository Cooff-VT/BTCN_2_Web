import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search } from "lucide-react";

const NavBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) navigate(`/search?title=${keyword}`);
  };

  return (
    <nav className="bg-blue-100 dark:bg-gray-800 py-3 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        
        <Link 
          to="/" 
          className="p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300
            bg-gray-600 text-white          
            dark:bg-white dark:text-black   
          "
        >
          <Home className="w-5 h-5" />
        </Link>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-4 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
              bg-white text-gray-900 border-blue-200
              dark:bg-gray-700 dark:text-white dark:border-gray-600
            "
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          
          <button 
            onClick={handleSearch} 
            className="px-4 py-1.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border-2
              /* Light Mode: Nền trong suốt, Viền xanh, Chữ xanh (Ăn theo Nav xanh) */
              bg-transparent border-blue-400 text-blue-700 hover:bg-blue-600 hover:text-white
              
              /* Dark Mode: Nền trong suốt, Viền trắng, Chữ trắng (Ăn theo Nav tối) */
              dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black
            "
          >
            <Search className="w-4 h-4" /> 
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;