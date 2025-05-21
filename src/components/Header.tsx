'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          TrustHub
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link 
            href="/" 
            className={`hover:text-white/80 transition-colors ${pathname === '/' ? 'font-medium border-b-2 border-white pb-1' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/feed" 
            className={`hover:text-white/80 transition-colors ${pathname === '/feed' ? 'font-medium border-b-2 border-white pb-1' : ''}`}
          >
            Reports
          </Link>
          <Link 
            href="/dashboard" 
            className={`hover:text-white/80 transition-colors ${pathname === '/dashboard' ? 'font-medium border-b-2 border-white pb-1' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="ml-4 px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Sign In
          </Link>
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 border-t border-blue-500/30 bg-blue-700">
          <nav className="flex flex-col gap-4">
            <Link 
              href="/" 
              className={`py-2 ${pathname === '/' ? 'font-medium' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/feed" 
              className={`py-2 ${pathname === '/feed' ? 'font-medium' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </Link>
            <Link 
              href="/dashboard" 
              className={`py-2 ${pathname === '/dashboard' ? 'font-medium' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="#"
              className="mt-2 px-4 py-2 bg-white text-blue-600 rounded-md font-medium text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}