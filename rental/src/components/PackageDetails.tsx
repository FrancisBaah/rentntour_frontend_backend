import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetAPI, PostAPI } from "../assets/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DatePicker, message } from "antd";
import dayjs from "dayjs";

interface Option {
  title: string;
  price: number;
}

interface Experience {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  price?: number;
  options: Option[];
  images: string[];
}

interface FormState {
  date: string;
  people: number;
  fullName: string;
  phone: string;
  email: string;
  confirmEmail: string;
}

interface BookingPayload {
  experienceId: number;
  experienceTitle: string;
  optionTitle?: string;
  date: string;
  people: number;
  totalPrice: number;
  fullName?: string;
  phone?: string;
  email?: string;
}

interface DateOption {
  day: string;
  date: string; // Format: YYYY-MM-DD
  label: string; // e.g., Aug 25
  price: number | null;
}

const generateDateOptions = (numDays: number): DateOption[] => {
  const today = new Date();

  return Array.from({ length: numDays }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const iso = date.toISOString().split("T")[0]; // YYYY-MM-DD

    const weekday = date
      .toLocaleString("en-US", { weekday: "short" })
      .toUpperCase(); // e.g., "MON"

    const label = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    }); // e.g., "Jun 1"

    return {
      day: weekday,
      date: iso,
      label, // "Jun 1"
      price: i >= 5 ? null : 360,
    };
  });
};

const PackageDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [form, setForm] = useState<FormState>({
    date: "",
    people: 1,
    fullName: "",
    phone: "",
    email: "",
    confirmEmail: "",
  });

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const [dateOptions, setDateOptions] = useState<DateOption[]>(() =>
    generateDateOptions(7)
  );

  const [loading, setLoading] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selected = experience?.options.find(
      (opt) => opt.title === e.target.value
    );
    setSelectedOption(selected || null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "people" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.email !== form.confirmEmail) {
      message.error("Email addresses do not match.");
      return;
    }

    if (!experience || !selectedOption) return;

    const totalPrice = 1 * form.people * selectedOption.price;

    const bookingData: BookingPayload = {
      experienceId: experience.id,
      experienceTitle: experience.title,
      optionTitle: selectedOption.title,
      date: form.date,
      people: form.people,
      totalPrice,
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
    };

    try {
      setLoading(true);
      const res = await PostAPI("booking", bookingData);
      if (res?.status === 201) {
        message.success(res.data.message);
        setForm({
          date: "",
          people: 1,
          fullName: "",
          phone: "",
          email: "",
          confirmEmail: "",
        });
      }
    } catch (err) {
      console.error("Booking error:", err);
      message.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchExperience = async () => {
      const data = await GetAPI<any[]>("activities");

      if (data) {
        const flatActivities: Experience[] = data.flatMap((category) =>
          category.activities.map((act: any) => {
            const minPrice =
              act.options?.length > 0
                ? Math.min(...act.options.map((opt: any) => opt.price || 0))
                : undefined;

            return {
              id: act.activity_id,
              title: act.activity_name,
              slug: act.activity_name.toLowerCase().replace(/\s+/g, "-"),
              category: category.category_name,
              description: act.about,
              price: minPrice,
              options: act.options ?? [],
              images: act.image?.length
                ? act.image
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((img: any) => img.url)
                : [""],
            };
          })
        );

        const found = flatActivities.find((act) =>
          slug ? act.slug.startsWith(slug) : false
        );

        setExperience(found ?? null);
        if (found?.options?.length && found.options.length > 0) {
          setSelectedOption(found.options[0]);
        }
      }
    };

    fetchExperience();
  }, [slug]);
  const unitPrice = selectedOption?.price ?? 0;
  const totalPrice = 1 * form.people * unitPrice;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6 md:items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4">{experience?.title}</h1>
          <p className="mb-6">{experience?.description}</p>
        </div>
        <div className="w-full md:w-1/2">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="rounded-xl  shadow-lg shadow-black/40"
          >
            {experience?.images.map((url, index) => (
              <SwiperSlide key={index}>
                <div className="relative h-[270px] rounded-xl overflow-hidden shadow-2xl shadow-black">
                  <img
                    src={url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {unitPrice > 0 && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded-md shadow-md space-y-4 mt-8"
        >
          <div>
            <label className="block mb-1 font-medium">Select Option</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={selectedOption?.title}
              onChange={handleOptionChange}
              required
            >
              {experience?.options.map((opt, idx) => (
                <option key={idx} value={opt.title}>
                  {opt.title} – AED {opt.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Select Date</label>
            <div className="flex overflow-x-auto gap-4 py-2">
              {dateOptions.map((opt) => (
                <button
                  key={opt.date}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, date: opt.date }))
                  }
                  className={`flex flex-col items-center px-4 py-2 border rounded-md min-w-[80px]
        ${
          form.date === opt.date
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300"
        }
        ${
          opt.price === null
            ? "opacity-50 cursor-not-allowed"
            : "hover:border-purple-400"
        }`}
                  disabled={opt.price === null}
                >
                  <span className="text-xs text-gray-500">{opt.day}</span>
                  <span className="font-semibold">{opt.label}</span>
                  <span className="text-sm">
                    {opt.price ? `AED ${opt.price}` : "-"}
                  </span>
                </button>
              ))}
              {
                <DatePicker
                  onChange={(date) => {
                    if (date) {
                      const iso = date.toDate().toISOString().split("T")[0];
                      setForm((prev) => ({ ...prev, date: iso }));
                    }
                  }}
                  defaultValue={dayjs()}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                  format="MMM D, YYYY"
                  className="!w-full"
                  allowClear={false}
                  showToday
                />
              }
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Number of People</label>
            <input
              type="number"
              name="people"
              min="1"
              value={form.people}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {form.date && (
            <div className="text-lg font-semibold">
              Total Price: AED {totalPrice}
              <span className="text-sm text-gray-500 ml-2">
                ({form.people} {form.people > 1 ? "people" : "person"} × 1 day ×
                AED {unitPrice})
              </span>
            </div>
          )}

          {isConfirm && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">
                  Full Name (as per ID)
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Phone Number (AE +971)
                </label>
                <PhoneInput
                  type="tel"
                  name="phone"
                  defaultCountry="AE"
                  value={form.phone}
                  onChange={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      phone: value || "",
                    }))
                  }
                  placeholder="e.g. 501234567"
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Confirm Email Address
                </label>
                <input
                  type="email"
                  name="confirmEmail"
                  value={form.confirmEmail}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            </div>
          )}

          {isConfirm ? (
            <button
              type="submit"
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded hover:opacity-90 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Booking" : "Book Now"}
            </button>
          ) : (
            <button
              onClick={() => setIsConfirm(true)}
              className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded hover:opacity-90 cursor-pointer"
            >
              Next
            </button>
          )}
        </form>
      )}

      {unitPrice === 0 && (
        <div className="mt-6 text-gray-600 italic">
          Contact us to customize this experience or inquire for pricing.
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
