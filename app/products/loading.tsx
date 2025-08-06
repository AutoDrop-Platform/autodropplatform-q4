import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div>
            <Skeleton className="w-full h-96 rounded-lg" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="w-20 h-20 rounded" />
              <Skeleton className="w-20 h-20 rounded" />
              <Skeleton className="w-20 h-20 rounded" />
              <Skeleton className="w-20 h-20 rounded" />
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <div className="pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-5/6 mt-2" />
            </div>
          </div>
        </div>

        {/* Details Tabs Skeleton */}
        <Card className="mt-12">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
