'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNav from '@/components/DashboardNav';
import DesignList from '@/components/DesignList';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/me`, {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          throw new Error('Failed to verify session');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error('Session verification error:', err);
        setError(err.message);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [router]);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <p>Error: {error}</p>
          <button onClick={() => router.push('/login')} className="btn-primary">
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <DashboardNav user={user} onLogout={handleLogout} />
      
      <main className="dashboard-main">
        <section className="dashboard-header">
          <div className="header-content">
            <h1>Dashboard</h1>
            <p className="subtitle">Manage your design projects</p>
          </div>
          <div className="header-line"></div>
        </section>

        <section className="dashboard-profile">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.full_name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="profile-info">
                <h2>{user?.full_name || 'User'}</h2>
                <p className="profile-email">{user?.email}</p>
                <p className="profile-meta">
                  Member since {new Date(user?.created_at).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <div className="profile-divider"></div>
          </div>
        </section>

        <section className="dashboard-projects">
          <div className="projects-header">
            <h2>Your Projects</h2>
            <button 
              onClick={() => router.push('/dashboard/new-project')}
              className="btn-primary"
            >
              + New Project
            </button>
          </div>
          <div className="projects-divider"></div>
          <DesignList userId={user?.id} />
        </section>
      </main>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: #fafafa;
        }

        .loading-state,
        .error-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 1.5rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #e5e5e5;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-state p,
        .error-state p {
          color: #666;
          font-size: 1rem;
        }

        .dashboard-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .dashboard-header {
          margin-bottom: 3rem;
        }

        .header-content {
          margin-bottom: 1rem;
        }

        .dashboard-header h1 {
          font-size: 3rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem 0;
          color: #000;
        }

        .subtitle {
          font-size: 1.125rem;
          color: #666;
          margin: 0;
        }

        .header-line {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, #000 0%, transparent 100%);
        }

        .dashboard-profile {
          margin-bottom: 4rem;
        }

        .profile-card {
          background: #fff;
          border: 1px solid #e5e5e5;
          padding: 2rem;
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 300;
          flex-shrink: 0;
        }

        .profile-info h2 {
          font-size: 1.5rem;
          font-weight: 400;
          margin: 0 0 0.5rem 0;
          color: #000;
        }

        .profile-email {
          color: #666;
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
        }

        .profile-meta {
          color: #999;
          font-size: 0.875rem;
          margin: 0;
        }

        .profile-divider {
          width: 100%;
          height: 1px;
          background: #e5e5e5;
          margin-top: 2rem;
        }

        .dashboard-projects {
          margin-top: 3rem;
        }

        .projects-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .projects-header h2 {
          font-size: 2rem;
          font-weight: 300;
          margin: 0;
          color: #000;
        }

        .projects-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, #000 0%, transparent 100%);
          margin-bottom: 2rem;
        }

        .btn-primary {
          background: #000;
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 500;
        }

        .btn-primary:hover {
          background: #333;
          transform: translateY(-1px);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .dashboard-main {
            padding: 2rem 1rem;
          }

          .dashboard-header h1 {
            font-size: 2rem;
          }

          .profile-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .profile-avatar {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }

          .projects-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .projects-header h2 {
            font-size: 1.5rem;
          }

          .btn-primary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}