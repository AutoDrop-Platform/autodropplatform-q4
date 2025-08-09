"use client";

import Image from "next/image";
import Link from "next/link";

interface Seller {
  storeTitle: string;
  storeUrl: string;
  storeImage: string;
  storeAge: number;
}

interface SKUDef {
  price: string;
  promotionPrice: string;
  quantity: number;
  unit: string;
}

interface Product {
  title: string;
  itemUrl: string;
  images: string[];
  available: boolean;
  sku: {
    def: SKUDef;
  };
  seller: Seller;
  delivery: {
    shippingFrom: string;
    shippingTo: string;
    shippingFee: string;
    shippingTime: string;
    estimateDelivery: string;
  };
  service: { title: string; desc: string }[];
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>

      {/* معرض الصور */}
      <div className="flex space-x-4 overflow-x-auto">
        {product.images.map((img, idx) => (
          <Image
            key={idx}
            src={`https:${img}`}
            alt={`${product.title} image ${idx + 1}`}
            width={200}
            height={200}
            className="rounded-lg"
          />
        ))}
      </div>

      {/* السعر والكمية */}
      <div className="text-lg font-semibold">
        السعر: <span className="text-primary">${product.sku.def.price}</span>
        {product.sku.def.promotionPrice && (
          <span className="text-red-600 ml-4 line-through">
            ${product.sku.def.promotionPrice}
          </span>
        )}
        <div>
          الكمية المتاحة: {product.sku.def.quantity} {product.sku.def.unit}
        </div>
      </div>

      {/* التوفر */}
      <div>
        الحالة:{" "}
        {product.available ? (
          <span className="text-green-600 font-semibold">متوفر</span>
        ) : (
          <span className="text-red-600 font-semibold">غير متوفر</span>
        )}
      </div>

      {/* معلومات البائع */}
      <div className="flex items-center space-x-4">
        <Image
          src={`https:${product.seller.storeImage}`}
          alt={`${product.seller.storeTitle} logo`}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <div className="font-semibold">{product.seller.storeTitle}</div>
          <div>عمر المتجر: {product.seller.storeAge} سنة</div>
          <Link
            href={`https:${product.seller.storeUrl}`}
            target="_blank"
            className="text-blue-600 underline"
          >
            زيارة متجر البائع
          </Link>
        </div>
      </div>

      {/* معلومات الشحن */}
      <div>
        <h3 className="font-semibold">الشحن</h3>
        <div>من: {product.delivery.shippingFrom}</div>
        <div>إلى: {product.delivery.shippingTo}</div>
        <div>تكلفة الشحن: ${product.delivery.shippingFee}</div>
        <div>مدة الشحن المتوقعة: {product.delivery.shippingTime} يوم</div>
        <div>موعد التوصيل المتوقع: {product.delivery.estimateDelivery}</div>
      </div>

      {/* حماية المشتري */}
      {product.service.length > 0 && (
        <div>
          <h3 className="font-semibold">خدمات وحماية المشتري</h3>
          {product.service.map((srv, i) => (
            <p key={i}>
              <strong>{srv.title}:</strong> {srv.desc}
            </p>
          ))}
        </div>
      )}

      {/* رابط المنتج الأصلي */}
      <div className="mt-4">
        <Link
          href={`https:${product.itemUrl}`}
          target="_blank"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          عرض المنتج على AliExpress
        </Link>
      </div>
    </div>
  );
}
