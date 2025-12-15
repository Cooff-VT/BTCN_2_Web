import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchClient } from "../api/client";
import { Calendar, Trophy, User, Ruler, Star } from "lucide-react";

const PersonDetailPage = () => {
  const { id } = useParams();
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
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
            <img src={person.image} className="w-full h-full object-cover opacity-20 blur-xl" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl shrink-0 bg-gray-800">
                <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=No+Image"; }}
                />
            </div>

            <div className="flex-1 text-center md:text-left space-y-5">
                <h1 className="text-4xl md:text-5xl font-bold text-white">{person.name}</h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-gray-300 text-sm md:text-base">
                    {person.birth_date && (
                        <div className="flex items-center gap-2">
                            <Calendar size={18} className="text-blue-400" />
                            <span>Born: {formatDate(person.birth_date)}</span>
                        </div>
                    )}
                    
                    {person.height && (
                        <div className="flex items-center gap-2">
                            <Ruler size={18} className="text-blue-400" />
                            <span>Height: {person.height}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                         <User size={18} className="text-blue-400" />
                         <span>{person.role || "Artist"}</span>
                    </div>
                </div>

                {person.awards && (
                    <div className="flex items-start gap-2 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                        <Trophy size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                        <span className="text-yellow-100 italic">{person.awards}</span>
                    </div>
                )}

                <div className="pt-2">
                    <h3 className="text-lg font-bold text-blue-400 mb-2 uppercase border-l-4 border-blue-400 pl-3">Biography</h3>
                    <div 
                        className="text-gray-300 leading-relaxed max-w-3xl text-justify text-sm md:text-base"
                        dangerouslySetInnerHTML={{ __html: person.summary || "Biography not available." }}
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 border-l-4 border-blue-500 pl-4 flex items-center gap-2">
            Known For <span className="text-sm font-normal text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full">{movieList.length}</span>
        </h2>

        {movieList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movieList.map((movie) => (
                    <Link 
                        key={movie.id} 
                        to={`/movie/${movie.id}`}
                        className="flex bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-800 group h-40"
                    >
                        <div className="w-28 h-full shrink-0 relative overflow-hidden bg-gray-800">
                            <img 
                                src={movie.image} 
                                alt={movie.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/150x225?text=No+Poster"; }}
                            />
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-center min-w-0">
                            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-500 truncate mb-1">
                                {movie.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                                <span className="font-semibold bg-gray-200 dark:bg-gray-800 px-2 rounded text-xs">{movie.year || "N/A"}</span>
                                <span>•</span>
                                <span className="truncate capitalize">{movie.role || "Actor"}</span>
                            </div>

                            <div className="mt-auto">
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="text-xs uppercase text-gray-400 font-bold mr-1">Character:</span>
                                    <span className="font-medium">{movie.character || "N/A"}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="text-center py-10 bg-gray-100 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500">No filmography information available.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default PersonDetailPage;