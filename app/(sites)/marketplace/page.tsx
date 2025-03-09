import ProductList from '@/app/components/ProductList'
import { Products } from '@/app/lib/action';
import Navbar from '@/components/navbar';
import ProductFilter from '@/components/Productfilter'

const MarketPlace = async () => {
    const response = await Products();
    const data = await response.json();
    
    return (
        <div id="products" className="w-full min-h-screen">
            <div className="w-full max-w-7xl mx-auto pt-10 pb-6 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
                    <div className="hidden lg:block lg:col-span-1">
                        <ProductFilter />
                    </div>
                    <div className="lg:col-span-3">
                        <ProductList data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketPlace