// /app/api/products/alibaba.js

import { NextResponse } from 'next/server';
import axios from 'axios';

const keywords = [
  'electronics',
  'women clothing',
  'men fashion',
  'kids toys',
  'home decor',
  'ai gadgets',
  'islamic products',
  'jewelry',
  'smartphones',
  'laptops',
  'electronic gadgets'
];

export async function GET() {
  const allResults = {};

  try {
    for (const keyword of keywords) {
      const response = await axios.get('https://alibaba-data-scraper.p.rapidapi.com/products/search', {
        params: {
          query: keyword,
          page: '1',
          country: 'US'
        },
        headers: {
          'X-RapidAPI-Key': 'a03df765b2msh8412e939d9f05bbp1d82c8jsnf9c97eff2a36',
          'X-RapidAPI-Host': 'alibaba-data-scraper.p.rapidapi.com'
        }
      });

      allResults[keyword] = response.data;
    }

    return NextResponse.json({
      success: true,
      products: allResults
    });

  } catch (error) {
    console.error('[Alibaba API Error]', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch one or more product categories.',
      error
    }, { status: 500 });
  }
}
