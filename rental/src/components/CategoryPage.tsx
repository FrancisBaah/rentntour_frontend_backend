import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetAPI } from "../assets/constants";

interface Activity {
  id: number;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
}
interface APIActivity {
  activity_id: number;
  activity_name: string;
  about: string;
  options?: { price?: number }[];
  image?: { url: string; order: number }[];
}

interface APICategory {
  category_name: string;
  activities: APIActivity[];
}

const CategoryPage = () => {
  const { slug } = useParams();
  const [selectedCat, setSelectedCat] = useState("All");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const navigate = useNavigate();

  const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, "-");
  const fromSlug = (slug: string | undefined) =>
    categories.find((cat) => toSlug(cat) === slug) ?? "All";

  useEffect(() => {
    const matchedCategory = fromSlug(slug);
    setSelectedCat(matchedCategory);
  }, [slug, categories]);

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await GetAPI<APICategory[]>("activities");

      if (data) {
        const categorySet = new Set<string>();

        const flatActivities: Activity[] = data.flatMap(
          (category: APICategory) => {
            categorySet.add(category.category_name);

            return category.activities.map((act) => {
              const minPrice =
                Array.isArray(act.options) && act.options?.length > 0
                  ? Math.min(...act.options.map((opt) => opt.price || 0))
                  : undefined;

              const firstImage =
                Array.isArray(act.image) && act.image?.length > 0
                  ? act.image.sort((a, b) => a.order - b.order)[0].url
                  : "/default-image.jpg";

              return {
                id: act.activity_id,
                title: act.activity_name,
                category: category.category_name,
                description: act.about,
                price: `AED ${minPrice?.toFixed(2) ?? "--"}`,
                image: firstImage,
                rating: 4.4, // placeholder
                reviews: 1000 + Math.floor(Math.random() * 10000), // placeholder
              };
            });
          }
        );

        setActivities(flatActivities);
        setCategories(["All", ...Array.from(categorySet)]);
      }
    };

    fetchActivities();
  }, []);

  const handleCategoryClick = (cat: string) => {
    setSelectedCat(cat);
    navigate(`/category/${toSlug(cat)}`);
  };

  return (
    <div className="py-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat, index) => (
          <button
            onClick={() => handleCategoryClick(cat)}
            key={index}
            className={`px-4 py-2 border border-gray-300 rounded-md cursor-pointer ${
              cat === selectedCat
                ? "bg-purple-200 text-purple-800"
                : "bg-white text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">{selectedCat} In Dubai</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {activities
          .filter(
            (act) =>
              selectedCat === "All" ||
              selectedCat === "" ||
              act.category === selectedCat
          )
          .map((act) => (
            <div
              key={act.id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="relative">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full object-cover h-40"
                />
                <h3 className="text-[16px] font-bold absolute bottom-0 text-white min-h-10 w-full bg-gradient-to-b from-black/20 via-black/40 to-black p-2">
                  {act.title}
                </h3>
              </div>
              <div className="p-2 flex flex-col gap-1">
                <p className="text-pink-600 text-sm mb-1">
                  ★ {act.rating} ({act.reviews.toLocaleString()})
                </p>
                <p className="text-gray-600 text-sm mb-3">{act.description}</p>
                <button
                  onClick={() =>
                    navigate(
                      `/experience/${act.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`
                    )
                  }
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white p-2 rounded-md cursor-pointer"
                >
                  Tickets from {act.price}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
