import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Carousel.css'; // Custom CSS for responsiveness

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-wrapper">
      <Carousel activeIndex={index} onSelect={handleSelect} fade>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://res.cloudinary.com/dgooittzu/image/upload/v1758702292/banner_for_front_page_2_uuksfj.png"
            alt="First slide"
          />
        
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://res.cloudinary.com/dgooittzu/image/upload/v1758609471/banner_for_front_page_o4qldz.jpg"
            alt="Second slide"
          />
         
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://res.cloudinary.com/dgooittzu/image/upload/v1758716989/banner_3_front_w2e0it.png"
            alt="Third slide"
          />
        
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
