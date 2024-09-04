"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader'; // Loading spinner
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get the id

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
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">{product.title}</h1>
      <div className="flex flex-col md:flex-row items-center">
        <Image
          src={product.images[0]} // Use the first image from the images array
          alt={product.title}
          width={400}
          height={400}
          className="object-cover"
        />
        <div className="md:ml-4">
          <p className="mt-2 text-gray-700">{product.description}</p>
          <p className="mt-4 text-xl font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
