import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import "@reach/tabs/styles.css"; // Ensure you have styles for the Tabs component

interface ProductPageProps {
  product: {
    id: string;
    nom: string;
    image: string;
    description: string;
    prix: number;
    usage: boolean;
    categories: string;
    stock: number;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container mx-auto p-8">
      {/* Header Section */}
      <div className="relative w-full h-96 bg-gray-100 rounded-lg shadow-lg">
        <Image
          src={product.image}
          alt={product.nom}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
          <h1 className="text-3xl font-bold text-white">{product.nom}</h1>
          <p className="text-lg text-white">{product.categories}</p>
          <span
            className={cn(
              "inline-block px-3 py-1 mt-2 rounded-full text-xs font-medium",
              product.usage
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            )}
          >
            {product.usage ? "Used" : "New"}
          </span>
        </div>

        {/* Edit Buttons */}
        <div className="absolute top-4 right-4 space-y-2">
          <Link href={`/edit/${product.id}`}>
            <a className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
              Edit Product
            </a>
          </Link>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700">
            Delete Product
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700">
            Duplicate Product
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs className="mt-8" index={activeTab} onChange={(index) => setActiveTab(index)}>
        <TabList className="flex space-x-4">
          <Tab className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Overview</Tab>
          <Tab className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Pricing</Tab>
          <Tab className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Inventory</Tab>
          <Tab className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Images</Tab>
          <Tab className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">Settings</Tab>
        </TabList>

        <TabPanels>
          {/* Overview Tab */}
          <TabPanel>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Product Overview</h2>
              <p>{product.description}</p>
            </div>
          </TabPanel>

          {/* Pricing Tab */}
          <TabPanel>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Pricing</h2>
              <p>Current Price: ${product.prix.toFixed(2)}</p>
              <input
                type="number"
                className="mt-2 p-2 border rounded-lg"
                placeholder="Update Price"
              />
            </div>
          </TabPanel>

          {/* Inventory Tab */}
          <TabPanel>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Inventory</h2>
              <p>Stock: {product.stock}</p>
              <input
                type="number"
                className="mt-2 p-2 border rounded-lg"
                placeholder="Update Stock"
              />
            </div>
          </TabPanel>

          {/* Images Tab */}
          <TabPanel>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Images</h2>
              <p>Manage product images here.</p>
              {/* Add your image upload and management components here */}
            </div>
          </TabPanel>

          {/* Settings Tab */}
          <TabPanel>
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p>Manage product visibility and SEO settings here.</p>
              {/* Add your settings components here */}
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default ProductPage;
