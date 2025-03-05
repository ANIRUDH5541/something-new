import HeroSection from "@/app/components/HeroSection";
import ProductList from "@/app/components/ProductList";
import ProductFilter from "@/components/Productfilter";
import { Products } from "../lib/action";

export default async function Home() {
  const response = await Products();
  const data = await response.json();

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <div
        id="products"
        className="min-h-screen flex flex-col bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `url('/img/bg1.jpg')`,
          backgroundSize: "100% 100%",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto pt-12 pb-6 px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Our Collection</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <ProductFilter />
            </div>
            <div className="md:col-span-3">
              <ProductList data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}