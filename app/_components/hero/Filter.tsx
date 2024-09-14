"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

interface FilterProps {
  filters: {
    min: string;
    max: string;
    category: string;
    sort: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const Filter = ({ filters, onFilterChange }: FilterProps) => {
  const searchParams = useSearchParams();

  const handleFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          value={filters.min}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          value={filters.max}
          onChange={handleFilterChange}
        />
        <select
          name="category"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">Category</option>
          <option value="jardin">Jardin</option>
          <option value="popular">Popular</option>
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          value={filters.sort}
          onChange={handleFilterChange}
        >
          <option value="">Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
