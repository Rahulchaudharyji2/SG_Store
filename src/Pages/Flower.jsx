import React from 'react'
import ProdoctCarousel from '../components/ProductInfoCarousel'


function Flower() {
 
  return (
    <>
    <ProdoctCarousel img1='https://res.cloudinary.com/dgooittzu/image/upload/v1758774253/flower_banner_1_bhxu1l.png'img2='https://res.cloudinary.com/dgooittzu/image/upload/v1759556558/flowers_Banner_2_uhcu8e.png'/>
   <section className=" flex justify-center px-4 mt-5">
        <div className="w-full max-w-[2800px] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner Image */}
          <div className="flex justify-center items-center">
            <video
              src="https://res.cloudinary.com/dgooittzu/video/upload/v1758884630/small_banner_1_for_flower_woxa8v.mp4"
              autoplay loop muted playsinline
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>

          {/* Promotional Video */}
          <div className="flex justify-center items-center">
            <video
              src="https://res.cloudinary.com/dgooittzu/video/upload/v1758884654/small_banner_2_for_flower_zpqypv.mp4"
               autoplay loop muted playsinline
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>
        </div>
      </section>
    
    </>
  )
}

export default Flower