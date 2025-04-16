import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="co-branded-header text-white py-3 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center">
                {/* Bridgetunes Logo */}
                <div className="mr-2">
                  <span className="text-xl font-bold text-white">Bridge<span className="text-mtn-yellow">tunes</span></span>
                </div>
                {/* Divider */}
                <div className="h-6 w-px bg-gray-400 mx-2"></div>
                {/* MTN Logo */}
                <div>
                  <span className="text-xl font-bold text-mtn-yellow">MTN</span>
                </div>
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              <li>
                <Link href="/">
                  <a className="nav-link nav-link-light text-sm">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/opt-in">
                  <a className="nav-link nav-link-light text-sm">Opt-In</a>
                </Link>
              </li>
              <li>
                <Link href="/draw-management">
                  <a className="nav-link nav-link-light text-sm">Draw Management</a>
                </Link>
              </li>
              <li>
                <Link href="/admin">
                  <a className="nav-link nav-link-light text-sm">Admin Dashboard</a>
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-bridgetunes-dark rounded-lg shadow-lg p-3">
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="block nav-link nav-link-light text-sm" onClick={() => setMobileMenuOpen(false)}>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/opt-in">
                  <a className="block nav-link nav-link-light text-sm" onClick={() => setMobileMenuOpen(false)}>Opt-In</a>
                </Link>
              </li>
              <li>
                <Link href="/draw-management">
                  <a className="block nav-link nav-link-light text-sm" onClick={() => setMobileMenuOpen(false)}>Draw Management</a>
                </Link>
              </li>
              <li>
                <Link href="/admin">
                  <a className="block nav-link nav-link-light text-sm" onClick={() => setMobileMenuOpen(false)}>Admin Dashboard</a>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
