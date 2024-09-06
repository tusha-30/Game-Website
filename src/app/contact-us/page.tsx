"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isHydrated, setIsHydrated] = useState(false);


  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

   
    localStorage.setItem("contactData", JSON.stringify(formData));

    toast.success("Message sent successfully!");

   
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  if (!isHydrated) return null;

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-6">
  
      <div className="w-full md:w-1/2">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium mb-2">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Phone Number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium mb-2">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Your Message"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#051c3f] text-white rounded-md hover:bg-[#1f3e6d] transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 md:ml-6">
        <Image
          src="/images/contactus.png"
          alt="Contact Us"
          width={500}
          height={500}
              className="hidden md:block object-cover"
       
          priority
        />
      </div>
    </div>
  );
};

export default ContactPage;
