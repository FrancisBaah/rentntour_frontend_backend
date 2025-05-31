import { useEffect, useState } from "react";
const mockArticles = [
  {
    title: "Experience Dubai in a Rolls-Royce: Ultimate Luxury on Wheels",
    description:
      "Cruise down Sheikh Zayed Road in elegance. Discover how Dubai’s luxury rentals redefine travel.",
    imageUrl: "https://images.unsplash.com/photo-1616279522047-4e74c84f5e1b",
    link: "#",
  },
  {
    title: "The Best Rooftop Lounges in Dubai for a Sunset Drink",
    description:
      "Sip cocktails with skyline views. Here are Dubai's most Instagram-worthy rooftop bars.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    link: "#",
  },
  {
    title: "Inside Dubai’s Newest Waterfront Villas",
    description:
      "Take a look at the latest ultra-modern villas available for short-term rentals along the Dubai Marina.",
    imageUrl: "https://images.unsplash.com/photo-1501183638710-841dd1904471",
    link: "#",
  },
  {
    title: "Luxury Desert Escapes: Glamping in the Dunes",
    description:
      "Trade skyscrapers for stars with premium desert camps that offer 5-star amenities in the sand.",
    imageUrl: "https://images.unsplash.com/photo-1549921296-3a6b2c2ec796",
    link: "#",
  },
  {
    title: "Yacht Life in Dubai: A Guide to Private Charters",
    description:
      "Want to celebrate on the water? Here's how to rent a yacht in Dubai and what to expect onboard.",
    imageUrl: "https://images.unsplash.com/photo-1604661492068-7e1d81e6611e",
    link: "#",
  },
];

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async fetch
    setTimeout(() => {
      setArticles(mockArticles); // replace with the above `articles` array
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4">
      <h1 className="text-3xl font-bold mb-8">Discover Dubai</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-48 w-full object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>
            {/* <a href={article.url} className="text-blue-600 hover:underline">
              Read Full Article
            </a> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;
