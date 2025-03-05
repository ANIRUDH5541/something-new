"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useProducts } from "../lib/context";

export default function ProductCard({ item }: { item: any }) {
  const { setSelectedProduct } = useProducts();

  return (
    <Link
      href={`/product/${item.id}`}
      className="block"
      onClick={() => setSelectedProduct(item)}
    >
      <Card className="h-full overflow-hidden shadow-lg transition-all duration-300 hover:translate-y-[-5px] cursor-pointer max-w-[260px] mx-auto">
        <div className="relative">
          <div className="aspect-square w-full border ">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute -bottom-4 left-[35%] ">
              <button className="flex items-center justify-center bg-amber-800 text-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 px-4">
                <span className="text-base font-medium">${item.price.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
        <CardContent className="pt-5 px-3">
          <h2 className="text-lg font-semibold hover:underline truncate">{item.name}</h2>
          <p className="text-muted-foreground mt-0.5 text-sm line-clamp-2">{item.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center px-3 py-1.5">
          <span className="text-xs text-muted-foreground">View Details</span>
        </CardFooter>
      </Card>
    </Link>
  );
}