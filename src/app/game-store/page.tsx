// pages/game-store.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { BsChevronDown } from 'react-icons/bs';
import toast from 'react-hot-toast';

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  meta: {
    createdAt: string;
  };
}

const GameStore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [noMatch, setNoMatch] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  // Axios instance
  const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/',
    timeout: 10000,
  });

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('products');
        setProducts(response.data.products);
        setSearchResults(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch search results whenever searchTerm changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      const trimmedSearchTerm = searchTerm.trim();
      if (trimmedSearchTerm) {
        try {
          const response = await axiosInstance.get(`products/category/${trimmedSearchTerm}`);
          if (response.data.products && response.data.products.length > 0) {
            setSearchResults(response.data.products);
            setNoMatch(false);
          } else {
            setSearchResults([]);
            setNoMatch(true);
          }
        } catch (error) {
          console.error('Failed to fetch search results', error);
          setSearchResults([]);
          setNoMatch(true);
        }
      } else {
        setSearchResults(products);
        setNoMatch(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm, products]);

  // Sort products whenever sortOption changes
  useEffect(() => {
    const sortProducts = (products: Product[], option: string) => {
      switch (option) {
        case 'PriceLowToHigh':
          return [...products].sort((a, b) => a.price - b.price);
        case 'PriceHighToLow':
          return [...products].sort((a, b) => b.price - a.price);
        case 'Latest':
          return [...products].sort((a, b) => new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime());
        case 'Rating':
          return [...products].sort((a, b) => b.rating - a.rating);
        default:
          return products;
      }
    };

    setSearchResults(sortProducts(searchResults, sortOption));
  }, [sortOption]);

  const handleProductClick = (id: number) => {
    // Check if the user is logged in before navigating
    const isLoggedIn = localStorage.getItem('loggedIn') === 'yes';
    if (isLoggedIn) {
      router.push(`/game-store/${id}`);
    } else {
      router.push('/login');
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleSortOption = (option: string) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000" size={50} />
      </div>
    );
  }

  return (
    <div className="p-4">

      <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search by category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 pl-5 w-full"
          />
          <FaSearch
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>

        <div className="relative mb-4">
          <button onClick={toggleDropdown} className="border p-2 w-full flex items-center justify-between bg-yellow-100">
            {sortOption ? sortOption.replace(/([A-Z])/g, ' $1').trim() : 'Sort By'} <BsChevronDown size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute bg-white border mt-2 w-full z-10">
              <button
                onClick={() => handleSortOption('PriceLowToHigh')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Price: Low to High
              </button>
              <button
                onClick={() => handleSortOption('PriceHighToLow')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Price: High to Low
              </button>
              <button
                onClick={() => handleSortOption('Latest')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Latest
              </button>
              <button
                onClick={() => handleSortOption('Rating')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Rating
              </button>
            </div>
          )}
        </div>
      </div>

      {noMatch && <p className="text-red-500 text-center">No category match</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((product) => (
          <div
            key={product.id}
            className="border p-4 flex flex-col items-center cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <Image src={product.thumbnail} alt={product.title} width={200} height={200} className="object-cover" priority/>
            <h3 className="mt-2 text-center text-lg font-semibold">{product.title}</h3>
            <p className="text-center text-gray-500">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameStore;
