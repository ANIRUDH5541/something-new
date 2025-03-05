"use client";

export default function HeroSection() {
  return (
    <div className="relative h-[100vh] w-full overflow-hidden">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/vid/herovid.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">Handcrafted with Love</h1>
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
  );
}
