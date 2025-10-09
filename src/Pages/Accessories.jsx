import React from "react";
import JwelleryCategory from "../components/JwelleryCategory";

function Accessories() {
  const productVideos = [
    "https://res.cloudinary.com/dgooittzu/video/upload/v1758269394/necklace_video_1_maopoy.mp4",
    "https://res.cloudinary.com/dgooittzu/video/upload/v1758253915/ring_1st_video_jglpdw.mp4",
    "https://res.cloudinary.com/dgooittzu/video/upload/v1758253871/bracelet_1st_video_zsdbks.mp4",
    "https://res.cloudinary.com/dgooittzu/video/upload/v1758253885/earrings_1st_video_mjz2eo.mp4",
    "https://res.cloudinary.com/dgooittzu/video/upload/v1758253900/pendants_1st_video_ggbrws.mp4",
  ];

  return (
    <div className="bg-white dark:bg-[#0d1117] min-h-screen">
      {/* Jewellery Category Section */}
      <section className="mt-12 flex justify-center">
        <div className="max-w-7xl w-full px-4">
          <JwelleryCategory />
        </div>
      </section>

      {/* Image + Video Section */}
      <section className="mt-12 flex justify-center px-4">
        <div className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Banner Image */}
          <div className="flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/dgooittzu/image/upload/v1758879725/small_banner_1_for_jewellery_kle9nd.png"
              alt="Jewellery Banner"
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>

          {/* Promotional Video */}
          <div className="flex justify-center items-center">
            <video
              src="https://res.cloudinary.com/dgooittzu/video/upload/v1758881576/small_banner_2_for_jewellery_xugyow.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-2xl shadow-lg w-[95%] lg:w-[90%] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Remaining 5 Product Videos */}
      <section className="mt-12 px-4 pb-16 ">
        <div className="max-w-[1800px] mx-auto flex flex-wrap justify-center items-start gap-6 mt-4 mb-4">
          {productVideos.map((video, index) => (
            <div
              key={index}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white"
              style={{ width: "200px", height: "240px" }}
            >
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Accessories;
