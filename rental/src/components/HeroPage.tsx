import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src="dubaicar.jpeg"
        alt="Dubai"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 dark:from-black/80 dark:via-black/50 dark:to-black/90 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          {t("Rent. Explore. Experience Dubai.")}
        </h1>
        <p className="text-sm md:text-lg mb-6 max-w-2xl drop-shadow-md">
          {t(
            "Book your car and choose thrilling tour packages — select dates, add tickets, and personalize your journey."
          )}
        </p>
        <button
          onClick={() => navigate("category/all")}
          className="border-white cursor-pointer w-full md:w-56 border hover:text-black text-lg font-semibold py-3 px-8 rounded-sm shadow-lg hover:bg-gray-200 transition-all duration-300"
        >
          {t("Explore")}
        </button>
      </div>
    </section>
  );
};

export default HeroPage;
