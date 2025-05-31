import { BsInstagram, BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <footer className="bg-[#222] text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl text-[#D4AF37] font-bold mb-4">RentnTour</h2>
          <p className="text-sm">
            Discover the best of Dubai with curated experiences, custom
            packages, and seamless bookings.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg text-[#D4AF37] font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#D4AF37]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/category/all" className="hover:text-[#D4AF37]">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/#experiences" className="hover:text-[#D4AF37]">
                Experiences
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#D4AF37]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg text-[#D4AF37] font-semibold mb-4">
            Contact Us
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <BsWhatsapp className="text-green-400" />{" "}
              <span>+971 54 349 8018</span>
            </li>
            <li className="flex items-center gap-2">
              <Link to="/contact" className="flex items-center gap-2">
                <BsEnvelope /> <span>contact us</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg text-[#D4AF37] font-semibold mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://wa.me/971543498018"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-[#D4AF37] hover:scale-110 transition-transform"
            >
              <BsWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/dubai.tourism33?igsh=ZDBwNWphNjRpdHJm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-[#D4AF37] hover:scale-110 transition-transform"
            >
              <BsInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-400 mt-10">
        © {new Date().getFullYear()} RentnTour. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterPage;
