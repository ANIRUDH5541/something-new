
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginForm from "@/app/components/LoginForm";
// import { usePathname } from "next/navigation";
// import LoginForm from "@/app/components/LoginForm";

export default function Navbar() {
  // const pathname = usePathname();

  return (


    <header className=' flex p-5 items-center justify-between'>
      <Link href={"/"} className='flex items-center gap-2'>
        {/* <Image src={Logo} alt='Logo' className='size-8' /> */}
        <h4 className='text-2xl font-semibold'>Somethin<span className='text-blue-500'>New</span></h4>
      </Link>
      <nav className="hidden md:flex md:justify-end md:space-x-4">
        <LoginForm />
      </nav>
    </header>
  );
}