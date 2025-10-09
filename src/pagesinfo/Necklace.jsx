import React from "react";
import JwelleryCategory from "../components/JwelleryCategory";
import ProdoctCarousel from "../components/ProductInfoCarousel";

function Necklace({props}) {
  const videos = [
    "https://res.cloudinary.com/dgooittzu/video/upload/v1758269394/necklace_video_1_maopoy.mp4",
    "https://res.cloudinary.com/dgooittzu/video/upload/v1758269394/necklace_video_1_maopoy.mp4",
    "https://res.cloudinary.com/dgooittzu/video/upload/v1758269394/necklace_video_1_maopoy.mp4",
  ];

  return (
    <>
    
      {/* Video Section */}
      
      
      <ProdoctCarousel img2="https://res.cloudinary.com/dgooittzu/image/upload/v1758303925/4_adwja4.png" img1="https://res.cloudinary.com/dgooittzu/image/upload/v1758347979/1_dk80af.png"/>
      

      {/* Categories Section */}
      
    
    </>
  );
}

export default Necklace;
