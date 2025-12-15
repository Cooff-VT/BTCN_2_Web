import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search, Filter } from "lucide-react";

const NavBar = () => {
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("title"); 
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      if (searchType === "title") {
        navigate(`/search?title=${keyword}`);
      } else {
        navigate(`/search?person=${keyword}`);
      }
    }
  };

  return (
    <nav className="bg-blue-100 dark:bg-gray-800 py-3 transition-colors duration-300 shadow-md sticky top-0 z-50">
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
          <div className="relative group">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="h-full min-w-[100px] pl-4 pr-9 py-1.5 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 font-medium
                bg-white text-gray-700 border-blue-200
                dark:bg-gray-700 dark:text-white dark:border-gray-600
                text-center
              "
            >
              <option value="title">Movie title</option>
              <option value="person">Person name</option>
            </select>
            
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
               <Filter size={14} />
            </div>
          </div>

          <input
            type="text"
            placeholder={searchType === "title" ? "Enter the movie title..." : "Enter the person name..."}
            className="w-40 sm:w-64 px-4 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
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
              bg-transparent border-blue-400 text-blue-700 hover:bg-blue-600 hover:text-white
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