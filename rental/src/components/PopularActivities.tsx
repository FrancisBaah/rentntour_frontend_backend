import { useState, useEffect } from "react";
import { GetAPI } from "../assets/constants";
import { useNavigate } from "react-router-dom";

interface PopularActivity {
  activity_id: number;
  activity_name: string;
  about: string;
  inclusion: string;
  important_info: string;
  image_url: string;
  city_id: number;
  category_id: number;
  category_name: string;
  booking_count: number;
}

const PopularActivities = () => {
  const [popularActivities, setPopularActivities] = useState<PopularActivity[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPopularActivities = async () => {
    try {
      const data = await GetAPI("/booking/popular");
      if (Array.isArray(data)) {
        setPopularActivities(data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch popular activities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularActivities();
  }, []);

  if (loading)
    return <div className="p-6 text-center">Loading popular activities...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-purple-700">
          🔥 Most Booked Activities
        </h2>

        <div className="grid grid-cols-5 gap-16 pb-4">
          {popularActivities.map((activity) => (
            <div
              key={activity.activity_id}
              onClick={() =>
                navigate(
                  `/experience/${activity.activity_name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`
                )
              }
              className="w-[200px] rounded-2xl flex-shrink-0 bg-white  overflow-hidden shadow hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
            >
              <div className="relative h-[200px]">
                <img
                  src={activity.image_url}
                  alt={activity.activity_name}
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute top-2 left-2 bg-white text-xs text-black px-2 py-1 rounded-full shadow">
                  {activity.category_name}
                </div>
              </div>

              <div className="p-2 space-y-2">
                <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                  {activity.activity_name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {activity.about}
                </p>
                <div className="text-sm text-gray-700">
                  <span className="font-medium">
                    📍 {activity.category_name}
                  </span>
                </div>
                <div className="text-sm text-purple-700 font-semibold">
                  Booked {Number(activity.booking_count) + 10} times
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularActivities;
