import React from 'react'
import ProdoctCarousel from '../components/ProductInfoCarousel'


function PhotoFrame() {
 
  return (
    <>
    <ProdoctCarousel img1='https://res.cloudinary.com/dgooittzu/image/upload/v1758731875/photo_frame_banner_1_iccpvh.png'img2='https://res.cloudinary.com/dgooittzu/image/upload/v1758773279/photo_frame_banner_2_uakhv2.png'/>
   
   <section className="mt-12 flex justify-center px-4 mt-5">
        <div className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner Image */}
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dgooittzu/image/upload/v1758827378/small_banner_1_photo_frame_doc57n.png"
              alt="Jewellery Banner"
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dgooittzu/image/upload/v1758866777/small_banner_2_photo_frame_czbtio.png"
              alt="Jewellery Banner"
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>

          {/* Promotional Video */}
          
        </div>
      </section>
    
    </>
  )
}

export default PhotoFrame