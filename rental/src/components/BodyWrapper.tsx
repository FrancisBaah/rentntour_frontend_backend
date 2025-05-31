import { BsWhatsapp } from "react-icons/bs";
import NavBar from "./NavBar";
import FooterPage from "./FooterPage";
import { ReactNode } from "react";

interface BodyWrapperProps {
  children: ReactNode;
}

const BodyWrapper = ({ children }: BodyWrapperProps) => {
  return (
    <div className="w-full flex justify-between flex-col min-h-screen dark:bg-black dark:text-white">
      <NavBar />
      <div className="h-20" />
      {children}

      {/* WhatsApp floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <BsWhatsapp
          onClick={() => window.open("https://wa.me/971543498018", "_blank")}
          size={30}
          className="cursor-pointer text-green-500 hover:scale-110 transition-transform"
        />
      </div>

      <FooterPage />
    </div>
  );
};

export default BodyWrapper;
