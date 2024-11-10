import axios from "axios";
export const baseURL = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  headers: {
    Authorization: "Bearer " + `${import.meta.env.VITE_AUTH_TOKEN}`,
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
});
