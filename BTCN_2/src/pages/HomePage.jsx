import { useEffect, useState } from "react";
import { fetchClient } from "../api/client";
import HeroSlide from "../components/feature/HeroSlide";
import MovieList from "../components/feature/MovieList";

const HomePage = () => {
  const [heroMovies, setHeroMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        
        // Vì mỗi trang chỉ có 3 phim, ta cần gọi 10 trang để được 30 phim
        const promises = [];
        for (let page = 1; page <= 10; page++) {
            promises.push(fetchClient(`/movies/most-popular?page=${page}`));
        }
        
        // Chạy song song tất cả các request để tiết kiệm thời gian
        const responses = await Promise.all(promises);

        // Gộp tất cả dữ liệu lại thành 1 mảng duy nhất
        // flatMap giúp làm phẳng mảng (gộp các mảng con thành 1 mảng lớn)
        const allMovies = responses.flatMap(res => res.data || []);
        
        console.log("Tổng số phim lấy được:", allMovies.length);

        // 1. Hero Slide: Lấy 5 phim đầu
        setHeroMovies(allMovies.slice(0, 5));

        // 2. Danh sách Popular: LẤY TOÀN BỘ (như ý bạn yêu cầu)
        setPopularMovies(allMovies);

      } catch (error) {
        console.error("Lỗi tải trang chủ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

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
        <MovieList title="Most Popular Movies" movies={popularMovies} />
      </section>

      <div className="h-10"></div> 
    </div>
  );
};

export default HomePage;