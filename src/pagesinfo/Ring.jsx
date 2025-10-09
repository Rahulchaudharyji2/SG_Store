import React from 'react'
import ProdoctCarousel from '../components/ProductInfoCarousel';
import ringApi from '../lib/ringApi';
import ProductCard from '../components/ProductCard';

function Ring() {
  
  return (
    <>
      {/* Video Section */}
      <ProdoctCarousel img1="https://res.cloudinary.com/dgooittzu/image/upload/v1758348090/5_alepwe.png" img2="https://res.cloudinary.com/dgooittzu/image/upload/v1758303836/1_hlbfaf.png"/>
    <div style={{ display: "flex", flexWrap: "wrap", margin: "12px" }}>
        {ringApi.map((element, id) => (
          <ProductCard product={element} />
        ))}
      </div>
    </>
  );
}

export default Ring