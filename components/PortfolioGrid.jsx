'use client';

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';

export default function PortfolioGrid({ 
  projects = [], 
  columns = 3,
  showAll = false,
  limit = 6 
}) {
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showAll) {
      setDisplayedProjects(projects);
    } else {
      setDisplayedProjects(projects.slice(0, limit));
    }
  }, [projects, showAll, limit]);

  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  if (isLoading) {
    return (
      <div className="portfolio-grid-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading projects...</p>
      </div>
    );
  }

  if (!displayedProjects || displayedProjects.length === 0) {
    return (
      <div className="portfolio-grid-empty">
        <div className="empty-state">
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="empty-icon"
          >
            <rect x="20" y="20" width="80" height="80" stroke="currentColor" strokeWidth="2"/>
            <line x1="30" y1="40" x2="90" y2="40" stroke="currentColor" strokeWidth="2"/>
            <line x1="30" y1="60" x2="70" y2="60" stroke="currentColor" strokeWidth="2"/>
            <line x1="30" y1="80" x2="80" y2="80" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <h3 className="empty-title">No projects found</h3>
          <p className="empty-description">Check back soon for new design showcases</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-grid-container">
      <div className={`portfolio-grid ${getGridColumns()}`}>
        {displayedProjects.map((project, index) => (
          <div 
            key={project.id || index} 
            className="portfolio-grid-item"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      <style jsx>{`
        .portfolio-grid-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .portfolio-grid {
          display: grid;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .grid-cols-1 {
          grid-template-columns: repeat(1, 1fr);
        }

        @media (min-width: 768px) {
          .md\\:grid-cols-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .lg\\:grid-cols-3 {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .lg\\:grid-cols-4 {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .portfolio-grid-item {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .portfolio-grid-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 4rem 1rem;
        }

        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-text {
          margin-top: 1.5rem;
          font-size: 1rem;
          color: #666;
          letter-spacing: 0.05em;
        }

        .portfolio-grid-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 4rem 1rem;
        }

        .empty-state {
          text-align: center;
          max-width: 400px;
        }

        .empty-icon {
          color: #ddd;
          margin: 0 auto 2rem;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 300;
          margin-bottom: 0.75rem;
          color: #333;
          letter-spacing: 0.02em;
        }

        .empty-description {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          letter-spacing: 0.01em;
        }

        @media (max-width: 767px) {
          .portfolio-grid {
            gap: 1.5rem;
          }

          .portfolio-grid-container {
            padding: 0 0.75rem;
          }
        }

        @media (min-width: 1400px) {
          .portfolio-grid {
            gap: 2.5rem;
          }
        }

        /* Hover effects for the entire grid */
        .portfolio-grid:hover .portfolio-grid-item {
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .portfolio-grid .portfolio-grid-item:hover {
          opacity: 1;
        }

        /* Masonry-style adjustments for varied heights */
        @supports (grid-template-rows: masonry) {
          .portfolio-grid {
            grid-template-rows: masonry;
            align-items: start;
          }
        }
      `}</style>
    </div>
  );
}