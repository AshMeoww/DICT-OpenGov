'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">TrustHub</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
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
        <nav className="hidden md:flex gap-6">
          <Link 
            href="/" 
            className={`hover:underline ${pathname === '/' ? 'font-semibold' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/feed" 
            className={`hover:underline ${pathname === '/feed' ? 'font-semibold' : ''}`}
          >
            Reports
          </Link>
          <Link 
            href="/dashboard" 
            className={`hover:underline ${pathname === '/dashboard' ? 'font-semibold' : ''}`}
          >
            Dashboard
          </Link>
        </nav>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-blue-500">
          <nav className="flex flex-col gap-4">
            <Link 
              href="/" 
              className={`hover:underline ${pathname === '/' ? 'font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/feed" 
              className={`hover:underline ${pathname === '/feed' ? 'font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Reports
            </Link>
            <Link 
              href="/dashboard" 
              className={`hover:underline ${pathname === '/dashboard' ? 'font-semibold' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}