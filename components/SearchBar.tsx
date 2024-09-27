"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleSearch = async (query: string) => {
    if (query.length < 3) return;
    setIsLoading(true);

    try {
      const { data } = await axios.get(`/api/article/search?query=${query}`);
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length >= 3) {
        handleSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleResultClick = (result: any) => {
    switch (result.type) {
      case "Article":
        router.push(`/All-Products/${result.id}`);
        break;
      case "Category":
        router.push(`/categories?nom=${result.id}`);
        break;
      case "User":
        router.push(`/vendeur/${result.id}`);
        break;
      default:
        break;
    }
    setResults([]);
    setSearchQuery("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setResults([]);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for articles, vendeur, or categories..."
          className="w-80 p-4 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-4 top-3.5">
            <Image src="/loader.gif" alt="Loading" width={24} height={24} />
          </div>
        )}
        {!isLoading && searchQuery.length >= 3 && results.length === 0 && (
          <div className="absolute right-4 top-3.5 text-red-500">
            No results found
          </div>
        )}
      </div>

      {results.length > 0 && searchQuery.length >= 3 && (
        <ul
          ref={dropdownRef}
          className="absolute w-full bg-white border border-gray-300 rounded-md mt-2 shadow-lg z-10 max-h-64 overflow-y-auto transition-all ease-in-out duration-150"
        >
          {results.map((result, index) => (
            <li
              key={index}
              className="p-3 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
              onClick={() => handleResultClick(result)}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Image
                    src={
                      result.type === "Article"
                        ? result.image
                        : result.type === "User"
                        ? "/icons/user.png"
                        : "/icons/category.png"
                    }
                    alt={result.type}
                    width={30}
                    height={30}
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-700">{result.name}</p>
                  <p className="text-sm text-gray-500">{result.type}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
