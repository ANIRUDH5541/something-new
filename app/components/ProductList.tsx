"use client";

import { crochetItems } from "@/lib/data";
import ProductCard from "./ProductCard";
import { ProductTypes } from "../constants/type";


export default function ProductList({ data }: {data : ProductTypes[]}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}