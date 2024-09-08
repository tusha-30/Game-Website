"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/legacy/image";
import { FaSearch } from "react-icons/fa";
import { BsChevronDown } from "react-icons/bs";
import { Carousell } from "@/components/Carousell";


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
const carouselItems = [
  { id: 1, imageUrl: '/images/COC.jpeg', title: 'Slide 1', body: 'Description for Slide 1' },
  { id: 2, imageUrl: '/images/COD.jpeg', title: 'Slide 2', body: 'Description for Slide 2' },
  { id: 3, imageUrl: '/images/PUBG.jpeg', title: 'Slide 3', body: 'Description for Slide 3' },

];
const GameStore: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [noMatch, setNoMatch] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>("Latest");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/",
    timeout: 10000,
  });

  const categories = {
    "Beauty & Fashion": ["beauty", "skin-care", "fragrances", "sunglasses"],
    "Electronics": ["laptops", "tablets", "smartphones"],
    "Men's Fashion": ["mens-shirts", "mens-shoes", "mens-watches"],
    "Women's Fashion": ["womens-watches", "womens-shoes", "womens-jewellery", "womens-dresses", "womens-bags", "tops"],
    "Home & Kitchen": ["kitchen-accessories", "home-decoration", "furniture"],
    "Groceries": ["groceries"],
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("products");
      setProducts(response.data.products);
      setSearchResults(response.data.products);
      setLoading(false);
      applySort(response.data.products, sortOption); // Default sorting by latest
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      applySort(products, sortOption); 
    }
  }, [searchTerm, products, sortOption]);

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        setSelectedCategories([]);
        const response = await axiosInstance.get(`products/category/${searchTerm.trim()}`);
        if (response.data.products.length > 0) {
          setSearchResults(response.data.products);
          setNoMatch(false);
        } else {
          setSearchResults([]);
          setNoMatch(true);
        }
      } catch (error) {
        console.error("Failed to fetch search results", error);
        setSearchResults([]);
        setNoMatch(true);
      }
    } else {
      setSearchResults(products);
      applySort(products, sortOption); 
    }
  };

  const handleCategoryChange = async (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      setSearchResults(products);
      applySort(products, sortOption); 
      return;
    }

    try {
      const categoryProducts = await Promise.all(
        updatedCategories.map((cat) =>
          axiosInstance.get(`products/category/${cat}`).then((res) => res.data.products)
        )
      );

      const mergedProducts = categoryProducts.flat().reduce((unique, product) => {
        return unique.some((p: Product) => p.id === product.id) ? unique : [...unique, product];
      }, [] as Product[]);
      

      setSearchResults(mergedProducts);
      setNoMatch(mergedProducts.length === 0);
      applySort(mergedProducts, sortOption); 
    } catch (error) {
      console.error("Failed to fetch filtered products", error);
      setNoMatch(true);
    }
  };

  const applySort = (items: Product[], option: string) => {
    let sortedItems = [...items];
    switch (option) {
      case "PriceLowToHigh":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "PriceHighToLow":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        sortedItems.sort((a, b) => b.rating - a.rating);
        break;
      case "Latest":
      default:
        sortedItems.sort((a, b) => new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime());
        break;
    }
    setSearchResults(sortedItems);
  };


  const removeFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setSearchResults(products);
  

    const sortOptionToApply = sortOption || "Latest";
    applySort(products, sortOptionToApply);
  };

  const handleSortOption = (option: string) => {
    setSortOption(option);
    setDropdownOpen(false);
    applySort(searchResults, option); 
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleProductClick = (id: number) => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "yes";
    router.push(isLoggedIn ? `/game-store/${id}` : "/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#000" size={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-2 sm:pt-4">
      <div className=" w-full h-[31vh] sm:h-[35vh] md:h-[46vh] lg:h-[60vh]" >
     <Carousell items={carouselItems} autoPlay={true} interval={3000} /></div>
     <div>
    <div className="p-2 sm:p-4 flex gap-2 sm:gap-4 mt-4">

      {/* Filter Sidebar */}

      
      <div className="w-[50%] sm:w-60 bg-white shadow-[4px_0px_8px_0px_rgba(0,0,0,0.1)]">
        <h3 className="text-lg font-semibold mb-2 mt-1 ">Filter by Categories</h3>
        {Object.entries(categories).map(([group, catArray]) => (
          <div key={group}>
            <h4 className="font-semibold">{group}</h4>
            {catArray.map((category) => (
              <div key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                <label htmlFor={category} className="cursor-pointer">{category}</label>
              </div>
            ))}
          </div>
        ))}
        <button onClick={removeFilters} className="mt-4 bg-red-500 text-white px-4 py-2">Remove Filters</button>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="relative mb-1 sm:mb-4">
            <input
              type="text"
              placeholder="Search "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="border p-2 pl-2 sm:pl-5 w-full"
            />
            <FaSearch
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer"
              size={20}
            />
          </div>

          <div className="relative mb-1 sm:mb-4">
            <button onClick={toggleDropdown} className="border p-2 w-full flex items-center justify-between bg-[#c3dffe]">
              {sortOption ? sortOption.replace(/([A-Z])/g, " $1").trim() : "Sort By"} <BsChevronDown size={20} />
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white border mt-2 w-full z-10">
                <button onClick={() => handleSortOption("PriceLowToHigh")} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Price: Low to High
                </button>
                <button onClick={() => handleSortOption("PriceHighToLow")} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Price: High to Low
                </button>
                <button onClick={() => handleSortOption("Rating")} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Rating
                </button>
                <button onClick={() => handleSortOption("Latest")} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                  Latest
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {noMatch ? (
            <div className="flex flex-col items-center justify-center h-full mt-10 ">
              <Image src="/images/no-product-found.png" alt="No products found" width={200} height={200} />
              <p className="mt-4 text-gray-600">No products match your search.</p>
            </div>
          ) : (
            searchResults.map((product) => (
              <div key={product.id} className="border p-2 sm:p-4 cursor-pointer hover:shadow-lg" onClick={() => handleProductClick(product.id)}>
                <Image src={product.thumbnail} alt={product.title} width={200} height={200} />
                <h3 className="text-sm sm:text-lg font-semibold mt-0 sm:mt-2">{product.title}</h3>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                <p className="text-yellow-500">Rating: {product.rating}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default GameStore;
