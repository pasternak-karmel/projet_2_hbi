"use client";
import { useState } from "react";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";

export default function NavbarAgent() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-transparent fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/agent" className="text-2xl font-bold text-black">
              Livreur
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/boite" className="text-black hover:text-blue-300">
              Ma Boîte
            </Link>
            <Link href="/agent" className="text-black hover:text-blue-300">
              Livraison Disponible
            </Link>
            <Link href="/historique" className="text-black hover:text-blue-300">
              Historiques
            </Link>
            <Link href="/contact" className="text-black hover:text-blue-300">
              Contacter Admin
            </Link>
            <UserButton />
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-black hover:text-blue-300 focus:outline-none"
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
          <div className="px-2 pt-2 pb-3 space-y-1 z-50 backdrop-blur-md">
            <Link
              href="/boite"
              className="block px-3 py-2 rounded-md text-base font-medium text-black  hover:text-black"
              onClick={toggleMobileMenu}
            >
              Ma Boîte
            </Link>
            <Link
              href="/agent"
              className="block px-3 py-2 rounded-md text-base font-medium text-black  hover:text-black"
              onClick={toggleMobileMenu}
            >
              Livraison Disponible
            </Link>
            <Link
              href="/historique"
              className="block px-3 py-2 rounded-md text-base font-medium text-black  hover:text-black"
              onClick={toggleMobileMenu}
            >
              Historiques
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-black  hover:text-black"
              onClick={toggleMobileMenu}
            >
              Contacter Admin
            </Link>
            <UserButton />
          </div>
        </div>
      )}
    </nav>
  );
}
