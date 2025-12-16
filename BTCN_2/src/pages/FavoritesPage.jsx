import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchClient } from "../api/client";
import MovieCard from "../components/feature/MovieCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { HeartOff, Film } from "lucide-react";

const FavoritesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await fetchClient('/users/favorites'); //
      setMovies(response.data || response || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (movieId) => {
    if (!window.confirm("Remove this movie from favorites?")) return;
    
    try {
        await fetchClient(`/users/favorites/${movieId}`, { method: 'DELETE' }); //
        setMovies(prev => prev.filter(m => m.id !== movieId));
    } catch (error) {
        alert("Failed to remove movie");
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20"><LoadingSpinner /></div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white pt-10 px-4 md:px-12 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-gray-200 dark:border-gray-800 pb-6 gap-4">
            <h1 className="text-3xl font-bold border-l-4 border-red-500 pl-4">
              My Favorite Movies
              <span className="ml-3 text-lg font-normal text-gray-500 bg-gray-200 dark:bg-gray-800 px-3 py-1 rounded-full">
                {movies.length}
              </span>
            </h1>
            
            <Link to="/profile" className="text-blue-500 hover:underline">
                &larr; Back to Profile
            </Link>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        handleRemove(movie.id);
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700 z-10"
                    title="Remove from favorites"
                >
                    <HeartOff size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
            <Film className="mx-auto w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-500">Your list is empty</h3>
            <p className="text-gray-400 mt-2">Go find some awesome movies to add!</p>
            <Link to="/" className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                Explore Movies
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;