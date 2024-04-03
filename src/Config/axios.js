import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://adeftbackend1-7xwgos42.b4a.run",
  // baseURL: "http://localhost:8003",
});

export default AxiosInstance;
