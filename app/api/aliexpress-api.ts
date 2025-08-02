// lib/aliexpress-api.ts
import axios from "axios";

const APP_KEY = process.env.ALIEXPRESS_APP_KEY;
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET;
const API_URL = "https://api-sg.aliexpress.com/sync";

export async function aliexpressAPI(endpoint: string, params: Record<string, any> = {}) {
  if (!APP_KEY || !APP_SECRET) {
    throw new Error("AliExpress API credentials are missing");
  }

  const requestBody = {
    app_key: APP_KEY,
    app_secret: APP_SECRET,
    ...params,
  };

  const response = await axios.post(`${API_URL}${endpoint}`, requestBody, {
    headers: { "Content-Type": "application/json" },
  });

  return response.data;
}
