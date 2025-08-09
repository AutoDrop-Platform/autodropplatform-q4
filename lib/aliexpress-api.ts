import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ali-express1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com',
  },
});

export const aliexpressAPI = {
  getProductDetails: async (productId: string) => {
    try {
      const response = await instance.get('/product/details', {
        params: { productId }
      });
      return response.data;
    } catch (error) {
      console.error('getProductDetails error:', error);
      return null;
    }
  },

  getCategories: async () => {
    try {
      const response = await instance.get('/categories');
      return response.data;
    } catch (error) {
      console.error('getCategories error:', error);
      return [];
    }
  },

  validateProductIds: async (productIds: string[]) => {
    // تحقق من المنتجات عبر البحث أو أي منطق مناسب
    // هنا نعيد كل المعرفات كما هي (يمكنك تخصيصها لاحقاً)
    return productIds;
  }
};
