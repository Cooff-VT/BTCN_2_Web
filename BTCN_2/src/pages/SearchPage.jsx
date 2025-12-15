import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchClient } from "../api/client";
import MovieCard from "../components/feature/MovieCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const titleQuery = searchParams.get("title");
  const personQuery = searchParams.get("person");
  const omniQuery = searchParams.get("q");

  const displayKeyword = titleQuery || personQuery || omniQuery;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!titleQuery && !personQuery && !omniQuery) return;

      try {
        setLoading(true);
        let endpoint = "";

        if (titleQuery) {
          endpoint = `/movies/search?title=${titleQuery}&limit=50`;
        } else if (personQuery) {
          endpoint = `/movies/search?person=${personQuery}&limit=50`;
        } else if (omniQuery) {
          endpoint = `/movies/search?q=${omniQuery}&limit=50`;
        }

        console.log("Calling API endpoint:", endpoint);
        const response = await fetchClient(endpoint);
        
        console.log("Search Response:", response);

        const rawData = response.data || response || [];
        
        const validMovies = Array.isArray(rawData) 
          ? rawData.filter(m => m && m.id && m.title) 
          : [];

        setMovies(validMovies);

      } catch (error) {
        console.error("Search error:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [titleQuery, personQuery, omniQuery]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white pt-10 px-4 md:px-12 pb-20 transition-colors duration-300">
      
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-2xl md:text-3xl font-bold border-l-4 border-blue-500 pl-4">
          {personQuery ? "Phim của diễn viên/đạo diễn: " : "Kết quả tìm kiếm: "}
          <span className="text-blue-600 dark:text-blue-400">"{displayKeyword}"</span>
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
             <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {movies.length > 0 ? (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 p-4">
                {movies.map(movie => (
                    <div key={movie.id} className="w-full">
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