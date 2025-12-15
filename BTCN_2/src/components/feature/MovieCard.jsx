import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group/card relative block w-full h-full rounded-xl bg-gray-900 shadow-xl transition-all duration-300 overflow-visible hover:z-30"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-125"
          loading="lazy"
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
        >

          <h3 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-300">{movie.year}</span>

            <div className="flex items-center gap-1 text-yellow-400 font-bold">
              <Star className="w-3 h-3 fill-current" />
              <span>{movie.rate ? Number(movie.rate).toFixed(1) : "N/A"}</span>
            </div>
          </div>

          {movie.genres && (
            <div className="flex flex-wrap gap-1 text-xs text-gray-300 mb-3">
              {movie.genres.slice(0, 3).map((genre, index) => (
                <span
                  key={index}
                  className="bg-black/50 px-2 py-0.5 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold text-sm transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
