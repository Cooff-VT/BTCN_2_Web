import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search } from "lucide-react";

const NavBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) navigate(`/search?query=${keyword}`);
  };

  return (
    <nav className="bg-blue-100 dark:bg-gray-700 py-3 transition-colors">
      <div className="max-w-content mx-auto px-4 flex justify-between items-center">
        
        <Link to="/" className="p-2 bg-white dark:bg-gray-600 rounded-full shadow hover:scale-105 transition">
          <Home className="w-5 h-5 text-gray-700 dark:text-white" />
        </Link>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded flex items-center gap-2 transition"
          >
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;