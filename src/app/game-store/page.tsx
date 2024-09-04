"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ClipLoader from 'react-spinners/ClipLoader'; // Loading spinner
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const GameStore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (id: number) => {
    router.push(`/game-store/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000" size={50} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border p-4 flex flex-col items-center cursor-pointer"
          onClick={() => handleProductClick(product.id)}
        >
          <Image src={product.thumbnail} alt={product.title} width={200} height={200} className="object-cover" />
          <h3 className="mt-2 text-center text-lg font-semibold">{product.title}</h3>
          <p className="text-center text-gray-500">${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default GameStore;
