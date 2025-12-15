import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Calendar, Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSlide = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [movies]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  if (!movies || movies.length === 0) return null;

  const movie = movies[currentIndex];

  return (
    <div className="relative w-full h-[450px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group my-6">
      
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${movie.image})` }} 
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
      </div>

      <div className="absolute inset-0 flex items-center px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-[1200px] mx-auto md:ml-16">
          
          <div className="hidden md:block w-[220px] h-[330px] flex-shrink-0 rounded-lg overflow-hidden shadow-lg border-2 border-white/20">
            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          <div className="text-white flex-1 text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
              {movie.title}
            </h2>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm md:text-base text-gray-200">
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded font-bold">
                TOP {currentIndex + 1}
              </span>
              
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{movie.year}</span>
              </div>

              {movie.genres && (
                <div className="px-2 py-0.5 border border-gray-500 rounded text-xs uppercase tracking-wider">
                  {movie.genres.join(" • ")}
                </div>
              )}
            </div>
            
            {movie.box_office_revenue && (
               <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-400 font-bold text-lg">
                  <Ticket className="w-5 h-5" />
                  <span>Box Office: {movie.box_office_revenue}</span>
               </div>
            )}

            <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-400 font-semibold">
                <Star className="w-4 h-4 fill-current" />
                <span>Rating: {movie.rate ? Number(movie.rate).toFixed(1) : "N/A"}</span>
            </div>

            <p className="text-gray-300 line-clamp-3 max-w-2xl text-sm md:text-lg">
              {movie.short_description}
            </p>

            <div className="pt-4">
              <Link to={`/movie/${movie.id}`} className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-transform transform hover:scale-105 shadow-lg">
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white backdrop-blur-sm transition opacity-0 group-hover:opacity-100"><ChevronLeft size={30} /></button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 p-3 rounded-full text-white backdrop-blur-sm transition opacity-0 group-hover:opacity-100"><ChevronRight size={30} /></button>
    </div>
  );
};

export default HeroSlide;