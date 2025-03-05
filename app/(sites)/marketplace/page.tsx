import ProductList from '@/app/components/ProductList'
import { Products } from '@/app/lib/action';
import Navbar from '@/components/navbar';
import ProductFilter from '@/components/Productfilter'
import React from 'react'

const MarketPlace = async () => {
    const response = await Products();
    const data = await response.json();
    return (
        <div
            id="products"
            className='w-full'
        >
            <div className=" w-full pt-10 pb-6 px-4 relative z-10">
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
    )
}

export default MarketPlace