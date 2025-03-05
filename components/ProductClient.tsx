import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, RotateCcw, Heart, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ProductTypes } from "@/app/constants/type";

interface ProductClientProps {
  product: ProductTypes;
}

export default function EnhancedProductClient({ product }: ProductClientProps) {
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
      className: "bg-green-50 border-green-200 text-green-800"
    });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center text-sm text-amber-700">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center hover:text-amber-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Home
          </button>
          <ChevronRight className="mx-2 h-4 w-4 text-amber-500" />
          <span className="text-amber-800 font-semibold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 overflow-hidden">
          <div className="relative">
            <div className="bg-amber-100 overflow-hidden">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-[600px] object-cover transform transition-transform hover:scale-105"
              />
            </div>
          </div>

          <div className="px-8 pb-6">
            <h1 className="text-4xl font-bold text-amber-900 mb-4 leading-tight">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-6 w-6 ${star <= 4 ? 'text-amber-500' : 'text-amber-200'}`} 
                    fill={star <= 4 ? 'currentColor' : 'none'} 
                  />
                ))}
              </div>
              <span className="text-amber-700 ml-3 text-sm">(24 reviews)</span>
            </div>
            
            {/* Price */}
            <div className="text-4xl font-extrabold text-amber-800 mb-6">
              ${product.price.toFixed(2)}
              <span className="text-sm text-amber-600 ml-2 line-through">
                {(product.price * 1.2).toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-amber-900 font-semibold mb-3">Description</h3>
              <p className="text-amber-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Materials */}
            {product.materials && (
              <div className="mb-6">
                <h3 className="text-amber-900 font-semibold mb-3">Materials</h3>
                <p className="text-amber-700">{product.materials.material}</p>
              </div>
            )}
            
            {/* Quantity and Cart Actions */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-amber-600 rounded-full overflow-hidden">
                  <button 
                    className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-amber-900 font-bold">{quantity}</span>
                  <button 
                    className="px-4 py-2 bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <Button 
                  className="flex-grow bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 transition-all"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-100 hover:text-amber-900 transition-colors"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Product Features */}
            <div className="border-t border-amber-200 pt-6 mt-6 space-y-4">
              <div className="flex items-center gap-4 group">
                <Truck className="h-6 w-6 text-amber-600 group-hover:text-amber-800 transition-colors" />
                <div>
                  <h4 className="text-amber-900 font-semibold group-hover:text-amber-700 transition-colors">
                    Free Shipping
                  </h4>
                  <p className="text-sm text-amber-700">Free standard shipping on orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <Shield className="h-6 w-6 text-amber-600 group-hover:text-amber-800 transition-colors" />
                <div>
                  <h4 className="text-amber-900 font-semibold group-hover:text-amber-700 transition-colors">
                    Quality Guarantee
                  </h4>
                  <p className="text-sm text-amber-700">Premium materials and durable construction</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <RotateCcw className="h-6 w-6 text-amber-600 group-hover:text-amber-800 transition-colors" />
                <div>
                  <h4 className="text-amber-900 font-semibold group-hover:text-amber-700 transition-colors">
                    Easy Returns
                  </h4>
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