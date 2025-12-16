import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { fetchClient } from "../api/client";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import { useAuth } from "../context/AuthContext";
import { Star, Clock, Calendar, ChevronLeft, PlayCircle, User, Trophy, Globe, DollarSign, MessageSquare, AlertTriangle, Heart } from "lucide-react";

const ExpandableText = ({ content, maxLength = 300 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content) return null;

  if (content.length <= maxLength) {
    return <p className="text-gray-400 text-sm leading-relaxed text-justify">{content}</p>;
  }

  return (
    <div className="text-gray-400 text-sm leading-relaxed text-justify">
      {isExpanded ? content : `${content.slice(0, maxLength)}... `}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-1 text-blue-400 hover:text-blue-300 font-bold hover:underline transition-colors focus:outline-none"
      >
        {isExpanded ? "See less" : "See more"}
      </button>
    </div>
  );
};

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  const [reviewPage, setReviewPage] = useState(1);
  const REVIEWS_PER_PAGE = 2;
  const reviewsRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchClient(`/movies/${id}`);
        setMovie(response.data || response);
        setReviewPage(1);

        if (isAuthenticated) {
            try {
                const favResponse = await fetchClient('/users/favorites');
                const favList = favResponse.data || favResponse || [];
                const isFav = favList.some(m => m.id.toString() === id.toString());
                setIsFavorite(isFav);
            } catch (err) {
                console.error("Failed to check favorites status", err);
            }
        }
      } catch (error) {
        console.error("Error loading movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id, isAuthenticated]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
        navigate('/login', { state: { from: location } });
        return;
    }

    try {
        setFavLoading(true);
        if (isFavorite) {
            await fetchClient(`/users/favorites/${id}`, { method: 'DELETE' });
            setIsFavorite(false);
        } else {
            await fetchClient(`/users/favorites/${id}`, { method: 'POST' });
            setIsFavorite(true);
        }
    } catch (error) {
        alert("Action failed: " + (error.message || "Unknown error"));
    } finally {
        setFavLoading(false);
    }
  };

  const handleReviewPageChange = (newPage) => {
    setReviewPage(newPage);
    if (reviewsRef.current) {
        reviewsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-950 pt-20"><LoadingSpinner /></div>;
  if (!movie) return null;

  const allReviews = movie.reviews || [];
  const totalReviewPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE);
  const currentReviews = allReviews.slice(
    (reviewPage - 1) * REVIEWS_PER_PAGE,
    reviewPage * REVIEWS_PER_PAGE
  );

  const displayRate = movie.rate 
    || (movie.ratings && movie.ratings.imDb) 
    || (movie.ratings && movie.ratings.theMovieDb) 
    || 0;

  return (
    <div className="bg-gray-950 min-h-screen text-white pb-20">
      <div className="relative w-full h-[60vh] md:h-[80vh]">
        {/* BACKGROUND LAYER */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
          style={{ backgroundImage: `url(${movie.image})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>

        {/* --- NÚT BACK (GÓC TRÊN BÊN PHẢI) --- */}
        <button 
            onClick={() => navigate(-1)} 
            className="absolute top-4 right-4 md:top-8 md:right-8 z-20 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm border border-white/10 transition-all group shadow-lg"
        >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            Back
        </button>

        {/* CONTENT */}
        <div className="absolute inset-0 flex items-end md:items-center justify-center px-4 md:px-12 pb-10">
          <div className="max-w-7xl w-full flex flex-col md:flex-row gap-10 items-center md:items-end">
            
            <div className="hidden md:block w-[300px] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.2)] border border-white/10 transform hover:scale-105 transition-transform duration-500">
              <img src={movie.image} alt={movie.full_title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 space-y-6 text-center md:text-left">
              {/* (Đã xóa nút back cũ ở đây) */}
              
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

              <div className="pt-4 flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 shadow-lg">
                  <PlayCircle size={28} fill="white" className="text-red-600" />
                  Watch Now
                </button>

                <button 
                    onClick={handleToggleFavorite}
                    disabled={favLoading}
                    className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all border-2 
                        ${isFavorite 
                            ? "bg-white text-red-600 border-white hover:bg-gray-100" 
                            : "bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white"
                        }
                    `}
                >
                  <Heart size={28} fill={isFavorite ? "currentColor" : "none"} className={favLoading ? "animate-pulse" : ""} />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-2 space-y-12">
          
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
                  <Link 
                    key={actor.id} 
                    to={`/person/${actor.id}`} 
                    className="bg-gray-900 rounded-lg p-3 text-center hover:bg-gray-800 transition-colors group block"
                  >
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 border-2 border-gray-700 group-hover:border-red-500 transition-colors">
                      {actor.image ? (
                        <img src={actor.image} alt={actor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <User className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-bold text-sm truncate group-hover:text-red-500 transition-colors">{actor.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{actor.character || "Actor"}</p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">Cast information not available.</p>
              )}
            </div>
          </section>

          <section ref={reviewsRef}>
             <h2 className="text-2xl font-bold text-red-500 mb-6 border-l-4 border-red-500 pl-3 uppercase flex items-center gap-2">
                User Reviews 
                <span className="text-sm font-normal text-gray-500 normal-case bg-gray-900 px-2 py-0.5 rounded-full border border-gray-800">
                    {allReviews.length}
                </span>
             </h2>

             <div className="space-y-6">
                {currentReviews.length > 0 ? (
                    <>
                        {currentReviews.map((review, idx) => (
                            <div key={idx} className="bg-gray-900/40 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center font-bold text-gray-300 border border-gray-600 shadow-inner">
                                                {review.username ? review.username.charAt(0).toUpperCase() : "U"}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{review.username || "Movie Fan"}</h4>
                                            <span className="text-xs text-gray-500">{review.date || "Unknown Date"}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {review.warning_spoilers && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                                                <AlertTriangle size={12} /> Spoiler
                                            </span>
                                        )}
                                        {review.rate && (
                                            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-lg border border-yellow-500/20">
                                                <Star size={14} fill="currentColor" />
                                                <span className="font-bold text-sm">{review.rate}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {review.title && <h5 className="font-bold text-gray-200 mb-2 text-base">{review.title}</h5>}
                                <ExpandableText content={review.content} maxLength={300} />
                            </div>
                        ))}

                        <Pagination 
                            currentPage={reviewPage} 
                            totalPages={totalReviewPages} 
                            onPageChange={handleReviewPageChange} 
                        />
                    </>
                ) : (
                    <div className="text-center py-10 text-gray-500 bg-gray-900/20 rounded-xl border border-dashed border-gray-800">
                        <MessageSquare className="mx-auto w-10 h-10 mb-3 opacity-30" />
                        <p>No reviews available yet.</p>
                    </div>
                )}
             </div>
          </section>

        </div>

        <div className="space-y-8">
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Details</h3>
            
            <div className="space-y-5">
              <div>
                <span className="block text-gray-500 text-sm uppercase font-bold mb-1">Director</span>
                <div className="flex flex-wrap gap-2">
                  {movie.directors && movie.directors.map((dir, index) => (
                    <Link 
                        key={dir.id} 
                        to={`/person/${dir.id}`} 
                        className="text-white font-medium hover:text-red-500 hover:underline transition-colors"
                    >
                        {dir.name}{index < movie.directors.length - 1 && ","}
                    </Link>
                  ))}
                </div>
              </div>

              {movie.countries && (
                <div>
                    <span className="flex items-center gap-2 text-gray-500 text-sm uppercase font-bold mb-1"><Globe size={14} /> Countries</span>
                    <span className="text-white">{movie.countries.join(", ")}</span>
                </div>
              )}

              {movie.box_office && (
                <div>
                  <span className="flex items-center gap-2 text-gray-500 text-sm uppercase font-bold mb-1"><DollarSign size={14} /> Box Office</span>
                  <p className="text-green-400 font-bold">{movie.box_office.cumulativeWorldwideGross || "N/A"}</p>
                </div>
              )}

              <div>
                <span className="flex items-center gap-2 text-gray-500 text-sm uppercase font-bold mb-1"><Trophy size={14} /> Awards</span>
                <p className="text-sm text-gray-400 leading-relaxed">{movie.awards || "No awards information available."}</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetailPage;