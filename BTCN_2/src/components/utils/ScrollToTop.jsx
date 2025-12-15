import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Lấy ra đường dẫn hiện tại (pathname)
  const { pathname } = useLocation();

  useEffect(() => {
    // Mỗi khi pathname thay đổi -> Cuộn lên toạ độ (0, 0) ngay lập tức
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Component này không render ra giao diện gì cả
};

export default ScrollToTop;