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
            src="https://res.cloudinary.com/dgooittzu/image/upload/v1757567030/WhatsApp_Image_2025-09-09_at_12.22.39_PM_pn9yk2.jpg"
            alt="First slide"
          />
        
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://res.cloudinary.com/dgooittzu/image/upload/v1757581963/WhatsApp_Image_2025-09-11_at_2.40.02_PM_c26uh5.jpg"
            alt="Second slide"
          />
         
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://res.cloudinary.com/dgooittzu/image/upload/v1770284790/bannerrrrr_dsjt02.png"
            alt="Third slide"
          />
        
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
