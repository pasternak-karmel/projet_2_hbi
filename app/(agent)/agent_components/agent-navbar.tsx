"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";

export default function NavbarAgent() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("click", closeMobileMenu);
    } else {
      document.removeEventListener("click", closeMobileMenu);
    }

    return () => {
      document.removeEventListener("click", closeMobileMenu);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white/50 backdrop-blur-md shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/agent" className="text-2xl font-bold text-teal-600">
              Board
            </Link>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {/* <Link href="/agent" className="text-gray-700 hover:text-teal-600">
              Tâches
            </Link> */}
            <Link href="/scan" className="text-gray-700 hover:text-teal-600">
              Scanner QR Code
            </Link>
            <Link href="/historique" className="text-gray-700 hover:text-teal-600">
              Historiques
            </Link>
            <Link href="/contact-admin" className="text-gray-700 hover:text-teal-600">
              Contacter Admin
            </Link>
            <UserButton />
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
          <div
            className="px-2 pt-2 pb-3 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              href="/tasks"
              onClick={toggleMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
            >
              Tâches
            </Link>
            <Link
              href="/report"
              onClick={toggleMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
            >
              Reporter Livraison
            </Link>
            <Link
              href="/scan"
              onClick={toggleMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
            >
              Scanner QR Code
            </Link>
            <Link
              href="/contact-admin"
              onClick={toggleMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-100"
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
