// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://91.214.190.46:5000", 
});

export default {
  get: (url) => api.get(url),
  post: (url, data) => api.post(url, data),
  put: (url, data) => api.put(url, data),
  delete: (url) => api.delete(url),
};
