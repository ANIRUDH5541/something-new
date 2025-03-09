// ProductFilter.tsx
'use client';
import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

// Define filter interface
interface Filters {
  price: string;
  sizes: string[];
  availability: boolean;
}

// Define expanded sections interface
interface ExpandedSections {
  price: boolean;
  size: boolean;
  availability: boolean;
}

const ProductFilter = () => {
  const [filters, setFilters] = useState<Filters>({
    price: '',
    sizes: [],
    availability: false,
  });

  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    price: true,
    size: true,
    availability: true,
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handlePriceChange = (range: string) => {
    setFilters({ ...filters, price: range });
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    setFilters({ ...filters, sizes: newSizes });
  };

  const handleAvailabilityChange = () => {
    setFilters({ ...filters, availability: !filters.availability });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Filter */}
      <div className="border-b border-white/10 pb-6">
        <button
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('price')}
        >
          <span className="font-medium text-gray-900">Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-3">
            {(['under50', '50to100', '100to200', 'over200'] as const).map((range) => (
              <label key={range} className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  className="form-radio text-rose-400 h-4 w-4"
                  checked={filters.price === range}
                  onChange={() => handlePriceChange(range)}
                />
                <span className="ml-2 text-gray-700 text-sm">
                  {range === 'under50' && 'Under $50'}
                  {range === '50to100' && '$50 - $100'}
                  {range === '100to200' && '$100 - $200'}
                  {range === 'over200' && 'Over $200'}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="mb-6">
        <button
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('availability')}
        >
          <span className="font-medium text-gray-900">Availability</span>
          {expandedSections.availability ? (
            <ChevronUp className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-600" />
          )}
        </button>
        
        {expandedSections.availability && (
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-rose-400 h-4 w-4"
              checked={filters.availability}
              onChange={handleAvailabilityChange}
            />
            <span className="ml-2 text-gray-700 text-sm">In Stock Only</span>
          </label>
        )}
      </div>

      {/* Reset Button */}
      <button
        className="w-full bg-gradient-to-r text-white from-rose-400 to-pink-600 py-2 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
        onClick={() => setFilters({ price: '', sizes: [], availability: false })}
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 sticky top-32">
        <div className="flex items-center mb-6">
          <Filter className="h-5 w-5 mr-2 text-rose-400" />
          <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter - Sheet */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-rose-400 hover:bg-rose-500 text-white rounded-full p-3">
              <Filter className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
            <div className="flex items-center mb-6">
              <Filter className="h-5 w-5 mr-2 text-rose-400" />
              <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
            </div>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ProductFilter;