import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchClient } from "../api/client";
import MovieCard from "../components/feature/MovieCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const keyword = searchParams.get("title");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword) return;

      try {
        setLoading(true);
        const response = await fetchClient(`/movies/search?title=${keyword}`);
        console.log("Kết quả tìm kiếm:", response);
        
        setMovies(response.data || response || []);
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-24 px-4 md:px-12 pb-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4">
        Kết quả tìm kiếm cho: <span className="text-yellow-400">"{keyword}"</span>
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
             <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {movies.length > 0 ? (
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                {movies.map(movie => (
                    <div key={movie.id}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
             </div>
          ) : (
             <div className="text-center py-20 text-gray-500">
                <p className="text-xl">Không tìm thấy phim nào phù hợp.</p>
             </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;