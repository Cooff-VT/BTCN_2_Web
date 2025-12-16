import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchClient } from "../api/client";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import { HeartOff, Film, Calendar } from "lucide-react";

const FavoritesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 3;

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await fetchClient('/users/favorites');
      const data = response.data || response || [];
      setMovies(Array.isArray(data) ? data : []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (movieId) => {
    if (!window.confirm("Remove this movie from favorites?")) return;
    
    const previousMovies = [...movies];
    const newMovies = movies.filter(m => m.id !== movieId);
    setMovies(newMovies);

    const totalPagesAfterRemove = Math.ceil(newMovies.length / MOVIES_PER_PAGE);
    if (currentPage > totalPagesAfterRemove && totalPagesAfterRemove > 0) {
        setCurrentPage(totalPagesAfterRemove);
    }

    try {
        await fetchClient(`/users/favorites/${movieId}`, { method: 'DELETE' });
    } catch (error) {
        alert("Failed to remove movie");
        setMovies(previousMovies);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20"><LoadingSpinner /></div>;

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
  const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white pt-10 px-4 md:px-12 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-200 dark:border-gray-800 pb-6 gap-4">
            <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-4 flex items-center gap-3">
              My Favorite Movies
              <span className="text-lg font-normal text-white bg-red-600 px-3 py-1 rounded-full shadow-md">
                {movies.length}
              </span>
            </h1>
            
            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition font-medium">
                &larr; Back to Profile
            </Link>
        </div>

        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {currentMovies.map((movie) => (
                <div key={movie.id} className="group relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  
                  <Link to={`/movie/${movie.id}`} className="block relative aspect-[2/3] overflow-hidden bg-gray-800">
                      <img 
                          src={movie.image_url}
                          alt={movie.title || "Movie Poster"} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                              e.target.onerror = null; 
                          }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  </Link>

                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                      <h3 className="font-bold text-lg truncate mb-1 text-shadow-sm">{movie.title || "Unknown Title"}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-300">
                          <span className="flex items-center gap-1">
                              <Calendar size={12} className="text-red-500" /> 
                              {movie.release_year || "N/A"}
                          </span>
                      </div>
                  </div>
                  
                  <button 
                      onClick={(e) => {
                          e.preventDefault();
                          handleRemove(movie.id);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-full shadow-lg transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20"
                      title="Remove from favorites"
                  >
                      <HeartOff size={18} />
                  </button>

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
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <Film className="mx-auto w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-500">Your list is empty</h3>
            <p className="text-gray-400 mt-2">Go find some awesome movies to add!</p>
            <Link to="/" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30">
                Explore Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;