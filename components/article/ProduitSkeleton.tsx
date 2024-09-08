export const ProduitSkeleton = () => (
  <div className="w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4 animate-pulse">
    <div className="relative w-full h-80 bg-gray-300 rounded-lg"></div>
    <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
    <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
    <div className="flex justify-between">
      <div className="w-20 h-8 bg-gray-300 rounded"></div>
      <div className="w-20 h-8 bg-gray-300 rounded"></div>
    </div>
  </div>
);
