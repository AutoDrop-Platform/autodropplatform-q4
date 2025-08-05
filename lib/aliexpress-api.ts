import axios from 'axios';

const APP_KEY = '517196';
const APP_SECRET = 'BZ4YOIstoyodeOMiMpOxqsJuR7zEDfG';

const instance = axios.create({
  baseURL: 'https://ali-express1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'a03df765b2msh8412e939d9f05bbp1d82c8jsnf9c97eff2a36',
    'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com',
  },
});

export const aliexpressAPI = {
  // جلب تفاصيل المنتج بناءً على ID
  getProductDetails: async (id) => {
    try {
      const res = await instance.get('/product/details', {
        params: { productId: id },
      });
      return res.data;
    } catch (err) {
      console.error('AliExpress getProductDetails error:', err);
      return null;
    }
  },

  // جلب قائمة التصنيفات (تجريبي)
  getCategories: async () => {
    try {
      const res = await instance.get('/categories');
      return res.data;
    } catch (err) {
      console.error('AliExpress getCategories error:', err);
      return [];
    }
  }
};
