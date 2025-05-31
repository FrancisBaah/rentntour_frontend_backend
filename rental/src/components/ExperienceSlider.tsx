import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { GetAPI } from "../assets/constants";

interface Activity {
  activity_id: number;
  activity_name: string;
  about: string;
  category_name: string;
  price?: number;
  image: string;
}

export default function ExperienceSlider() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  const fetchActivities = async () => {
    const data = await GetAPI<any[]>("activities");

    if (data) {
      const flatActivities = data.flatMap((category) =>
        category.activities.map((act: any) => {
          const minPrice =
            act.options && act.options.length > 0
              ? Math.min(...act.options.map((opt: any) => opt.price || 0))
              : undefined;

          const firstImage =
            act.image && act.image.length > 0
              ? act.image.sort((a: any, b: any) => a.order - b.order)[0].url
              : "/default-image.jpg";

          return {
            ...act,
            category_name: category.category_name,
            image: firstImage,
            price: minPrice,
          };
        })
      );

      setActivities(flatActivities);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === activities.length - 1;

  return (
    <div id="experiences" className="py-12 bg-[#f8f8f8]">
      <h1 className="text-xl md:text-3xl font-bold mb-4 drop-shadow-lg max-w-6xl mx-auto">
        Dubai Activities to Try Now
      </h1>
      <div className="relative max-w-6xl mx-auto">
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
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={20}
          slidesPerView={2}
          grabCursor={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {activities.map((item, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.3,
                }}
                onClick={() =>
                  navigate(
                    `/experience/${item.activity_name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`
                  )
                }
                className="bg-white relative dark:bg-gray-900 w-[215px] rounded-xl shadow-md overflow-hidden cursor-pointer"
              >
                <motion.img
                  whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                  src={item.image}
                  alt={item.activity_name}
                  className="w-full h-[350px] object-cover"
                />
                <h3 className="text-lg font-bold absolute bottom-0 text-white h-20 w-full bg-gradient-to-b from-black/20 via-black/40 to-black p-3">
                  {item.activity_name}
                </h3>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
