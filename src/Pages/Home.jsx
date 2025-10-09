import React from 'react'
import Toggle from '../components/Toggle'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import Products from '../lib/api'
import OurPolicy from '../components/OurPolicy'
import './Home.css' // custom css
import ClientReview from '../components/ClientReview'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <>
      <div className="toggle-container">
        <Toggle />
      </div>

      <Carousel />

      {/* Banner Images */}
      <div className="banner-section">
        <Link to="/flowers">

        <img
          src="https://res.cloudinary.com/dgooittzu/image/upload/v1758000714/flowerrrr_sample_22-removebg-preview_1_ddgjr2.png"
          alt="Flower Banner"
          className="banner-img"
        />
        </Link>
        <Link to="/softtoys">
        <img
          src="https://res.cloudinary.com/dgooittzu/image/upload/v1758693027/banner_img_teddy_wkodxy.png"
          alt="Teddy Banner"
          className="banner-img"
        />
        </Link>
        <Link to="/accessories">
        <img
          src="https://res.cloudinary.com/dgooittzu/image/upload/v1758899888/banner_front_page_small_jewellery_fyusgx.jpg"
          alt="Jewellery Banner"
          className="banner-img"
        />
        </Link>
      <Link to="/photoframe">
        <img
          src="https://res.cloudinary.com/dgooittzu/image/upload/v1758899673/banner_front_page_small_b0lbp1.jpg"
          alt="PhotoFrame"
          className="banner-img"
        />
      </Link>
      </div>

      <h2 className="section-title">Soft Toys</h2>

      {/* Product Cards */}
      <div className="products-grid">
        {Products.map((element, id) => (
          <ProductCard key={id} product={element} />
        ))}
      </div>
      <ClientReview/>
      <OurPolicy/>
      
    </>
  )
}

export default Home
