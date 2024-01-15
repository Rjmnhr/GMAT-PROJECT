import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "https://adeftbackend-z0bvyb2s.b4a.run", // Replace with your API base URL
  baseURL: "http://localhost:8003",
});

export default AxiosInstance;
