import React from 'react'
import ProdoctCarousel from '../components/ProductInfoCarousel';
import products from '../lib/braceletApi';
import ProductCard from '../components/ProductCard';

function BraceltWatch() {
  return (
    <>
        <ProdoctCarousel img2="https://res.cloudinary.com/dgooittzu/image/upload/v1758303967/6_blb4sw.png" img1="https://res.cloudinary.com/dgooittzu/image/upload/v1758348106/6_pj2gli.png"/>
 <div style={{ display: "flex", flexWrap: "wrap", margin: "12px" }}>
        {products.map((element, id) => (
          <ProductCard product={element} />
        ))}
      </div>
    </>
  )
}

export default BraceltWatch