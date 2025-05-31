const WhatsHappeningNow = () => {
  return (
    <section className="py-16 w-full min-h-[90vh] max-w-6xl mx-auto">
      {/* Section title */}
      <div className="relative h-full">
        <div className="bg-[#222] dark:bg-gray-900 z-10 h-96 w-full rounded-tl-[50px] rounded-tr-[0] rounded-bl-[0] rounded-br-[0] p-6 inline-block">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            What's happening now
          </h2>
        </div>
      </div>

      {/* Card */}
      <div className="-mt-70 md:ml-20 ml-5 pr-5 md:pr-20 absolute bg-white dark:bg-black flex flex-col md:flex-row gap-8 z-20 rounded-tl-[50px]">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src="/outdoor.jpg"
            alt="Outdoor Restaurants"
            className="w-full h-full object-cover rounded-tl-[50px]"
          />
        </div>

        {/* Content */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <p className="uppercase text-sm text-gray-500 font-semibold mb-2">
            Things to do
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            44 of Dubai's favourite outdoor restaurants and sun-filled terraces
          </h3>
          <p className="text-gray-600 mb-6">
            We've rounded up the top restaurants offering stunning alfresco
            views from their outdoor terraces.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="/articles"
              className="text-[#222] font-semibold hover:underline"
            >
              Read now &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsHappeningNow;
