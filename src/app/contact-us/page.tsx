"use client"
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

const ContactUs = () => {
  // Ensure this code runs only on the client
useEffect(() => {
  toast.error('This is an error message!');
  console.log("hey")
}, []);

  return (
    <div>ContactUs</div>
  )
}

export default ContactUs