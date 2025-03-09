import Image from "next/image";
import CrochetHero from "../components/Try";
import bgImage from '@/public/img/bgimage.png'
export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="absolute max-lg:hidden h-[85vh] w-5/6 overflow-x-hidden bottom-0 right-0">
        <Image
          src={bgImage}
          className="h-full w-[190rem]"
          alt="image"
        />
      </div>
      <CrochetHero />
    </div>
  );
}