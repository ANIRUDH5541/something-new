"use client"
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { crochetItems } from "@/lib/data";
import { Heart } from "lucide-react";
import ProductFilter from "@/components/Productfilter";

export default function Home() {
  function setFilters(filters: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Video Section */}
      <div className="relative h-[100vh] w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/vid/herovid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
            Handcrafted with Love
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-2xl">
            Discover our collection of beautiful handmade crochet items
          </p>
          <a
            href="#products"
            className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Explore Collection
          </a>
        </div>
      </div>

      {/* Products Section with Filters */}
      
      <div 
        id="products"
        className="min-h-screen flex flex-col bg-cover bg-center bg-fixed relative"
        style={{ 
          backgroundImage: `url('/img/bg1.jpg')`,
          backgroundSize: '100% 100%',
          backgroundColor: '#f5f5f5'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto pt-12 pb-6 px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Our Collection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="md:col-span-1">
              <ProductFilter onFilterChange={setFilters} />
            </div>

            {/* Products Grid */}
            <div className="md:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {crochetItems.map((item) => (
                  <Link href={`/product/${item.id}`} key={item.id} className="block">
                    <Card className="h-full overflow-hidden shadow-lg transition-all duration-300 hover:translate-y-[-5px] cursor-pointer max-w-[260px] mx-auto">
                      <div className="relative">
                        <div className="aspect-square w-full overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </div>
                      <CardContent className="pt-1.5 px-3">
                        <h2 className="text-lg font-semibold hover:underline truncate">{item.name}</h2>
                        <p className="text-muted-foreground mt-0.5 text-sm line-clamp-2">{item.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center px-3 py-1.5">
                        <span className="text-base font-medium">${item.price.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground">View Details</span>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}