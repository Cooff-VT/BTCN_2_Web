import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchClient } from "../api/client";
import { Star, Clock, Calendar, ChevronLeft, PlayCircle, User, Trophy, Globe, DollarSign } from "lucide-react";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchClient(`/movies/${id}`);
        setMovie(response.data || response);
      } catch (error) {
        console.error("Error loading movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!movie) return null;

  const displayRate = movie.rate 
    || (movie.ratings && movie.ratings.imDb) 
    || (movie.ratings && movie.ratings.theMovieDb) 
    || 0;

  return (
    <div className="bg-gray-950 min-h-screen text-white pb-20">
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
          style={{ backgroundImage: `url(${movie.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>

        <div className="absolute inset-0 flex items-end md:items-center justify-center px-4 md:px-12 pb-10">
          <div className="max-w-7xl w-full flex flex-col md:flex-row gap-10 items-center md:items-end">
            
            <div className="hidden md:block w-[300px] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)] border border-white/10 transform hover:scale-105 transition-transform duration-500">
              <img src={movie.image} alt={movie.full_title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                {movie.full_title}
              </h1>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm md:text-base text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="text-red-500 w-5 h-5" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-red-500 w-5 h-5" />
                  <span>{movie.runtime || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                  <Star className="w-5 h-5 fill-current" />
                  <span>{displayRate ? Number(displayRate).toFixed(1) : "N/A"}</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {movie.genres && movie.genres.map((genre, idx) => (
                  <span key={idx} className="bg-white/10 hover:bg-red-600 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md transition-colors cursor-default border border-white/5">
                    {genre}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 shadow-lg mx-auto md:mx-0">
                  <PlayCircle size={28} fill="white" className="text-red-600" />
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold text-red-500 mb-4 border-l-4 border-red-500 pl-3 uppercase">Storyline</h2>
            <div 
              className="text-gray-300 text-lg leading-relaxed text-justify [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: movie.plot_full || movie.short_description || "No plot summary available." }}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-red-500 mb-6 border-l-4 border-red-500 pl-3 uppercase">Top Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movie.actors && movie.actors.length > 0 ? (
                movie.actors.slice(0, 8).map((actor) => (
                  <div key={actor.id} className="bg-gray-900 rounded-lg p-3 text-center hover:bg-gray-800 transition-colors group">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 border-2 border-gray-700 group-hover:border-red-500 transition-colors">
                      {actor.image ? (
                        <img src={actor.image} alt={actor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <User className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold text-sm truncate">{actor.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{actor.character || "Actor"}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Cast information not available.</p>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-4">Details</h3>
            
            <div className="space-y-5">
              <div>
                <span className="block text-gray-500 text-sm uppercase font-bold mb-1">Director</span>
                <div className="flex flex-wrap gap-2">
                    {movie.directors && movie.directors.map((dir, index) => (
                        <span key={dir.id} className="text-white font-medium">
                    {dir.name}
                    {index < movie.directors.length - 1 && ","}
                </span>
                    ))}
                </div>
              </div>

              {movie.countries && (
                <div>
                    <span className="flex items-center gap-2 text-gray-500 text-sm uppercase font-bold mb-1">
                        <Globe size={14} /> Countries
                    </span>
                    <span className="text-white">{movie.countries.join(", ")}</span>
                </div>
              )}

              {movie.box_office && (
                <div>
                  <span className="flex items-center gap-2 text-gray-500 text-sm uppercase font-bold mb-1">
                     <DollarSign size={14} /> Box Office
                  </span>
                  <p className="text-green-400 font-bold">{movie.box_office.cumulativeWorldwideGross || "N/A"}</p>
                </div>
              )}

              <div>
                <span className="flex items-center gap-2 text-gray-500 text-sm uppercase font-bold mb-1">
                    <Trophy size={14} /> Awards
                </span>
                <p className="text-sm text-gray-400 leading-relaxed">
                    {movie.awards || "No awards information available."}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetailPage;