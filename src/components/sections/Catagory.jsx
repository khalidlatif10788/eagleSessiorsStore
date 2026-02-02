
import React from 'react';
import { Link } from 'react-router-dom';

const ShopCategories = () => {
  const categories = [
    {
      title: "CUTTING & THINNING SCISSORS",
      image: "https://res.cloudinary.com/dsilhases/image/upload/v1737313618/a6d2a91f-fbb3-421d-9fd9-8f2722d533e6_20250119_190554_0000_dn6fyu.jpg",
      alt: "Right handed scissors"
    },
    {
      title: "RAZORS",
      image: "https://media.istockphoto.com/id/1460983332/photo/blue-razor-and-handkerchief-on-white-basin.webp?a=1&b=1&s=612x612&w=0&k=20&c=Aa1Y6mJUic8dGCdWwdhunGEKv0Yc-MlrPgAYSvI1yPg=",
      alt: "Left handed scissors"
    },
    {
      title: "HAIRDRESSING ACCESSORIES",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8efOQ8Didn0DAtEUiI7svmwMvLj6kEXnp8X6QR4_xyZgodUrCcFCtZtxA7VbcRH8vGg&usqp=CAU",
      alt: "Hairdressing accessories"
    },
    {
      title: "PET GROOMING SCISSORS",
      image: "https://res.cloudinary.com/dsilhases/image/upload/v1737304677/51HnBiLn2JL_1_whttik.jpg",
      alt: "Pets Grooming Scissors"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-medium mb-12 tracking-wide animate-fade-in text-left">
        SHOP ALL
      </h1>

      {/* Grid container - now with equal sizing */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div key={index} className={`${index === 2 ? 'col-span-1 mx-auto w-full' : 'col-span-1'}`}>
            <CategoryCard category={category} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryCard = ({ category, index }) => {
  return (
    <Link
      to={`/productsBYCatagory/${category.title}`}
      className="block group cursor-pointer animate-fade-in-up w-full"
      style={{
        animationDelay: `${index * 200}ms`
      }}
    >
      <div className="relative overflow-hidden bg-white shadow-lg rounded-lg">
        <div className="aspect-w-4 aspect-h-3">
          <img
            src={category.image}
            alt={category.alt}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
      </div>
      
      <div className="mt-4 flex items-center justify-start gap-x-2 p-2">
        <h2 className="text-sm md:text-[20px] font-medium text-gray-800 group-hover:text-gray-600 transition-colors duration-300">
          {category.title}
        </h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </Link>
  );
};

export default ShopCategories;