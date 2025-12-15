import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchClient } from "../api/client";
import MovieCard from "../components/feature/MovieCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!title) return;

      try {
        setLoading(true);
        const response = await fetchClient(`/movies/search?title=${title}`);
        setMovies(response.data || response || []);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [title]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white pt-10 px-4 md:px-12 pb-20 transition-colors duration-300">
      
      {/* Tiêu đề trang */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-2xl md:text-3xl font-bold border-l-4 border-blue-500 pl-4">
          Kết quả tìm kiếm: <span className="text-blue-600 dark:text-blue-400">"{title}"</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
             <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {movies.length > 0 ? (
             /* CẤU HÌNH CARDVIEW THEO YÊU CẦU:
                - grid: Dạng lưới
                - grid-cols-2: Điện thoại hiện 2 phim/hàng (cho đỡ bé quá)
                - lg:grid-cols-3: Máy tính/Tablet hiện ĐÚNG 3 phim/hàng (Chuẩn yêu cầu thầy)
                - gap-8: Khoảng cách giữa các phim rộng rãi, thoáng mắt
             */
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {movies.map(movie => (
                    <div key={movie.id} className="w-full">
                        {/* Đây chính là CardView (Thẻ phim) */}
                        <MovieCard movie={movie} />
                    </div>
                ))}
             </div>
          ) : (
             <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                <p className="text-xl font-medium">Không tìm thấy phim nào.</p>
                <p>Hãy thử tìm kiếm bằng từ khóa khác.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;