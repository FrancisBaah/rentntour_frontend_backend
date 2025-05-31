import { BsWhatsapp, BsEnvelope, BsInstagram } from "react-icons/bs";
import { PostAPI } from "../assets/constants";
import { FormEvent } from "react";
import { message } from "antd";

const ContactUs = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await PostAPI("contact", formData);

      if (res?.status === 200) {
        message.success(res.data.message);
        form.reset();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="contact" className="max-w-6xl mx-auto py-10">
      <h1 className="text-xl md:text-3xl font-bold mb-4 drop-shadow-lg">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-4">
          <p className="text-gray-700">
            We'd love to hear from you! Reach out anytime via:
          </p>
          <div className="flex items-center gap-3 text-lg">
            <BsWhatsapp className="text-green-500" />
            <a
              href="https://wa.me/971543498018"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              +971 54 349 8018
            </a>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <BsEnvelope />
            <a
              href="mailto:tourismdubai24@gmail.com"
              className="text-blue-700 hover:underline"
            >
              tourismdubai24@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <BsInstagram className="text-pink-500" />
            <a
              href="https://www.instagram.com/dubai.tourism33?igsh=ZDBwNWphNjRpdHJm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              @dubai.tourism33
            </a>
          </div>
        </div>

        {/* Optional Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-2 rounded hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
