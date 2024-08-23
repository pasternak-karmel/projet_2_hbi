// pages/404.tsx

import Link from "next/link";
import Image from "next/image";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="relative w-80 h-48 mb-8 flex items-center justify-center left-16">
          <Image
            src="/404-illustration.png"
            alt="404 Not Found"
            layout="fill"
            objectFit="contain"
            className="absolute items-center"
          />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" className="px-6 py-3 text-lg font-semibold rounded-md shadow-md hover:bg-black hover:text-white transition duration-300 ease-in-out justify-center">

            Go back to Home
          
        </Link>
      </div>
    </div>
  );
}
