 
//new code below

import React, { useState, useEffect } from 'react';
import Title from './Title';

const ClientReview = () => {
  const reviews = [
    {
      image: "https://github.com/Rahulchaudharyji2/E-COM/blob/main/frontend/src/assets/review_image1.jpg?raw=true",
      name: "Sushmita",
      review: "Amazing experience! Got the parcel. Products are all good. Thank you.",
    },
    {
      image:"https://github.com/Rahulchaudharyji2/E-COM/blob/main/frontend/src/assets/review_image2.jpg?raw=true",
      name: "Bhoomi Panchal",
      review: "I received the parcel. Nice quality. Thank you.",
    },
    {
      image: "https://github.com/Rahulchaudharyji2/E-COM/blob/main/frontend/src/assets/review_image3.jpg?raw=true",
      name: "Harshini",
      review: "Quality is good as always. Thank you for the free sticker.",
    },
    {
      image: "https://github.com/Rahulchaudharyji2/E-COM/blob/main/frontend/src/assets/review_image4.jpg?raw=true",
      name: "Priya",
      review: "Great service and quality!",
    },
  
    // ... more reviews
  ];

  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  const getCurrentReviews = () => {
    const screenWidth = window.innerWidth;
    const reviewsPerPage = screenWidth < 640 ? 1 : 3; // 1 card for small devices, 3 for larger devices
    return reviews.slice(currentReviewIndex, currentReviewIndex + reviewsPerPage);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <div className='text-center text-3xl py-8'>
          <Title text1={'WHAT OUR'} text2={'CLIENTS SAY'} />
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Hear from our satisfied customers who have experienced our top-notch services and products.
          </p>
        </div>

        <div className="relative">
          <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6 transition-opacity duration-1000 ease-in-out">
            {getCurrentReviews().map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 sm:p-8 w-full sm:max-w-xs h-64 flex flex-col justify-between fade-in">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg sm:text-xl font-medium text-center mb-2">{review.name}</h3>
                <p className="text-gray-700 text-center">"{review.review}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Review Set Indicator */}
        <div className="flex justify-center mt-8">
          {reviews.map((_, index) => (
            <span
              key={index}
              className={`mx-1 w-3 h-3 rounded-full cursor-pointer ${index === currentReviewIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => setCurrentReviewIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReview;




 