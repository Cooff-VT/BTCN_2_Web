import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchClient } from "../api/client";
import { Star, Clock, Calendar, ChevronLeft, PlayCircle } from "lucide-react";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchClient(`/movies/${id}`);
        setMovie(response);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center text-white pt-20">
        <h2 className="text-2xl">Movie not found!</h2>
        <Link to="/" className="text-red-500 hover:underline">Back to home</Link>
      </div>
    );
  }

 
  return (
    <div className="text-white pt-20 px-4">
       <pre>{JSON.stringify(movie, null, 2)}</pre>
    </div>
  );
};

export default MovieDetailPage;