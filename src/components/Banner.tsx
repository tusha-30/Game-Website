import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Banner: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);


  return (
    <div className="mb-[20px]">
    <div className="banner-container flex flex-col lg:flex-row items-center justify-between p-2 sm:p-4 lg:p-8  ">
   
      <div className="image-container w-full lg:w-1/2 rounded-lg hover:scale-105 transition-transform duration-300">
        <Image
          src="/images/Banner.jpg" 
          alt="Banner Image"
          width={500} 
          height={300} 
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

   
      <div className="content-container w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-8 text-center lg:text-left ">
        <h1 className="text-3xl font-bold mb-4">Explore Our Game Store</h1>
        <p className="text-lg mb-6">
          Discover the latest games and accessories for your favorite platform.
        </p>
      
        <Link href="/game-store">
          <span className="px-6 py-3 bg-[#051c3f] text-white rounded-lg hover:bg-[#214070] transition-colors mb-[10px]">
            Explore More
          </span>
        </Link>
      </div>
    </div>

<div className="banner-container flex flex-col lg:flex-row items-center justify-between p-2 sm:p-4 lg:p-8 mt-[20px] ">
   
<div className="image-container w-full lg:w-1/2 rounded-lg hover:scale-105 transition-transform duration-300">
  <Image
    src="/images/Banner2.jpg" 
    alt="Banner Image"
    width={500} 
    height={300} 
    className="w-full h-auto object-cover rounded-lg"
  />
</div>


<div className="content-container w-full lg:w-1/2 mt-4 lg:mt-0 lg:ml-8 text-center lg:text-left ">
  <h1 className="text-3xl font-bold mb-4">Explore Our Game Store</h1>
  <p className="text-lg mb-6">
    Discover the latest games and accessories for your favorite platform.
  </p>

  <Link href="/game-store">
    <span className="px-6 py-3 bg-[#051c3f] text-white rounded-lg hover:bg-[#214070] transition-colors mb-[10px]">
      Explore More
    </span>
  </Link>
</div>
</div>
</div>

  );
};

export default Banner;
