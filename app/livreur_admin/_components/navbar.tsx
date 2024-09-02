import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/livreur">
              <a className="text-2xl font-bold text-teal-600">Livreur</a>
            </Link>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link href="/tasks">
              <a className="text-gray-700 hover:text-teal-600">Tâches</a>
            </Link>
            <Link href="/report">
              <a className="text-gray-700 hover:text-teal-600">Reporter Livraison</a>
            </Link>
            <Link href="/scan">
              <a className="text-gray-700 hover:text-teal-600">Scanner QR Code</a>
            </Link>
            <Link href="/contact-admin">
              <a className="text-gray-700 hover:text-teal-600">Contacter Admin</a>
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/tasks">
              <a
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
              >
                Tâches
              </a>
            </Link>
            <Link href="/report">
              <a
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
              >
                Reporter Livraison
              </a>
            </Link>
            <Link href="/scan">
              <a
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
              >
                Scanner QR Code
              </a>
            </Link>
            <Link href="/contact-admin">
              <a
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
              >
                Contacter Admin
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
