// frontend/src/api/axios.js
import axios from 'axios';

const getBaseURL = () => {
  // Use environment variable if available, otherwise use current domain
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Fallback: use the same domain as frontend with port 5000 for backend
  const { hostname } = window.location;
  return `http://${hostname}:5000/api`;
};

const instance = axios.create({
  baseURL: getBaseURL(),
});
// This interceptor runs before EVERY request.
// It reads the token from localStorage and adds it to the Authorization header.
instance.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});
export default instance;