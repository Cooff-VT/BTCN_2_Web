import { useEffect, useState } from "react";
import { fetchClient } from "../api/client";
import HeroSlide from "../components/feature/HeroSlide";
import MovieList from "../components/feature/MovieList";

const HomePage = () => {
  const [heroMovies, setHeroMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]); 
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  
  const [popularPage, setPopularPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        const [popRes, topRes] = await Promise.all([
            fetchClient('/movies/most-popular?page=1'),
            fetchClient('/movies/top-rated?page=1')
        ]);

        const popData = popRes.data || [];
        const topData = topRes.data || [];

        setHeroMovies(popData.slice(0, 5));
        setPopularMovies(popData);
        setTopRatedMovies(topData);

      } catch (error) {
        console.error("Lỗi tải trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const loadMorePopular = async () => {
    try {
      const nextPage = popularPage + 1;
      console.log(`Đang tải thêm Popular trang ${nextPage}...`);
      
      const response = await fetchClient(`/movies/most-popular?page=${nextPage}`);
      const newMovies = response.data || [];

      if (newMovies.length > 0) {
        setPopularMovies(prev => [...prev, ...newMovies]);
        setPopularPage(nextPage);
      }
    } catch (error) {
      console.error("Lỗi tải thêm popular:", error);
    }
  };

  const loadMoreTopRated = async () => {
    try {
      const nextPage = topRatedPage + 1;
      console.log(`Đang tải thêm Top Rated trang ${nextPage}...`);

      const response = await fetchClient(`/movies/top-rated?page=${nextPage}`);
      const newMovies = response.data || [];

      if (newMovies.length > 0) {
        setTopRatedMovies(prev => [...prev, ...newMovies]);
        setTopRatedPage(nextPage);
      }
    } catch (error) {
      console.error("Lỗi tải thêm top rated:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-10">
      <section>
        <HeroSlide movies={heroMovies} />
      </section>

      <section>
        <MovieList 
          title="Most Popular Movies" 
          movies={popularMovies} 
          onLoadMore={loadMorePopular} 
        />
      </section>

      <section>
        <MovieList 
          title="Top Rated Movies" 
          movies={topRatedMovies} 
          onLoadMore={loadMoreTopRated}
        />
      </section>

      <div className="h-10"></div> 
    </div>
  );
};

export default HomePage;