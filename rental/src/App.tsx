import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExperienceSlider from "./components/ExperienceSlider";
import HeroPage from "./components/HeroPage";
import PackageDetails from "./components/PackageDetails";
import CategoryPage from "./components/CategoryPage";
import CategorySlider from "./components/CategorySlider";
import BodyWrapper from "./components/BodyWrapper";
import { BsWhatsapp } from "react-icons/bs";
import FooterPage from "./components/FooterPage";
import ContactUs from "./components/Contact";
import MessageDashboard from "./adminComponents/MessageDashboard";
import Sidebar from "./adminComponents/Sidebar";
import Bookings from "./adminComponents/Booking";
import HeroNavBar from "./components/HeroNavBar";
import ActivitiesList from "./adminComponents/ActivitiesList";
import ActivityDetails from "./adminComponents/ActivityDetails";
import PopularActivities from "./components/PopularActivities";
import AdminRoute from "./Auth/AdminRoute";
import Register from "./Auth/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0f172a] to-black flex items-center justify-center p-6">
              <div className="text-center text-white max-w-lg">
                <div className="mb-10">
                  <h1 className="text-4xl font-extrabold tracking-widest">
                    <span className="text-white">Rent</span>
                    <span className="text-pink-500">n</span>
                    <span className="text-white">Tour</span>
                  </h1>
                </div>
                <h1 className="text-6xl font-extrabold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-6">
                  Oops! Page not found
                </h2>
                <p className="mb-8 text-gray-300">
                  The page you're looking for doesn’t exist or has been moved.
                </p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 text-sm font-medium bg-black border hover:bg-[#0f172a] rounded-full transition"
                >
                  Go to Home
                </a>
              </div>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="w-full dark:bg-black dark:text-white">
              <HeroNavBar />
              <HeroPage />
              <ExperienceSlider />
              {/* <WhatsHappeningNow /> */}
              <CategorySlider /> {/* WhatsApp floating button */}
              <div className="fixed bottom-6 right-6 z-50">
                <BsWhatsapp
                  onClick={() =>
                    window.open("https://wa.me/971543498018", "_blank")
                  }
                  size={30}
                  className="cursor-pointer text-green-500 hover:scale-110 transition-transform"
                />
              </div>
              <PopularActivities />
              <FooterPage />
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <BodyWrapper>
              <ContactUs />
            </BodyWrapper>
          }
        />
        <Route
          path="/experience/:slug"
          element={
            <BodyWrapper>
              <PackageDetails />
            </BodyWrapper>
          }
        />
        <Route
          path="/category/:slug"
          element={
            <BodyWrapper>
              <CategoryPage />
            </BodyWrapper>
          }
        />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />

        {/* Admin */}

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Sidebar>
                <Bookings />
                <MessageDashboard />
              </Sidebar>
            </AdminRoute>
          }
        />

        <Route
          path="/contact-messages"
          element={
            <AdminRoute>
              <Sidebar>
                <MessageDashboard />
              </Sidebar>
            </AdminRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <AdminRoute>
              <Sidebar>
                <Bookings />
              </Sidebar>
            </AdminRoute>
          }
        />

        <Route
          path="/activities"
          element={
            <AdminRoute>
              <Sidebar>
                <ActivitiesList />
              </Sidebar>
            </AdminRoute>
          }
        />

        <Route
          path="/activity/:id"
          element={
            <AdminRoute>
              <Sidebar>
                <ActivityDetails />
              </Sidebar>
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
