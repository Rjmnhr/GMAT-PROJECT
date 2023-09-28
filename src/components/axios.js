import axios from "axios";

const AxiosInstance = axios.create({
  //baseURL: "https://gmatbackend-renjithcmrenju.b4a.run", // Replace with your API base URL
  baseURL: "http://localhost:8003",
  timeout: 20000, // Request timeout in milliseconds
});

export default AxiosInstance;
