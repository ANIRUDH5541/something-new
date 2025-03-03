"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, RotateCcw, Heart } from "lucide-react";
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
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const existingItemIndex = existingCartItems.findIndex(
      (item: any) => item.id === product.id
    );
    
    if (existingItemIndex >= 0) {
      existingCartItems[existingItemIndex].quantity += quantity;
    } else {
      existingCartItems.push({
        ...product,
        quantity
      });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center text-sm text-amber-700">
          <button onClick={() => router.push('/')} className="hover:text-amber-900">Home</button>
          <span className="mx-2">/</span>
          <span className="text-amber-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-amber-800 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-5 w-5 ${star <= 4 ? 'text-amber-600' : 'text-amber-300'}`} 
                    fill={star <= 4 ? 'currentColor' : 'none'} 
                  />
                ))}
              </div>
              <span className="text-amber-700 ml-2">(24 reviews)</span>
            </div>
            
            <div className="text-3xl font-bold text-amber-800 mb-8">${product.price.toFixed(2)}</div>
            
            <div className="mb-6">
              <h3 className="text-amber-800 font-medium mb-3">Description</h3>
              <p className="text-amber-700">{product.description}</p>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-amber-600 rounded-md">
                <button 
                  className="px-4 py-2 text-amber-700 hover:text-amber-900"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2 text-amber-800">{quantity}</span>
                <button 
                  className="px-4 py-2 text-amber-700 hover:text-amber-900"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <Button 
                className="flex-grow bg-gradient-to-r from-amber-600 to-amber-800"
                size="lg"
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button variant="outline" size="icon" className="border-amber-600 text-amber-700 hover:text-amber-900">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Product Features */}
            <div className="space-y-4 border-t border-amber-600/30 pt-8">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-amber-800 font-medium">Free Shipping</h4>
                  <p className="text-sm text-amber-700">Free standard shipping on orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-amber-800 font-medium">Quality Guarantee</h4>
                  <p className="text-sm text-amber-700">Premium materials and durable construction</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="text-amber-800 font-medium">Easy Returns</h4>
                  <p className="text-sm text-amber-700">30-day return policy for unworn items</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}