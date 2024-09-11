"use client";

import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
    queryClient.invalidateQueries({
      queryKey: ["Allproduit", params.toString()],
      exact: true,
      refetchType: "active",
    });
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          onChange={handleFilterChange}
        />
        <select
          name="cat"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          onChange={handleFilterChange}
        >
          <option>Category</option>
          <option value="jardin">jardin</option>
          <option value="popular">Popular</option>
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
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

// import { useState } from "react";

// export default function Filter({ onFilterChange }: any) {
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [sort, setSort] = useState("");

//   const handleApplyFilters = () => {
//     onFilterChange({
//       min: minPrice,
//       max: maxPrice,
//       category: category,
//       sort: sort,
//     });
//   };

//   return (
//     <div className="flex flex-wrap gap-6 mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
//       <div className="flex-1 min-w-[150px]">
//         <label className="block mb-2 text-sm font-medium">Min Price:</label>
//         <input
//           type="number"
//           value={minPrice}
//           onChange={(e) => setMinPrice(e.target.value)}
//           placeholder="Min price"
//           className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="flex-1 min-w-[150px]">
//         <label className="block mb-2 text-sm font-medium">Max Price:</label>
//         <input
//           type="number"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(e.target.value)}
//           placeholder="Max price"
//           className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="flex-1 min-w-[150px]">
//         <label className="block mb-2 text-sm font-medium">Category:</label>
//         <input
//           type="text"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           placeholder="Category"
//           className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="flex-1 min-w-[150px]">
//         <label className="block mb-2 text-sm font-medium">Sort by:</label>
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Select</option>
//           <option value="asc prix">Price: Low to High</option>
//           <option value="desc prix">Price: High to Low</option>
//           <option value="desc createdAt">Newest</option>
//           <option value="asc createdAt">Oldest</option>
//         </select>
//       </div>
//       <div className="flex-1 min-w-[150px] flex items-end">
//         <button
//           onClick={handleApplyFilters}
//           className="w-full py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </div>
//   );
// }

{
  /* <select
  name=""
  id=""
  className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
>
  <option>All Filters</option>
</select>; */
}
