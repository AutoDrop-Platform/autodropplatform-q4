const APP_KEY = process.env.ALIEXPRESS_APP_KEY!;
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET!;

export const aliexpressAPI = {
  getCategories: async () => {
    const res = await fetch("https://ali-express1.p.rapidapi.com/categories", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": APP_KEY,
        "X-RapidAPI-Host": "ali-express1.p.rapidapi.com"
      }
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories from AliExpress API");
    }

    return res.json();
  },

  getProductById: async (id: string) => {
    const res = await fetch(`https://ali-express1.p.rapidapi.com/product/${id}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": APP_KEY,
        "X-RapidAPI-Host": "ali-express1.p.rapidapi.com"
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }

    return res.json();
  },

  searchProducts: async (query: string) => {
    const res = await fetch(`https://ali-express1.p.rapidapi.com/search?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": APP_KEY,
        "X-RapidAPI-Host": "ali-express1.p.rapidapi.com"
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to search for products with query: ${query}`);
    }

    return res.json();
  }
};
