export interface Product {
  id: string
  title: string
  imageUrl: string
  price: string
  rating: number
  orders: number
  storeName: string
  productUrl: string
  originalPrice?: string
  discount?: string
  category: string
  availableSizes?: string[]
  availableColors?: string[]
  salePrice: number
  tags?: string[]
}

export interface CartItem extends Product {
  quantity: number
}
