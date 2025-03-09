"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DM_Sans } from "next/font/google";
import { ProductTypes } from "@/app/constants/type";

const SANSFont = DM_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

interface CartItem extends ProductTypes {
  selectedCount: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      const parsedItems: CartItem[] = JSON.parse(storedItems);
      setCartItems(parsedItems);
    }
    setIsLoaded(true);
  }, []);

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    updateCart(updatedItems);
  };

  const updateSelectedCount = (id: number, newCount: number) => {
    if (newCount < 1) return;
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        if (newCount > item.count) {
          setError(`Only ${item.count} ${item.name} available in stock`);
          return { ...item, selectedCount: item.count };
        }
        return { ...item, selectedCount: newCount };
      }
      return item;
    });
    updateCart(updatedItems);
    setError(null);
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      await response.json();
      setShowSuccessDialog(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during checkout');
    }
  };

  const completeOrder = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
    setShowSuccessDialog(false);
    setError(null);
    router.push('/');
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.selectedCount,
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
    <section className="w-full container mx-auto px-4 py-12">
      <h1 className={`${SANSFont.className} text-4xl font-bold mb-8 text-center text-amber-900`}>
        Your Shopping Cart
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      {cartItems.length === 0 ? (
        <div className="text-center">
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
            onClick={() => router.push('/marketplace')}
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
                    <div className="relative w-36">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover rounded-md h-full"
                        sizes="(max-width: 96px) 100vw, 96px"
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`${SANSFont.className} text-lg font-medium text-amber-900`}>
                            {item.name}
                          </h3>
                          <p className="text-amber-700 text-sm mb-2">${item.price.toFixed(2)}</p>
                          <p className="text-amber-600 text-sm">Available: {item.count}</p>
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

                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => updateSelectedCount(item.id, item.selectedCount - 1)}
                          className="h-8 w-8 hover:bg-amber-100 transition-colors text-amber-800"
                          disabled={item.selectedCount <= 1}
                        >
                          -
                        </Button>
                        <span className="mx-3 w-8 text-center text-amber-900">{item.selectedCount}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => updateSelectedCount(item.id, item.selectedCount + 1)}
                          className="h-8 w-8 hover:bg-amber-100 transition-colors text-amber-800"
                          disabled={item.selectedCount >= item.count}
                        >
                          +
                        </Button>
                        <div className="ml-auto text-right">
                          <span className="text-sm text-amber-700">Total:</span>
                          <p className="text-amber-900 font-medium">
                            ${(item.price * item.selectedCount).toFixed(2)}
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
    </section>
  );
}