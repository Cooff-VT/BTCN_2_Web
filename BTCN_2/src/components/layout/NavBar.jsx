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
          {/* 1. THÊM DROPDOWN CHỌN LOẠI TÌM KIẾM */}
          <div className="relative group">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="h-full px-3 py-1.5 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 font-medium
                bg-white text-gray-700 border-blue-200
                dark:bg-gray-700 dark:text-white dark:border-gray-600
              "
            >
              <option value="title">Phim</option>
              <option value="person">Người</option>
            </select>
            {/* Icon mũi tên giả để đẹp hơn (tùy chọn) */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
               <Filter size={12} />
            </div>
          </div>

          {/* 2. Ô INPUT (Giữ nguyên) */}
          <input
            type="text"
            placeholder={searchType === "title" ? "Nhập tên phim..." : "Nhập tên diễn viên..."}
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