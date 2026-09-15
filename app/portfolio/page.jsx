'use client';

import { useState, useEffect } from 'react';
import PortfolioGrid from '@/components/PortfolioGrid';
import FilterBar from '@/components/FilterBar';

export default function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterAndSortProjects();
  }, [projects, selectedCategory, sortBy]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || `https://${window.location.hostname}:${process.env.NEXT_PUBLIC_BACKEND_PORT || 5087}`;
      
      const response = await fetch(`${backendUrl}/api/portfolio`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err.message || 'Failed to load portfolio projects');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProjects = () => {
    let result = [...projects];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(project => project.category === selectedCategory);
    }

    // Sort projects
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredProjects(result);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  return (
    <main className="portfolio-page">
      <div className="portfolio-header">
        <div className="container">
          <h1>Our Portfolio</h1>
          <p className="subtitle">Discover our collection of clean, minimalist designs</p>
          <div className="header-line"></div>
        </div>
      </div>

      <div className="portfolio-content">
        <div className="container">
          <FilterBar
            selectedCategory={selectedCategory}
            sortBy={sortBy}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          />

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading portfolio...</p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <div className="error-icon">⚠</div>
              <h3>Unable to Load Portfolio</h3>
              <p>{error}</p>
              <button onClick={fetchProjects} className="retry-button">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && filteredProjects.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <h3>No Projects Found</h3>
              <p>
                {selectedCategory === 'all'
                  ? 'No portfolio projects available yet.'
                  : `No projects found in the "${selectedCategory}" category.`}
              </p>
              {selectedCategory !== 'all' && (
                <button onClick={() => setSelectedCategory('all')} className="clear-filter-button">
                  Clear Filter
                </button>
              )}
            </div>
          )}

          {!loading && !error && filteredProjects.length > 0 && (
            <>
              <div className="results-info">
                <p>
                  Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                  {selectedCategory !== 'all' && ` in "${selectedCategory}"`}
                </p>
              </div>
              <PortfolioGrid projects={filteredProjects} />
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .portfolio-page {
          min-height: 100vh;
          background: #ffffff;
        }

        .portfolio-header {
          padding: 8rem 2rem 4rem;
          text-align: center;
          background: linear-gradient(to bottom, #fafafa, #ffffff);
          border-bottom: 1px solid #e5e5e5;
        }

        .portfolio-header h1 {
          font-size: 3.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          color: #000000;
        }

        .subtitle {
          font-size: 1.25rem;
          color: #666666;
          font-weight: 300;
          margin-bottom: 2rem;
        }

        .header-line {
          width: 60px;
          height: 1px;
          background: #000000;
          margin: 0 auto;
        }

        .portfolio-content {
          padding: 4rem 2rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .results-info {
          margin: 2rem 0 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #e5e5e5;
        }

        .results-info p {
          color: #666666;
          font-size: 0.95rem;
          font-weight: 300;
        }

        .loading-state,
        .error-state,
        .empty-state {
          text-align: center;
          padding: 6rem 2rem;
        }

        .spinner {
          width: 40px;
          height: 40px;
          margin: 0 auto 1.5rem;
          border: 2px solid #e5e5e5;
          border-top-color: #000000;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-state p {
          color: #666666;
          font-size: 1.1rem;
          font-weight: 300;
        }

        .error-state,
        .empty-state {
          max-width: 500px;
          margin: 0 auto;
        }

        .error-icon,
        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }

        .error-state h3,
        .empty-state h3 {
          font-size: 1.75rem;
          font-weight: 300;
          margin-bottom: 1rem;
          color: #000000;
        }

        .error-state p,
        .empty-state p {
          color: #666666;
          font-size: 1.1rem;
          font-weight: 300;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .retry-button,
        .clear-filter-button {
          padding: 0.875rem 2rem;
          background: #000000;
          color: #ffffff;
          border: none;
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid #000000;
        }

        .retry-button:hover,
        .clear-filter-button:hover {
          background: #ffffff;
          color: #000000;
        }

        .clear-filter-button {
          background: transparent;
          color: #000000;
        }

        .clear-filter-button:hover {
          background: #000000;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .portfolio-header {
            padding: 6rem 1.5rem 3rem;
          }

          .portfolio-header h1 {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .portfolio-content {
            padding: 3rem 1.5rem;
          }

          .loading-state,
          .error-state,
          .empty-state {
            padding: 4rem 1.5rem;
          }

          .error-state h3,
          .empty-state h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}