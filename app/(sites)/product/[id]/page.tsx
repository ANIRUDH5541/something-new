'use client';

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductClient from "@/components/ProductClient";
import { useParams } from "next/navigation";
import { useProducts } from "@/app/lib/context";

export default function ProductPage() {
  const { id } = useParams();
  const { products, selectedProduct } = useProducts();

  let product = selectedProduct;

  if (!product) {
    product = products.find((item) => item.id === Number(id)) || null; 
  }

  if (!product) {
    return (
      <div className="container mx-auto pt-24 px-4 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <a href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Button>
      </div>
    );
  }

  return <ProductClient product={product} />;
}
