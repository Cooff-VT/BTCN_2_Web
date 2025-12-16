import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchClient } from "../api/client";
import MovieCard from "../components/feature/MovieCard";
import Pagination from "../components/ui/Pagination";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const titleQuery = searchParams.get("title");
  const personQuery = searchParams.get("person");
  const omniQuery = searchParams.get("q");
  
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const displayKeyword = titleQuery || personQuery || omniQuery;

  const ITEMS_PER_PAGE = 3; 

  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!titleQuery && !personQuery && !omniQuery) return;

      try {
        setLoading(true);
        let endpoint = "";
        
        const fetchLimit = "&limit=100"; 

        if (titleQuery) {
          endpoint = `/movies/search?title=${titleQuery}${fetchLimit}`;
        } else if (personQuery) {
          endpoint = `/movies/search?person=${personQuery}${fetchLimit}`;
        } else if (omniQuery) {
          endpoint = `/movies/search?q=${omniQuery}${fetchLimit}`;
        }

        const response = await fetchClient(endpoint);
        const data = response.data || response || [];
        
        const validMovies = Array.isArray(data) ? data.filter(m => m && m.id && m.title) : [];
        setAllMovies(validMovies);

      } catch (error) {
        console.error("Search error:", error);
        setAllMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();

  }, [titleQuery, personQuery, omniQuery]); 

  const totalPages = Math.ceil(allMovies.length / ITEMS_PER_PAGE);
  
  const currentMovies = allMovies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white pt-10 px-4 md:px-12 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-2xl md:text-3xl font-bold border-l-4 border-blue-500 pl-4">
          {personQuery ? "Movies for: " : "Results for: "}
          <span className="text-blue-600 dark:text-blue-400">"{displayKeyword}"</span>
          <span className="ml-3 text-sm font-normal text-gray-500">({allMovies.length} Result)</span>
        </h1>
      </div>

      {loading ? (
        <div className="pt-20"><LoadingSpinner /></div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {allMovies.length > 0 ? (
             <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 p-4">
                    {currentMovies.map(movie => (
                        <div key={movie.id} className="w-full">
                            <MovieCard movie={movie} />
                        </div>
                    ))}
                </div>

                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                />
             </>
          ) : (
             <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                <p className="text-xl font-medium">Not found.</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;