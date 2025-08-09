import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ali-express1.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'a03df765b2msh8412e939d9f05bbp1d82c8jsnf9c97eff2a36',
    'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com',
  },
});

const aliexpressAPI = {
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
  }
};

export default aliexpressAPI;
