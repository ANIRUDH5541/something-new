
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/app/components/LoginForm";
// import { usePathname } from "next/navigation";
// import LoginForm from "@/app/components/LoginForm";

export default function Navbar() {
  // const pathname = usePathname();

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
            className={`text-lg font-medium  hover:text-primary transition-colors`}
          >
            Explore
          </Link>
        </div>

            <LoginForm />
        <div className="flex-1 flex items-center justify-end gap-4">

          <User className="h-5 w-5" />
          <span className="sr-only">
          </span>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}