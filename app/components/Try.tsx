import Navbar from '@/components/navbar';
import Link from 'next/link';
import React from 'react';

const CrochetHero = () => {
  return (
    <div className='flex flex-col items-center z-10'>
      <div className="text-center max-w-3xl my-16">
        <h1 className="text-5xl font-bold mb-4 leading-tight text-amber-800">
          Handcrafted Crochet<br />Made with Love
        </h1>
        <p className="text-lg text-amber-600 mb-8 max-w-2xl">
          Discover our exquisite collection of handmade crochet treasures, crafted with care for every occasion.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-14">
          <div className="flex -space-x-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <img
                key={index}
                className="w-10 h-10 rounded-full border-2 border-white"
                src={`https://i.pravatar.cc/40?img=${index + 1}`}
                alt={`Crafter ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className="text-amber-500">★</span>
            ))}
          </div>
          <span className="text-amber-700">Loved by 15,000+ crochet enthusiasts</span>
        </div>

        <Link 
        href={"/marketplace"}
          className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition-all duration-300 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-amber-600 hover:shadow-xl"
        >
          Explore Collection →
        </Link>
      </div>
    </div>
  );
};


export default CrochetHero;