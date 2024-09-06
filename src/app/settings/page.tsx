import React from 'react'
import Image from 'next/image';
const SettingsPage = () => {
  return (
    <div>
          <div className="w-full">
        <Image 
          src="/images/settings.png" 
          alt="setting" 
          layout="responsive" 
          width={100} 
          height={50} 
          className="w-[100vw] object-cover"
        />
      </div>
    </div>
  )
}

export default SettingsPage