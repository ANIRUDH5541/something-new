
import LoginForm from "@/app/components/LoginForm";
import Link from "next/link";

export default function Navbar() {

  return (
    <nav className="w-full max-w-6xl flex flex-col mx-auto sm:flex-row justify-between z-50 items-center mb-8">
      <Link href={"/"} className="flex items-center space-x-2 mb-2 sm:mb-0">
        <span className="text-2xl font-bold text-amber-800">Crochet</span>
      </Link>
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6">
      <Link href="/" className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize">Home</Link>
        <Link href="/marketplace" className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize">marketplace</Link>
        <Link href="/cart" className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize">cart</Link>
        <Link href="/contact" className="text-amber-700 hover:text-amber-900 font-medium transition-colors capitalize">contact</Link>
      </div>
      <div className="flex space-x-4">
        <LoginForm />
      </div>
    </nav>
  );
}