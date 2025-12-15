import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="py-8 px-4 md:px-12">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold border-l-4 border-red-600 pl-3 text-gray-900 dark:text-white uppercase tracking-wide transition-colors duration-300">
          {title}
        </h2>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm -ml-6 hidden md:block border border-white/10"
        >
          <ChevronLeft size={32} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-2 scrollbar-hide scroll-smooth snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="min-w-[45%] md:min-w-[calc(33.333%-16px)] snap-start"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-red-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm -mr-6 hidden md:block border border-white/10"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
};

export default MovieList;