
import LoginForm from "@/app/components/LoginForm";
import { auth, signOut } from "@/app/lib/auth";
import { MessageSquare, User } from "lucide-react";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();
  console.log(session)
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
      {/* <form action={async () => {
        "use server";
        await signOut();
      }} className='w-full text-black'>
        <button className='w-full text-left'>Log out</button>
      </form> */}
      <div className="flex space-x-4">
        {session ? (
          <div className="flex items-center space-x-2">
            <User className="text-amber-700 hover:text-amber-900 cursor-pointer w-6 h-6" />
            {session.user?.role === 'admin' && (
              <MessageSquare className="text-amber-700 hover:text-amber-900 cursor-pointer w-6 h-6" />
            )}
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </nav>
  );
}

export default Navbar;