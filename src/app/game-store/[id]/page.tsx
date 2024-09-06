"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader';
import Image from "next/legacy/image";
import { FaStar, FaTag, FaShoppingCart } from 'react-icons/fa'; // Icons

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  rating: number;
  images: string[];
}

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product details', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000" size={50} />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{product.title}</h1>
      <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg overflow-hidden">
        <Image
          src={product.images[0]} 
          alt={product.title}
          width={400}
          height={400}
          className="object-cover"

          
          priority 
        />
        <div className="md:ml-6 p-4 flex flex-col">
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          
          <div className="flex items-center mb-4">
            <FaTag className="text-gray-500 mr-2" />
            <p className="text-gray-600"><strong>Brand:</strong> {product.brand}</p>
          </div>
          
          <div className="flex items-center mb-4">
            <FaShoppingCart className="text-gray-500 mr-2" />
            <p className="text-gray-600"><strong>Category:</strong> {product.category}</p>
          </div>

          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-500 mr-2" />
            <p className="text-gray-600"><strong>Rating:</strong> {product.rating} / 5</p>
          </div>

          <div className="flex justify-center">
            <span className="text-xl font-semibold bg-blue-600 text-white px-6 py-2 rounded-full">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
