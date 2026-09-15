'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT || 5087}/api/auth/me`, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT || 5087}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setUser(null);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <rect x="4" y="4" width="32" height="32" stroke="currentColor" strokeWidth="1" />
                <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1" />
                <line x1="20" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <span className="text-xl font-light tracking-wider">CLEAN LINES</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <div key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-sm tracking-wide transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-black font-medium'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {item.name.toUpperCase()}
                </Link>
                {index < navigation.length - 1 && (
                  <div className="h-4 w-px bg-gray-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-200"
                >
                  DASHBOARD
                </Link>
                <div className="h-4 w-px bg-gray-300 mx-2"></div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-200"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-200"
                >
                  LOGIN
                </Link>
                <div className="h-4 w-px bg-gray-300 mx-2"></div>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm tracking-wide border border-black hover:bg-black hover:text-white transition-all duration-200"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm tracking-wide transition-colors duration-200 border-l-2 ${
                    pathname === item.href
                      ? 'text-black font-medium border-black'
                      : 'text-gray-600 hover:text-black border-transparent hover:border-gray-300'
                  }`}
                >
                  {item.name.toUpperCase()}
                </Link>
              ))}
              <div className="h-px bg-gray-200 my-2"></div>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-200 border-l-2 border-transparent hover:border-gray-300"
                  >
                    DASHBOARD
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-3 text-sm tracking-wide text-left text-gray-600 hover:text-black transition-colors duration-200 border-l-2 border-transparent hover:border-gray-300"
                  >
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-sm tracking-wide text-gray-600 hover:text-black transition-colors duration-200 border-l-2 border-transparent hover:border-gray-300"
                  >
                    LOGIN
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mx-4 my-2 px-4 py-3 text-sm tracking-wide text-center border border-black hover:bg-black hover:text-white transition-all duration-200"
                  >
                    SIGN UP
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}