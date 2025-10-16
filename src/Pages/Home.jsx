import React from 'react'
import Toggle from '../components/Toggle'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import OurPolicy from '../components/OurPolicy'
import './Home.css' // custom css
import ClientReview from '../components/ClientReview'
import { Link } from 'react-router-dom'

// Fetch ALL products directly from backend: GET https://sg-backend-iota.vercel.app/products
// Ensure productsApi exports useGetAllProductsQuery
import { useGetAllProductsQuery } from '../features/products/productsApi'

function Home() {
  // Exact endpoint call (no params)
  const { data, isLoading, isFetching, error, refetch } = useGetAllProductsQuery()

  // Support both response shapes: array OR { products: [...] }
  const products = Array.isArray(data) ? data : (data?.products || [])

  // Show a limited set initially for a clean, sleek look
  const INITIAL_VISIBLE = 8
  const [visible, setVisible] = React.useState(INITIAL_VISIBLE)
  const toShow = products.slice(0, visible)
  const canLoadMore = visible < products.length

  return (
    <>
      <div className="toggle-container">
        <Toggle />
      </div>

      <Carousel />

      {/* Banner Images */}
      <div className="banner-section">
          <img
            src="https://res.cloudinary.com/dgooittzu/image/upload/v1758000714/flowerrrr_sample_22-removebg-preview_1_ddgjr2.png"
            alt="Flower Banner"
            className="banner-img"
          />
        
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
        
      </div>

      {/* Keep your existing heading exactly as-is */}
      <h2 className="section-title">Soft Toys</h2>

      {/* Product section with subtle spacing and limited items initially */}
      <div className="home-products">
        <div className="products-grid products-grid--home">
          {(isLoading || isFetching) && products.length === 0
            ? Array.from({ length: INITIAL_VISIBLE }).map((_, i) => (
                <div className="product-skeleton" key={i} />
              ))
            : error
            ? (
              <div className="error-box" style={{ gridColumn: '1 / -1' }}>
                <p>{error?.data?.message || 'Failed to load products.'}</p>
                <button className="retry-btn" onClick={() => {
                  setVisible(INITIAL_VISIBLE)
                  refetch()
                }}>
                  Retry
                </button>
              </div>
            )
            : toShow.map((element, id) => (
                <ProductCard
                  key={element?._id || element?.id || id}
                  product={element}
                />
              ))}
        </div>

        {canLoadMore && !isLoading && !error && (
          <div className="home-load-more">
            <button
              className="load-more-btn"
              onClick={() => setVisible((v) => v + INITIAL_VISIBLE)}
              disabled={isFetching}
            >
              {isFetching ? 'Loading...' : 'Load more'}
            </button>
          </div>
        )}
      </div>

      <ClientReview />
      <OurPolicy />

      {/* Skeleton shimmer (keeps your UI intact, only enhances placeholders) */}
      <style>
        {`
          @keyframes shine {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
    </>
  )
}

export default Home