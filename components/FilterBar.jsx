'use client';

import { useState } from 'react';

export default function FilterBar({ onFilterChange, onSortChange }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('date-desc');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Design' },
    { id: 'branding', label: 'Branding' },
    { id: 'ui', label: 'UI/UX' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'print', label: 'Print' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' }
  ];

  const handleFilterClick = (categoryId) => {
    setActiveFilter(categoryId);
    if (onFilterChange) {
      onFilterChange(categoryId);
    }
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setActiveSort(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  return (
    <div className="filter-bar">
      <div className="filter-categories">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleFilterClick(category.id)}
            className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
            aria-label={`Filter by ${category.label}`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="sort-container">
        <label htmlFor="sort-select" className="sort-label">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={activeSort}
          onChange={handleSortChange}
          className="sort-select"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <style jsx>{`
        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
          margin-bottom: 3rem;
          border-bottom: 1px solid #e0e0e0;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .filter-categories {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.5rem 1.25rem;
          background: transparent;
          border: 1px solid #333;
          color: #333;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .filter-btn:hover {
          background: #f5f5f5;
          transform: translateY(-1px);
        }

        .filter-btn.active {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .filter-btn:focus {
          outline: 2px solid #000;
          outline-offset: 2px;
        }

        .sort-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sort-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .sort-select {
          padding: 0.5rem 2rem 0.5rem 1rem;
          background: #fff;
          border: 1px solid #333;
          color: #333;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          transition: all 0.3s ease;
        }

        .sort-select:hover {
          border-color: #000;
          background-color: #f9f9f9;
        }

        .sort-select:focus {
          outline: 2px solid #000;
          outline-offset: 2px;
          border-color: #000;
        }

        @media (max-width: 768px) {
          .filter-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }

          .filter-categories {
            width: 100%;
          }

          .sort-container {
            width: 100%;
            justify-content: space-between;
          }

          .sort-select {
            flex: 1;
            max-width: 200px;
          }
        }

        @media (max-width: 480px) {
          .filter-btn {
            padding: 0.4rem 1rem;
            font-size: 0.75rem;
          }

          .sort-label,
          .sort-select {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}