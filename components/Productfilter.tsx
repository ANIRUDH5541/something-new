'use client'
import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: { price: string; sizes: string[]; availability: boolean }) => void;
}

const ProductFilter = () => {
  const [filters, setFilters] = useState<{
    price: string;
    sizes: string[];
    availability: boolean;
  }>({
    price: '',
    sizes: [],
    availability: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const handlePriceChange = (range: string) => {
    const newFilters = { ...filters, price: range };
    setFilters(newFilters);
    // onFilterChange(newFilters);
  };

  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    
    const newFilters = { ...filters, sizes: newSizes };
    setFilters(newFilters);
    // onFilterChange(newFilters);
  };

  const handleAvailabilityChange = () => {
    const newFilters = { ...filters, availability: !filters.availability };
    setFilters(newFilters);
    // onFilterChange(newFilters);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 sticky top-32 ">
      <div className="flex items-center mb-6">
        <Filter className="h-5 w-5 mr-2 text-rose-400" />
        <h3 className="text-xl font-semibold text-white">Filters</h3>
      </div>

      {/* Price Filter */}
      <div className="mb-6 border-b border-white/10 pb-6">
        <button 
          className="flex items-center justify-between w-full text-left mb-4"
          onClick={() => toggleSection('price')}
        >
          <span className="font-medium text-white">Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-white/60" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/60" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-2">
            {['under50', '50to100', '100to200', 'over200'].map((range) => (
              <label key={range} className="flex items-center">
                <input
                  type="radio"
                  name="price"
                  className="form-radio text-rose-400"
                  checked={filters.price === range}
                  onChange={() => handlePriceChange(range)}
                />
                <span className="ml-2 text-white/80">
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
          <span className="font-medium text-white">Availability</span>
          {expandedSections.availability ? (
            <ChevronUp className="h-4 w-4 text-white/60" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/60" />
          )}
        </button>
        
        {expandedSections.availability && (
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox text-rose-400"
              checked={filters.availability}
              onChange={handleAvailabilityChange}
            />
            <span className="ml-2 text-white/80">In Stock Only</span>
          </label>
        )}
      </div>

      <button 
        className="w-full bg-gradient-to-r from-rose-400 to-pink-600 text-white py-2 rounded-md font-medium hover:opacity-90 transition-opacity"
        onClick={() => {
          setFilters({
            price: '',
            sizes: [],
            availability: false,
          });
          // onFilterChange({
          //   price: '',
          //   sizes: [],
          //   availability: false,
          // });
        }}
      >
        Reset Filters
      </button>
    </div>

    
  );
};

export default ProductFilter;