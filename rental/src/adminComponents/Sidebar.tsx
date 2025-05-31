import { ReactNode, useState } from "react";
import { Button, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  PieChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd/es/menu";
import HeaderTitle from "./HeaderTitle";
import { RiBook2Line } from "react-icons/ri";
import { FaBiking } from "react-icons/fa";

// Define types for the getItem function params and return type
interface MenuItem {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: string;
}
// Explicitly type the children prop as ReactNode
interface SidebarProps {
  children: ReactNode;
}
const Sidebar = ({ children }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  const currentKey = pathname.pop() || "";
  const [currentPage, setCurrentPage] = useState<string>(currentKey);

  // Function to generate menu item
  const getItem = (
    label: React.ReactNode,
    key: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: string
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };
  // Define the type of the event parameter for onClick handler
  const getCurrentKey = (e: { key: string }) => {
    setCurrentPage(e.key); // Set the selected page when a menu item is clicked
  };

  const items: MenuItem[] = [
    getItem(
      <Link to="/dashboard">Dashboard</Link>,
      "dashboard",
      <PieChartOutlined />
    ),

    getItem(<Link to="/bookings">Bookings</Link>, "bookings", <RiBook2Line />),
    getItem(
      <Link to="/contact-messages">Contact Messages</Link>,
      "contact-messages",
      <ContactsOutlined />
    ),
    getItem(
      <Link to="/activities">Activities</Link>,
      "activities",
      <FaBiking />
    ),
  ].filter((item): item is MenuItem => item !== null); // Filter out any null items

  const currentDate = new Date();

  // Format the full date including weekday
  const dayOfWeek = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
  }).format(currentDate); // e.g., "Thursday"
  const day = new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(
    currentDate
  ); // e.g., "28"
  const month = new Intl.DateTimeFormat("en-GB", { month: "long" }).format(
    currentDate
  ); // e.g., "October"
  const year = new Intl.DateTimeFormat("en-GB", { year: "numeric" }).format(
    currentDate
  ); // e.g., "2021"

  // Format time as "HH:mm" (e.g., "17:30")
  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    // hour12: true, // Use 12-hour clock with AM/PM
  }).format(currentDate);
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <section className="flex flex-row  justify-between overflow-hidden overflow-y-auto 2xl:gap-10 max-h-screen">
      <div className="sm:mr-[16px] h-screen pt-4 flex items-center gap-4  2xl:pt-5 flex-col px-3 bg-white">
        <img
          src={`/${collapsed ? "favicon.svg" : "RentnTour.png"}`}
          alt="logo"
          className="max-w-[200px] max-h-8 mb-3"
        />

        <Menu
          onClick={getCurrentKey}
          defaultSelectedKeys={[currentPage]}
          defaultOpenKeys={[currentPage]}
          items={items as MenuProps["items"]}
          mode="inline"
          inlineCollapsed={collapsed}
        />
      </div>
      <div className="w-full max-w-[100vw] 2xl:mt-5 px-4 overflow-auto">
        <div className="w-full flex justify-between my-4 gap-10 items-center pr-2">
          <Button onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <h1 className="title">
            <strong>{`${day} ${month} ${year}`}</strong>
            {` ${dayOfWeek} | ${formattedTime}`}
          </h1>
          <div className="flex items-center gap-6">
            <HeaderTitle />
          </div>
        </div>
        <div className="overflow-auto">{children}</div>
      </div>
    </section>
  );
};

export default Sidebar;
