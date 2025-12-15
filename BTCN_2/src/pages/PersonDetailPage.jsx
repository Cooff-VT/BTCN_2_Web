import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchClient } from "../api/client";
import { Calendar, Trophy, User, Ruler, Film, ChevronLeft } from "lucide-react";

const PersonDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchClient(`/persons/${id}`);
        setPerson(response.data || response);
      } catch (error) {
        console.error("Error loading person details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetail();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!person) return null;

  const movieList = person.known_for || [];
  
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen text-gray-900 dark:text-white pb-20 transition-colors duration-300">
      
      <div className="relative bg-gray-900 text-white shadow-xl mb-10">
        
        <div className="absolute top-2 right-1 z-20">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white transition-all hover:scale-105 group"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back</span>
            </button>
        </div>

        <div className="absolute inset-0 overflow-hidden">
            <img src={person.image} className="w-full h-full object-cover opacity-20 blur-xl" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10 items-center md:items-start pt-20 md:pt-12">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl shrink-0 bg-gray-800">
                <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=No+Image"; }}
                />
            </div>

            <div className="flex-1 text-center md:text-left space-y-5">
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{person.name}</h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-gray-300 text-sm md:text-base">
                    {person.birth_date && (
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                            <Calendar size={16} className="text-blue-400" />
                            <span>{formatDate(person.birth_date)}</span>
                        </div>
                    )}
                    
                    {person.height && (
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                            <Ruler size={16} className="text-blue-400" />
                            <span>{person.height}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                         <User size={16} className="text-blue-400" />
                         <span>{person.role || "Artist"}</span>
                    </div>
                </div>

                {person.awards && (
                    <div className="flex items-start gap-3 bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20 max-w-2xl mx-auto md:mx-0">
                        <Trophy size={24} className="text-yellow-500 shrink-0 mt-0.5" />
                        <span className="text-yellow-100 italic text-lg">{person.awards}</span>
                    </div>
                )}

                <div className="pt-2">
                    <h3 className="text-lg font-bold text-blue-400 mb-2 uppercase border-l-4 border-blue-400 pl-3">Biography</h3>
                    <div 
                        className="text-gray-300 leading-relaxed max-w-4xl text-justify text-sm md:text-base line-clamp-4 hover:line-clamp-none transition-all cursor-pointer"
                        dangerouslySetInnerHTML={{ __html: person.summary || "Biography not available." }}
                        title="Click to read full biography"
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 border-l-8 border-blue-500 pl-4 flex items-center gap-3">
            Known For <span className="text-lg font-normal text-white bg-blue-600 px-3 py-0.5 rounded-full shadow-lg shadow-blue-500/30">{movieList.length} Movies</span>
        </h2>

        {movieList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {movieList.map((movie) => (
                    <Link 
                        key={movie.id} 
                        to={`/movie/${movie.id}`}
                        className="flex bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-800 group h-64"
                    >
                        <div className="w-44 h-full shrink-0 relative overflow-hidden bg-gray-800">
                            <img 
                                src={movie.image} 
                                alt={movie.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/200x300?text=No+Poster"; }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-center min-w-0 relative">
                            <Film className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-gray-100 dark:text-gray-800 opacity-50 -rotate-12" />

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 truncate mb-3 relative z-10">
                                {movie.title}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4 relative z-10">
                                <span className="font-bold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded text-sm">
                                    {movie.year || "N/A"}
                                </span>
                                <span className="text-gray-400">•</span>
                                <span className="uppercase text-xs font-bold tracking-wider">{movie.role || "Actor"}</span>
                            </div>

                            <div className="mt-auto relative z-10">
                                <div className="text-base text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800/50 p-3 rounded-lg border-l-4 border-gray-400 dark:border-gray-600">
                                    <span className="block text-xs uppercase text-gray-500 font-bold mb-0.5">Character</span>
                                    <span className="font-semibold text-lg">{movie.character || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-20 bg-gray-100 dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-xl text-gray-500 font-medium">No filmography information available.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetailPage;