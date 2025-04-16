import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-mtn-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-mtn-yellow">
                <span className="block">Bridgetunes</span>
                <span className="text-xs text-white">×</span>
                <span className="block">MTN</span>
              </a>
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><Link href="/"><a className="hover:text-mtn-yellow transition-colors">Home</a></Link></li>
              <li><Link href="/opt-in"><a className="hover:text-mtn-yellow transition-colors">Opt-In</a></Link></li>
              <li><Link href="/draw-management"><a className="hover:text-mtn-yellow transition-colors">Draw Management</a></Link></li>
              <li><Link href="/admin"><a className="hover:text-mtn-yellow transition-colors">Admin Dashboard</a></Link></li>
            </ul>
          </nav>
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
