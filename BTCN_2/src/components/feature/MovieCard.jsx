import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const displayYear = movie.year;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group/card relative block w-full h-full overflow-hidden rounded-xl bg-gray-900 shadow-xl"
    >
      <div className="w-full h-full transition-transform duration-500 group-hover/card:scale-110">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent
        opacity-0 group-hover/card:opacity-100
        transition-opacity duration-300
        flex flex-col justify-end p-4"
      >
        <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
          
          <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2">
            {movie.title}
          </h3>

          <div className="flex items-center justify-between text-sm">
            
            <div className="flex items-center gap-2 overflow-hidden mr-2">
              <span className="text-gray-300 font-medium shrink-0">{displayYear}</span>
              
              <span className="text-gray-500 text-[10px]">•</span>

              <span className="text-[10px] text-gray-200 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                {movie.genres && movie.genres.length > 0 
                  ? movie.genres.slice(0, 2).join(" • ")
                  : "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-1 text-yellow-400 font-bold bg-black/40 px-2 py-1 rounded shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span>{movie.rate ? Number(movie.rate).toFixed(1) : "N/A"}</span>
            </div>

          </div>

        </div>
      </div>
    </Link>
  );
};

export default MovieCard;