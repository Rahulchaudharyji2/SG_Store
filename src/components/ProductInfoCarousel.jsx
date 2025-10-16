import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ProdoctCarousel({ img1, img2 }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  return (
    <div className="carousel-container">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {[img1, img2].map((img, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100 carousel-img"
              src={img}
              alt={`Slide ${idx + 1}`}
            />
            <Carousel.Caption>
             
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <style jsx="true">{`
        .carousel-container {
          margin: 20px auto;
          padding: 0 10px;
          max-width: 1200px;
        }

        .carousel-img {
          height: 80vh;
          width: 100%;
          object-fit: contain;
          border-radius: 30px;
          border: 2px solid #A2AF9B;
          transition: transform 0.3s ease-in-out;
          background-color: #f8f8f8;
        }

        .carousel-img:hover {
          transform: scale(1.02);
        }

        .carousel-caption {
          bottom: 12%;
        }

        .shop-button {
          background: linear-gradient(135deg, #EBCB90, #D4A373, #F5DEB3);
          border: none;
          color: #2c2c2c;
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 35px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 6px 16px #A2AF9B;
        }

        .shop-button:hover {
          background: linear-gradient(135deg, #D4A373, #EBCB90, #F5DEB3);
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .carousel-img { height: 60vh; border-radius: 25px; }
          .shop-button { padding: 10px 24px; font-size: 0.9rem; border-radius: 28px; }
        }

        @media (max-width: 768px) {
          .carousel-img { height: 45vh; border-radius: 20px; }
          .shop-button { padding: 8px 20px; font-size: 0.8rem; border-radius: 22px; }
        }

        @media (max-width: 480px) {
          .carousel-img { height: 35vh; border-radius: 15px; }
          .shop-button { padding: 6px 16px; font-size: 0.6rem; border-radius: 18px; }
        }
      `}</style>
    </div>
  );
}

export default ProdoctCarousel;
