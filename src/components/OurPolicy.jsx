import React from 'react';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 'style={{marginTop:'80px'}}>
      <div>
        <img src="/exchange_icon.png" className='w-12 m-auto mb-5' alt="Exchange Icon" />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle-free exchange policy</p>
      </div>
      <div>
        <img src="/quality_icon.png" className='w-12 m-auto mb-5' alt="Exchange Icon" />
        <p className='font-semibold'>3 Days Return Policy</p>
        <p className='text-gray-400'>We provide 3 days free return policy</p>
      </div>
      <div>
        <img src="/support_img.png" className='w-12 m-auto mb-5' alt="Exchange Icon" />
        <p className='font-semibold'>Best customer support</p>
        <p className='text-gray-400'>we provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;