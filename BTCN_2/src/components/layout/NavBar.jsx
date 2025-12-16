import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search, Filter, LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("title"); 
  const { user, isAuthenticated, logout } = useAuth(); // Lấy state từ AuthContext
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

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/"); // Quay về trang chủ sau khi đăng xuất
  };

  return (
    <nav className="bg-blue-100 dark:bg-gray-800 py-3 transition-colors duration-300 shadow-md sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
        
        {/* LOGO HOME */}
        <Link 
          to="/" 
          className="p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300
            bg-gray-600 text-white          
            dark:bg-white dark:text-black   
          "
        >
          <Home className="w-5 h-5" />
        </Link>

        {/* GROUP PHẢI: SEARCH + AUTH */}
        <div className="flex gap-4 items-center">
          
          {/* 1. KHUNG TÌM KIẾM */}
          <div className="flex gap-2">
            <div className="relative group hidden sm:block"> {/* Ẩn select trên mobile nếu chật */}
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
              placeholder={searchType === "title" ? "Enter movie title..." : "Enter person name..."}
              className="w-32 sm:w-64 px-4 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
                bg-white text-gray-900 border-blue-200
                dark:bg-gray-700 dark:text-white dark:border-gray-600
              "
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            
            <button 
              onClick={handleSearch} 
              className="px-3 sm:px-4 py-1.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 border-2
                bg-transparent border-blue-400 text-blue-700 hover:bg-blue-600 hover:text-white
                dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black
              "
            >
              <Search className="w-4 h-4" /> 
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* 2. KHUNG AUTHENTICATION (User/Login) */}
          <div className="border-l pl-4 border-gray-300 dark:border-gray-600 ml-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Link tới Profile */}
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium hover:text-blue-500 transition-colors"
                  title="View Profile"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-sm">
                     <UserIcon size={18} />
                  </div>
                  <span className="hidden md:inline max-w-[100px] truncate">
                    {user?.username || 'User'}
                  </span>
                </Link>
                
                {/* Nút Logout */}
                <button 
                  onClick={handleLogout} 
                  className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors" 
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;