import { useEffect, useState } from "react";
import { Input, Button, Form, Space, InputNumber, message } from "antd";
import { GetAPI, PutAPI } from "../assets/constants";
import { useParams } from "react-router-dom";

const ActivityDetails = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await GetAPI(`activities/${id}`);
        form.setFieldsValue(data);
      } catch (err) {
        message.error("Failed to load activity.");
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      await PutAPI(`activity/${id}`, values);
      message.success("Activity updated.");
    } catch {
      message.error("Failed to update activity.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit Activity #{id}</h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="about" label="About">
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item name="inclusion" label="Inclusion">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item name="important_info" label="Important Info">
          <Input.TextArea rows={2} />
        </Form.Item>

        <h2 className="mt-6 mb-2 font-semibold">Options</h2>
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space
                  key={key}
                  align="baseline"
                  style={{ display: "flex", marginBottom: 8 }}
                >
                  <Form.Item
                    {...rest}
                    name={[name, "title"]}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Option title" />
                  </Form.Item>
                  <Form.Item
                    {...rest}
                    name={[name, "price"]}
                    rules={[{ required: true }]}
                  >
                    <InputNumber placeholder="Price" />
                  </Form.Item>
                  <Button danger onClick={() => remove(name)}>
                    Remove
                  </Button>
                </Space>
              ))}
              <Button onClick={() => add()}>Add Option</Button>
            </>
          )}
        </Form.List>

        <h2 className="mt-6 mb-2 font-semibold">Images</h2>
        <Form.List name="images">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space
                  key={key}
                  align="baseline"
                  style={{ display: "flex", marginBottom: 8 }}
                >
                  <Form.Item
                    {...rest}
                    name={[name, "url"]}
                    rules={[{ required: true }]}
                  >
                    <Input
                      placeholder="Image URL"
                      onChange={(e) =>
                        form.setFieldValue(
                          ["images", name, "url"],
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>

                  {/* Preview image */}
                  <Form.Item shouldUpdate noStyle>
                    {() => {
                      const imageUrl = form.getFieldValue([
                        "images",
                        name,
                        "url",
                      ]);
                      return imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="Preview"
                          style={{
                            width: 100,
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      ) : null;
                    }}
                  </Form.Item>

                  <Form.Item
                    {...rest}
                    name={[name, "order"]}
                    rules={[{ required: true }]}
                  >
                    <InputNumber placeholder="Order" />
                  </Form.Item>
                  <Button danger onClick={() => remove(name)}>
                    Remove
                  </Button>
                </Space>
              ))}
              <Button onClick={() => add()}>Add Image</Button>
            </>
          )}
        </Form.List>

        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="mt-4"
          disabled={loading}
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default ActivityDetails;
