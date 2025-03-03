"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CrochetItem } from "@/lib/data";

interface ProductClientProps {
  product: CrochetItem;
}

export default function ProductClient({ product }: ProductClientProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Get existing cart items from localStorage
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCartItems.findIndex(
      (item: any) => item.id === product.id
    );
    
    if (existingItemIndex >= 0) {
      // If item exists, increase quantity
      existingCartItems[existingItemIndex].quantity += 1;
    } else {
      // If item doesn't exist, add it with quantity 1
      existingCartItems.push({
        ...product,
        quantity: 1
      });
    }
    
    // Save updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    
    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="container mx-auto pt-24 px-4 min-h-screen">
      <Button 
        variant="ghost" 
        onClick={() => router.push('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-medium text-primary mt-2">${product.price.toFixed(2)}</p>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <p className="text-muted-foreground">{product.details}</p>
          </div>
          
          <Button 
            className="mt-8 w-full"
            size="lg"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}