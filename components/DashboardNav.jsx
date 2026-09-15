'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function DashboardNav({ user }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_BACKEND_PORT || 5087}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Logout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <nav className="dashboard-nav">
      <div className="dashboard-nav-container">
        <div className="dashboard-nav-left">
          <Link href="/dashboard" className="dashboard-logo">
            Dashboard
          </Link>
          <div className="nav-separator"></div>
          <div className="nav-links">
            <Link href="/dashboard" className="nav-link">
              Overview
            </Link>
            <Link href="/dashboard/projects" className="nav-link">
              Projects
            </Link>
            <Link href="/dashboard/settings" className="nav-link">
              Settings
            </Link>
          </div>
        </div>
        
        <div className="dashboard-nav-right">
          <div className="user-info">
            <span className="user-name">{user?.full_name || user?.email}</span>
            <span className="user-email">{user?.email}</span>
          </div>
          <div className="nav-separator"></div>
          <button 
            onClick={handleLogout} 
            className="logout-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .dashboard-nav {
          background: white;
          border-bottom: 1px solid #e5e5e5;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .dashboard-nav-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .dashboard-nav-left,
        .dashboard-nav-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .dashboard-logo {
          font-size: 1.25rem;
          font-weight: 600;
          color: #000;
          text-decoration: none;
          letter-spacing: -0.02em;
          transition: opacity 0.2s ease;
        }

        .dashboard-logo:hover {
          opacity: 0.7;
        }

        .nav-separator {
          width: 1px;
          height: 24px;
          background: #e5e5e5;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: #666;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #000;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -1.5rem;
          left: 0;
          right: 0;
          height: 2px;
          background: #000;
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.25rem;
        }

        .user-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #000;
          letter-spacing: -0.01em;
        }

        .user-email {
          font-size: 0.8rem;
          color: #666;
        }

        .logout-btn {
          padding: 0.625rem 1.5rem;
          background: transparent;
          border: 1px solid #000;
          color: #000;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: -0.01em;
        }

        .logout-btn:hover:not(:disabled) {
          background: #000;
          color: white;
        }

        .logout-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .dashboard-nav {
            padding: 0 1rem;
          }

          .dashboard-nav-container {
            height: 60px;
            gap: 1rem;
          }

          .dashboard-nav-left,
          .dashboard-nav-right {
            gap: 1rem;
          }

          .nav-links {
            display: none;
          }

          .user-email {
            display: none;
          }

          .user-name {
            font-size: 0.85rem;
          }

          .logout-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }

          .nav-separator {
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .dashboard-logo {
            font-size: 1rem;
          }

          .user-info {
            display: none;
          }

          .nav-separator:last-of-type {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}