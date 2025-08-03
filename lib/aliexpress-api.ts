// lib/aliexpress-api.ts
export const aliexpressAPI = {
  async searchProducts(query: string) {
    const res = await fetch(`https://ali-express1.p.rapidapi.com/search?query=${query}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.ALIEXPRESS_APP_KEY || '',
        'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com',
      },
    });

    const data = await res.json();
    return data;
  },
};
