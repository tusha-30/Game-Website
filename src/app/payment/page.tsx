import React from 'react'
import Image from 'next/image';
const PaymentPage = () => {
  return (
    <div className="w-full">
    <Image 
      src="/images/payment.png" 
      alt="payment" 
      layout="responsive" 
      width={100} 
      height={50} 
      className="w-[100vw] object-cover"
    />
  </div>
  )
}

export default PaymentPage