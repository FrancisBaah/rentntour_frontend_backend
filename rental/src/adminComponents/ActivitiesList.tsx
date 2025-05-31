import { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { GetAPI } from "../assets/constants";
import { useNavigate } from "react-router-dom";

interface Activity {
  activity_id: number;
  activity_name: string;
  category_name: string;
  city_id: number;
  options?: { title: string; price: number }[];
  images?: { url: string; order: number }[];
}

const ActivitiesList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await GetAPI<any>("activities");
        const flatList: Activity[] = data.flatMap((category: any) =>
          category.activities.map((act: any) => ({
            activity_id: act.activity_id,
            activity_name: act.activity_name,
            city_id: act.city_id,
            category_name: category.category_name,
            options: act.options || [],
            images: act.image || [], // API uses singular `image`, so map accordingly
          }))
        );

        setActivities(flatList);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "activity_id" },
    { title: "Activity Name", dataIndex: "activity_name" },
    { title: "Category", dataIndex: "category_name" },
    {
      title: "Options",
      dataIndex: "options",
      render: (options: Activity["options"]) =>
        options?.length ? (
          <ul className="list-disc list-inside text-[12px]">
            {options.map((opt, idx) => (
              <li key={idx}>
                {opt.title} - AED {opt.price}
              </li>
            ))}
          </ul>
        ) : (
          "-"
        ),
    },
    {
      title: "Images",
      dataIndex: "images",
      render: (images: Activity["images"]) =>
        Array.isArray(images) && images?.length > 0 ? (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {images?.slice(0, 3).map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt="Activity"
                style={{
                  width: 60,
                  height: 40,
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            ))}
            {images.length > 3 && <span>+{images.length - 3} more</span>}
          </div>
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      render: (_: any, record: Activity) => (
        <Button
          type="link"
          onClick={() => navigate(`/activity/${record.activity_id}`)}
        >
          View / Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Activities</h1>
      <Table
        dataSource={activities}
        columns={columns}
        rowKey="activity_id"
        loading={loading}
      />
    </div>
  );
};

export default ActivitiesList;
