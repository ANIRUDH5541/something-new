import LoginForm from "@/app/components/LoginForm";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import UserDropdown from "../app/components/Settings";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User } from "lucide-react";

export const Navbar = async () => {
  const session = await auth();
  
  return (
    <nav className="w-full max-w-6xl mx-auto z-50 px-4 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-amber-800">Crochet</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize">
            Home
          </Link>
          <Link href="/marketplace" className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize">
            Marketplace
          </Link>
          <Link href="/cart" className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize">
            Cart
          </Link>
          <Link href="/contact" className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <UserDropdown username={session.user?.name} image={session?.user?.image} />
              {session.user?.role === "admin" && (
                <span className="text-amber-700 font-medium">Admin</span>
              )}
            </div>
          ) : (
            <LoginForm />
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-amber-700" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-white">
            <div className="flex flex-col space-y-6 mt-6">
              <Link 
                href="/" 
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize"
              >
                Home
              </Link>
              <Link 
                href="/marketplace" 
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize"
              >
                Marketplace
              </Link>
              <Link 
                href="/cart" 
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize"
              >
                Cart
              </Link>
              <Link 
                href="/contact" 
                className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize"
              >
                Contact
              </Link>

              {session ? (
                <div className="flex flex-col space-y-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-amber-700" />
                    <span className="text-amber-700">{session.user?.name}</span>
                  </div>
                  {session.user?.role === "admin" && (
                    <span className="text-amber-700 font-medium pl-7">Admin</span>
                  )}
                  <UserDropdown username={session.user?.name} />
                </div>
              ) : (
                <div className="pt-4 border-t">
                  <LoginForm />
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export default Navbar;