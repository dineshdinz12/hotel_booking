"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation'; // Import usePathname

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current pathname

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/hotels", label: "Hotels" },
    // { href: "/booking", label: "Book Now" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
          >
            LUXURY<span className="text-blue-600">HOTELS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative text-gray-700 hover:text-gray-900 transition-colors group py-2 ${pathname === item.href ? 'text-blue-600' : ''}`} // Active link
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-100 transition-transform duration-300" />
                )}
              </Link>
            ))}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              <Link
                  href='/hotels'
                >
                  Reserve
                </Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-gray-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-gray-700 hover:text-gray-900 transition-colors py-2 ${pathname === item.href ? 'text-blue-600' : ''}`} // Active link for mobile
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 w-full">
                Reserve
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
