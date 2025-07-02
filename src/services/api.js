import axios from "axios";

const api = axios.create({
  baseURL: "http://91.214.190.46:5000", 
});

export default api;
