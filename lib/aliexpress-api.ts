import axios from "axios";

const BASE_URL = "https://ali-express1.p.rapidapi.com";

const RAPID_API_KEY = process.env.ALIREXPRESS_API_KEY!;
const RAPID_API_HOST = "ali-express1.p.rapidapi.com";

// ✅ Create and export the configured Axios instance
export const aliexpressAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY,
    "X-RapidAPI-Host": RAPID_API_HOST,
  },
});
