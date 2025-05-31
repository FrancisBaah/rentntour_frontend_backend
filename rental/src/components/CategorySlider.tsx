import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useRef, useState } from "react";
import { GetAPI } from "../assets/constants";

type CategoryCard = {
  name: string;
  image: string;
};

export default function CategorySlider() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryCard[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const fetchCategoriesWithImages = async () => {
    const data = await GetAPI<any[]>("activities");

    if (!data || !Array.isArray(data)) return;

    const uniqueCategories: Record<string, CategoryCard> = {};

    for (const category of data) {
      const firstActivity = category.activities?.[0];

      let image = "/default.jpg";
      if (firstActivity?.image?.length > 0) {
        const sorted = firstActivity.image.sort(
          (a: any, b: any) => a.order - b.order
        );
        image = sorted[0]?.url || image;
      }

      if (!uniqueCategories[category.category_name]) {
        uniqueCategories[category.category_name] = {
          name: category.category_name,
          image,
        };
      }
    }

    setCategories(Object.values(uniqueCategories));
  };

  useEffect(() => {
    fetchCategoriesWithImages();
  }, []);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === categories.length - 1;
  return (
    <div className="py-12 max-w-6xl mx-auto relative">
      <h1 className="text-xl md:text-3xl font-bold mb-4 drop-shadow-lg ">
        Explore by Category
      </h1>
      {!isFirst && (
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-gray-100 transition"
        >
          <svg
            className="w-4 h-4 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      {!isLast && (
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-gray-100 transition"
        >
          <svg
            className="w-4 h-4 text-gray-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        grabCursor={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
        }}
        className="max-w-[90rem] mx-auto"
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {categories.map((cat, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() =>
                navigate(
                  `/category/${cat.name.toLowerCase().replace(/\s+/g, "-")}`
                )
              }
              className="cursor-pointer rounded-xl w-[215px] overflow-hidden shadow-md bg-white dark:bg-gray-800"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src={cat.image}
                alt={cat.name}
                className="w-full h-[350px] object-cover"
              />
              <div className="p-3 text-center text-sm font-semibold bg-[#25D366] hover:bg-[#128C7E] text-white">
                {cat.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
