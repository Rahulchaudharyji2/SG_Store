import React from 'react'
import ProdoctCarousel from '../components/ProductInfoCarousel'
import Products from '../lib/api'
import ProductCard from '../components/ProductCard'


function SoftToys() {
 
  return (
    <>
    <ProdoctCarousel img2='https://res.cloudinary.com/dgooittzu/image/upload/v1758692145/banner_of_soft_toys_2_qa95l7.png'img1='https://res.cloudinary.com/dgooittzu/image/upload/v1758620565/banner_of_soft_toys_1_z8n3zt.png'/>
   <section className="mt-12 flex justify-center px-4 mt-5">
        <div className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner Image */}
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dgooittzu/image/upload/v1758864833/small_banner_1_soft_toy_fjiqld.png"
              alt="Jewellery Banner"
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dgooittzu/image/upload/v1758866664/small_banner_2_soft_toy_be3bko.png"
              alt="Jewellery Banner"
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>

          {/* Promotional Video */}
          
        </div>
      </section>

      <h2 className="section-title">Soft Toys</h2>

      {/* Product Cards */}
      <div className="products-grid">
        {Products.map((element, id) => (
          <ProductCard key={id} product={element} />
        ))}
      </div>
    
    
    </>
  )
}

export default SoftToys