import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // main backend URL
});

export default api;
