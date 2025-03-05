"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ProductTypes } from "../constants/type";

const ProductContext = createContext<{
  products: ProductTypes[];
  setProducts: (products: ProductTypes[]) => void;
  selectedProduct: ProductTypes | null;
  setSelectedProduct: (product: ProductTypes | null) => void;
}>({
  products: [],
  setProducts: () => {},
  selectedProduct: null,
  setSelectedProduct: () => {},
});

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductTypes | null>(null);

  return (
    <ProductContext.Provider value={{ products, setProducts, selectedProduct, setSelectedProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
