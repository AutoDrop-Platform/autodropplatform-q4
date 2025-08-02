import Image from "next/image"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Truck, ShieldCheck } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import AliExpressProductCard from "@/components/aliexpress-product-card"
import ProductPageActions from "@/components/product-page-actions"
import { islamicProducts } from "@/lib/products-data"
import type { Product } from "@/lib/products-data"

async function getProduct(id: string): Promise<Product> {
  const product = islamicProducts.find((p) => p.id === id)
  if (!product) {
    notFound()
  }
  return product
}

async function getRelatedProducts(currentProductId: string, category: string): Promise<Product[]> {
  return islamicProducts.filter((p) => p.id !== currentProductId && p.category === category).slice(0, 4)
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  const relatedProducts = await getRelatedProducts(params.id, product.category)

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image Gallery */}
          <div className="flex flex-col gap-4">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((url, index) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`${product.title} - image ${index + 1}`}
                        width={600}
                        height={600}
                        className="w-full h-auto object-cover aspect-square"
                      />
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Product Information */}
          <div className="flex flex-col gap-4">
            <Badge variant="outline" className="w-fit">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
              </div>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{product.orders.toLocaleString()} orders</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-purple-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.discount && <Badge variant="destructive">-{product.discount}</Badge>}
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <p className="text-green-700 font-semibold">
                  25% of your purchase will be donated to Balsamat Al-Khair charity organization
                </p>
              </CardContent>
            </Card>

            <ProductPageActions product={product} />

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-500" />
                <span>Free Shipping • Est. 5-7 days</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-500" />
                <span>Buyer Protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews.toLocaleString()})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardContent
                  className="p-6 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <ul className="divide-y">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex justify-between py-3">
                        <span className="font-medium text-gray-600">{spec.name}</span>
                        <span className="text-gray-800">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardContent className="p-6 space-y-6">
                  {product.reviewsData.map((review, index) => (
                    <div key={index} className="flex gap-4">
                      <Image
                        src={review.avatar || "/placeholder.svg"}
                        alt={review.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{review.author}</p>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <AliExpressProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
