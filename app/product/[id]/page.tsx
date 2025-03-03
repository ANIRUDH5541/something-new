import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { crochetItems } from "@/lib/data";
import ProductClient from "@/components/ProductClient";

export function generateStaticParams() {
  return crochetItems.map((item) => ({
    id: item.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = crochetItems.find(item => item.id === params.id);
  
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