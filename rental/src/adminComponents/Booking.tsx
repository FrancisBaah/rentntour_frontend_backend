import { useEffect, useState } from "react";
import { GetAPI } from "../assets/constants"; // your API helper
import { Table, Tag } from "antd";
interface Booking {
  id: number;
  experience_id: number;
  experience_title: string;
  option_title?: string;
  from: string;
  to: string;
  people: number;
  total_price: number;
  status: string;
  created_at: string;
  full_name?: string;
  phone?: string;
  email?: string;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await GetAPI<Booking[]>("booking");
        setBookings(data || []);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Experience", dataIndex: "experience_title" },
    { title: "Option", dataIndex: "option_title" },
    { title: "From", dataIndex: "from" },
    { title: "To", dataIndex: "to" },
    { title: "People", dataIndex: "people" },
    {
      title: "Full Name",
      dataIndex: "full_name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (phone: string) => (phone ? `+971 ${phone}` : "-"),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email: string) => (
        <a href={`mailto:${email}`} className="text-blue-500 underline">
          {email}
        </a>
      ),
    },
    {
      title: "Total Price (AED)",
      dataIndex: "total_price",
      render: (price: number) => `AED ${price}`,
    },
    {
      title: "Booked At",
      dataIndex: "created_at",
      render: (val: string) => new Date(val).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const color =
          status === "confirmed"
            ? "green"
            : status === "cancelled"
            ? "volcano"
            : "gold";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Bookings;
