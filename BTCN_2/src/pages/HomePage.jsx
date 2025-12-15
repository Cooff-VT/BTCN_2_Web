import { useEffect, useState } from "react";
import { fetchClient } from "../api/client";
import HeroSlide from "../components/feature/HeroSlide";

const HomePage = () => {
  const [heroMovies, setHeroMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); 
        const response = await fetchClient('/movies/most-popular?page=1');
        const movies = response.data || [];
        console.log("Dữ liệu phim:", movies);
        setHeroMovies(movies.slice(0, 5));
        
      } catch (error) {
        console.error("Lỗi tải phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      <section>
        <HeroSlide movies={heroMovies} />
      </section>
      
      <div className="text-center text-gray-500 py-10">
        Loading other sections...
      </div>
    </div>
  );
};

export default HomePage;