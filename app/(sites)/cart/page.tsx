"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CrochetItem } from "@/lib/data";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import Image from 'next/image';
import { DM_Sans } from "next/font/google";

const SANSFont = DM_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

type CartItem = CrochetItem & {
  quantity: number;
};

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
    setIsLoaded(true);
  }, []);
  
  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };
  
  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    updateCart(updatedItems);
  };
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedItems);
  };
  
  const handleCheckout = () => {
    setShowSuccessDialog(true);
  };
  
  const completeOrder = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
    setShowSuccessDialog(false);
    router.push('/');
  };
  
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  
  if (!isLoaded) {
    return (
      <div className="container mx-auto pt-24 px-4 min-h-screen flex items-center justify-center">
        <p className={`${SANSFont.className} text-xl text-gray-600`}>Loading cart...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto pt-24 px-4 min-h-screen bg-gradient-to-b from-amber-50 to-amber-100/50">
      <Button 
        variant="ghost" 
        onClick={() => router.push('/')}
        className="mb-6 hover:bg-amber-100 transition-colors text-amber-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Button>
      
      <h1 className={`${SANSFont.className} text-4xl font-bold mb-8 text-center text-amber-900`}>
        Your Shopping Cart
      </h1>
      
      {cartItems.length === 0 ? (
  <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
    <div className="w-48 h-48 mx-auto mb-6 relative">
      <img
        src="/img/cart.png"
        alt="Empty Cart"
        className="object-contain"
   
      />
    </div>
          <p className={`${SANSFont.className} text-xl text-amber-700 mb-6`}>
            Your cart is empty
          </p>
          <Button 
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition-all duration-300"
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
          {cartItems.map((item) => (
  <Card key={item.id} className="mb-4 hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover rounded-md"
            sizes="(max-width: 96px) 100vw, 96px"
          />
        </div>

        {/* Product Details */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`${SANSFont.className} text-lg font-medium text-amber-900`}>
                {item.name}
              </h3>
              <p className="text-amber-700 text-sm mb-2">${item.price.toFixed(2)}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => removeItem(item.id)}
              className="hover:text-amber-600 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center mt-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="h-8 w-8 hover:bg-amber-100 transition-colors text-amber-800"
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <span className="mx-3 w-8 text-center text-amber-900">{item.quantity}</span>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="h-8 w-8 hover:bg-amber-100 transition-colors text-amber-800"
            >
              +
            </Button>
            <div className="ml-auto text-right">
              <span className="text-sm text-amber-700">Total:</span>
              <p className="text-amber-900 font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
))}
          </div>
          
          <div>
            <Card className="sticky top-24 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h2 className={`${SANSFont.className} text-2xl font-semibold mb-4 text-amber-900`}>
                  Order Summary
                </h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-amber-800">
                    <span className="text-amber-700">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-800">
                    <span className="text-amber-700">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <Separator className="my-4 bg-amber-200" />
                
                <div className="flex justify-between font-semibold text-amber-900">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition-all duration-300" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className={`${SANSFont.className} flex items-center gap-2 text-amber-900`}>
              <CheckCircle2 className="h-6 w-6 text-amber-500" />
              Order Successfully Placed!
            </DialogTitle>
            <DialogDescription className="text-amber-700">
              A confirmation email will be sent in 10 minutes.
            </DialogDescription>
          </DialogHeader>
          <p className="text-amber-700">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <DialogFooter>
            <Button 
              onClick={completeOrder}
              className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition-all duration-300"
            >
              Continue Shopping
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}