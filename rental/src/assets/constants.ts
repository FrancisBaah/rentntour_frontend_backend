import { message } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Base URL for API requests
export const baseURL: string = "/api";

// Configure Axios to send cookies with requests
axios.defaults.withCredentials = true;

// Get API function
export const GetAPI = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await axios.get(`${baseURL}/${url}`);
    return response.data; // Return the actual data from the response
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// Post API function
export const PostAPI = async (
  url: string,
  data: any,
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse | undefined> => {
  try {
    const res: AxiosResponse = await axios.post(`${baseURL}/${url}`, data, {
      headers,
    });
    return res;
  } catch (error: any) {
    if (error?.response) {
      console.log("Error response data:", error.response.data);
      message.error(error.response.data?.message || "Error during Request");
    } else {
      console.error("Error during login");
    }
  }
};

// Put API function
export const PutAPI = async (
  url: string,
  data: any,
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse | undefined> => {
  try {
    const res: AxiosResponse = await axios.put(`${baseURL}/${url}`, data, {
      headers,
    });
    return res;
  } catch (error: any) {}
};

// Delete API function
export const DeleteAPI = async (
  url: string
): Promise<AxiosResponse | undefined> => {
  try {
    const res: AxiosResponse = await axios.delete(`${baseURL}/${url}`);
    return res;
  } catch (error: any) {
    console.error(error);
  }
};
