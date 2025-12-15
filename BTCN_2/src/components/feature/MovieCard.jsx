import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="group relative block w-full h-full overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
    >
      <div className="aspect-[2/3] w-full bg-gray-900">
        <img
          src={movie.image} 
          alt={movie.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default MovieCard;