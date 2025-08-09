import ProductDetails from "@/components/ProductDetails";

interface PageProps {
  params: { id: string };
}

async function fetchProduct(id: string) {
  const res = await fetch(
    `/api/aliexpress/product/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product data");
  }

  const data = await res.json();
  return data.result.item;
}

export default async function ProductPage({ params }: PageProps) {
  const product = await fetchProduct(params.id);

  return <ProductDetails product={product} />;
}
