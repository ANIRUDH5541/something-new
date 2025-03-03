"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import LoginDialog from "./LoginDialog";

export default function Navbar() {
  const pathname = usePathname();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex-1">
          <Link href="/" className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors">
            Something New
          </Link>
        </div>
        
        <div className="flex-1 flex justify-center">
          <Link 
            href="/" 
            className={`text-lg font-medium ${pathname === '/' ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors`}
          >
            Explore
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-end gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowLoginDialog(true)}
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Login</span>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>

      <LoginDialog 
        open={showLoginDialog} 
        onOpenChange={setShowLoginDialog}
      />
    </nav>
  );
}