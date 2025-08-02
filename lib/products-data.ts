export interface Product {
  id: string
  title: string
  price: number
  originalPrice: number
  discount: string
  image: string
  images: string[]
  rating: number
  reviews: number
  orders: number
  category: string
  description: string
  specifications: Array<{ name: string; value: string }>
  reviewsData: Array<{
    author: string
    rating: number
    date: string
    text: string
    avatar: string
  }>
  seller: {
    name: string
    rating: number
  }
}

export const islamicProducts: Product[] = [
  {
    id: "abaya-001",
    title: "Premium Black Abaya with Gold Embroidery",
    price: 89.99,
    originalPrice: 129.99,
    discount: "31%",
    image: "/placeholder.svg?height=400&width=400&text=Premium+Black+Abaya",
    images: [
      "/placeholder.svg?height=600&width=600&text=Premium+Black+Abaya+Front",
      "/placeholder.svg?height=600&width=600&text=Premium+Black+Abaya+Back",
      "/placeholder.svg?height=600&width=600&text=Premium+Black+Abaya+Detail",
    ],
    rating: 4.8,
    reviews: 1247,
    orders: 3421,
    category: "Women's Islamic Clothing",
    description: `
      <h3>Elegant Premium Black Abaya</h3>
      <p>This stunning black abaya features intricate gold embroidery and is perfect for both daily wear and special occasions. Made from high-quality fabric that drapes beautifully and provides comfort throughout the day.</p>
      
      <h4>Features:</h4>
      <ul>
        <li>Premium quality fabric</li>
        <li>Beautiful gold embroidery details</li>
        <li>Comfortable loose fit</li>
        <li>Available in multiple sizes</li>
        <li>Easy care instructions</li>
      </ul>
      
      <p><strong>Note:</strong> 25% of your purchase will be donated to Balsamat Al-Khair charity organization to support those in need.</p>
    `,
    specifications: [
      { name: "Material", value: "Premium Polyester Blend" },
      { name: "Color", value: "Black with Gold Embroidery" },
      { name: "Sizes Available", value: "S, M, L, XL, XXL" },
      { name: "Care Instructions", value: "Machine wash cold, hang dry" },
      { name: "Origin", value: "Made in UAE" },
    ],
    reviewsData: [
      {
        author: "Fatima Al-Zahra",
        rating: 5,
        date: "2024-01-15",
        text: "Beautiful abaya with excellent quality. The embroidery is stunning and the fit is perfect. Highly recommended!",
        avatar: "/placeholder.svg?height=40&width=40&text=F",
      },
      {
        author: "Aisha Mohammed",
        rating: 5,
        date: "2024-01-10",
        text: "Love this abaya! The fabric is so comfortable and the design is elegant. Perfect for special occasions.",
        avatar: "/placeholder.svg?height=40&width=40&text=A",
      },
      {
        author: "Khadija Hassan",
        rating: 4,
        date: "2024-01-05",
        text: "Good quality abaya. The gold embroidery adds a nice touch. Delivery was fast too.",
        avatar: "/placeholder.svg?height=40&width=40&text=K",
      },
    ],
    seller: {
      name: "Islamic Fashion House",
      rating: 4.9,
    },
  },
  {
    id: "hijab-collection-001",
    title: "Luxury Silk Hijab Collection (5 Pack)",
    price: 49.99,
    originalPrice: 79.99,
    discount: "38%",
    image: "/placeholder.svg?height=400&width=400&text=Luxury+Silk+Hijab+Collection",
    images: [
      "/placeholder.svg?height=600&width=600&text=Silk+Hijab+Collection+Set",
      "/placeholder.svg?height=600&width=600&text=Silk+Hijab+Colors",
      "/placeholder.svg?height=600&width=600&text=Silk+Hijab+Quality",
    ],
    rating: 4.7,
    reviews: 892,
    orders: 2156,
    category: "Hijabs & Scarves",
    description: `
      <h3>Premium Silk Hijab Collection</h3>
      <p>This luxurious collection includes 5 beautiful silk hijabs in complementary colors. Each hijab is made from high-quality silk that feels soft against the skin and drapes elegantly.</p>
      
      <h4>What's Included:</h4>
      <ul>
        <li>5 premium silk hijabs</li>
        <li>Multiple color combinations available</li>
        <li>Elegant gift packaging</li>
        <li>Care instruction card</li>
      </ul>
      
      <p><strong>Charity Impact:</strong> 25% of your purchase supports Balsamat Al-Khair's education programs for underprivileged children.</p>
    `,
    specifications: [
      { name: "Material", value: "100% Pure Silk" },
      { name: "Size", value: "70cm x 180cm each" },
      { name: "Colors", value: "5 coordinated colors per set" },
      { name: "Care", value: "Hand wash or dry clean" },
      { name: "Packaging", value: "Premium gift box included" },
    ],
    reviewsData: [
      {
        author: "Mariam Abdullah",
        rating: 5,
        date: "2024-01-20",
        text: "Absolutely love these hijabs! The silk quality is amazing and the colors are beautiful. Great value for money.",
        avatar: "/placeholder.svg?height=40&width=40&text=M",
      },
      {
        author: "Zainab Ali",
        rating: 5,
        date: "2024-01-18",
        text: "Perfect hijabs for special occasions. The silk feels luxurious and they stay in place all day.",
        avatar: "/placeholder.svg?height=40&width=40&text=Z",
      },
    ],
    seller: {
      name: "Silk & Modesty",
      rating: 4.8,
    },
  },
  {
    id: "thobe-001",
    title: "Men's Traditional White Thobe",
    price: 69.99,
    originalPrice: 99.99,
    discount: "30%",
    image: "/placeholder.svg?height=400&width=400&text=Traditional+White+Thobe",
    images: [
      "/placeholder.svg?height=600&width=600&text=White+Thobe+Front",
      "/placeholder.svg?height=600&width=600&text=White+Thobe+Side",
      "/placeholder.svg?height=600&width=600&text=White+Thobe+Detail",
    ],
    rating: 4.6,
    reviews: 654,
    orders: 1876,
    category: "Men's Islamic Clothing",
    description: `
      <h3>Classic Traditional White Thobe</h3>
      <p>This elegant white thobe is perfect for prayers, formal events, and daily wear. Made from premium cotton fabric that's breathable and comfortable in all weather conditions.</p>
      
      <h4>Perfect For:</h4>
      <ul>
        <li>Daily prayers and mosque visits</li>
        <li>Formal Islamic events</li>
        <li>Eid celebrations</li>
        <li>Comfortable daily wear</li>
      </ul>
      
      <p><strong>Giving Back:</strong> Your purchase helps fund clean water projects through our charity partner Balsamat Al-Khair.</p>
    `,
    specifications: [
      { name: "Material", value: "100% Premium Cotton" },
      { name: "Color", value: "Pure White" },
      { name: "Sizes", value: "S to 3XL available" },
      { name: "Length", value: "Full length (ankle)" },
      { name: "Style", value: "Traditional Saudi cut" },
    ],
    reviewsData: [
      {
        author: "Ahmed Hassan",
        rating: 5,
        date: "2024-01-22",
        text: "Excellent quality thobe. The fabric is comfortable and the fit is perfect. Great for mosque and formal events.",
        avatar: "/placeholder.svg?height=40&width=40&text=A",
      },
      {
        author: "Omar Al-Rashid",
        rating: 4,
        date: "2024-01-19",
        text: "Good quality and comfortable. The white color is pure and doesn't fade after washing.",
        avatar: "/placeholder.svg?height=40&width=40&text=O",
      },
    ],
    seller: {
      name: "Traditional Menswear",
      rating: 4.7,
    },
  },
  {
    id: "prayer-mat-001",
    title: "Portable Prayer Mat with Qibla Compass",
    price: 34.99,
    originalPrice: 49.99,
    discount: "30%",
    image: "/placeholder.svg?height=400&width=400&text=Prayer+Mat+with+Compass",
    images: [
      "/placeholder.svg?height=600&width=600&text=Prayer+Mat+Open",
      "/placeholder.svg?height=600&width=600&text=Prayer+Mat+Compass",
      "/placeholder.svg?height=600&width=600&text=Prayer+Mat+Folded",
    ],
    rating: 4.9,
    reviews: 1543,
    orders: 4287,
    category: "Prayer Accessories",
    description: `
      <h3>Premium Portable Prayer Mat</h3>
      <p>This innovative prayer mat features a built-in Qibla compass to help you find the direction of Mecca anywhere in the world. Perfect for travel, work, or home use.</p>
      
      <h4>Key Features:</h4>
      <ul>
        <li>Built-in Qibla compass</li>
        <li>Waterproof and easy to clean</li>
        <li>Folds compactly for travel</li>
        <li>Beautiful Islamic patterns</li>
        <li>Non-slip backing</li>
      </ul>
      
      <p><strong>Community Impact:</strong> 25% of proceeds support mosque construction projects worldwide through Balsamat Al-Khair.</p>
    `,
    specifications: [
      { name: "Material", value: "Waterproof fabric with foam padding" },
      { name: "Size", value: "110cm x 70cm when open" },
      { name: "Folded Size", value: "25cm x 20cm x 3cm" },
      { name: "Weight", value: "450g" },
      { name: "Compass", value: "Built-in Qibla direction finder" },
    ],
    reviewsData: [
      {
        author: "Ibrahim Malik",
        rating: 5,
        date: "2024-01-25",
        text: "Amazing prayer mat! The compass is very helpful when traveling. High quality and folds up nicely. Highly recommend for frequent travelers.",
        avatar: "/placeholder.svg?height=40&width=40&text=I",
      },
      {
        author: "Yusuf Ahmed",
        rating: 5,
        date: "2024-01-23",
        text: "Perfect for business trips. The mat is comfortable and the compass is accurate. Highly recommended!",
        avatar: "/placeholder.svg?height=40&width=40&text=Y",
      },
    ],
    seller: {
      name: "Prayer Essentials",
      rating: 4.9,
    },
  },
]

// Export specific product collections
export const featuredProducts = islamicProducts.slice(0, 4)
export const trendingProducts = islamicProducts.sort((a, b) => b.reviews - a.reviews).slice(0, 6)
export const topRatedProducts = islamicProducts.sort((a, b) => b.rating - a.rating).slice(0, 6)

export const getProductById = (id: string): Product | undefined => {
  return islamicProducts.find((product) => product.id === id)
}

export const getProductsByCategory = (category: string): Product[] => {
  return islamicProducts.filter((product) => product.category === category)
}

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase()
  return islamicProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}
