'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link href={`/portfolio/${project.id}`} className="project-card">
      <div className="project-card-image-wrapper">
        {!imageError && project.image ? (
          <Image
            src={project.image}
            alt={project.title || 'Project'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            onError={handleImageError}
          />
        ) : (
          <div className="project-card-placeholder">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="60" height="60" stroke="currentColor" strokeWidth="2"/>
              <line x1="20" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="2"/>
              <line x1="20" y1="40" x2="60" y2="40" stroke="currentColor" strokeWidth="2"/>
              <line x1="20" y1="50" x2="45" y2="50" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        )}
      </div>
      <div className="project-card-content">
        <div className="project-card-line"></div>
        <h3 className="project-card-title">{project.title || 'Untitled Project'}</h3>
        {project.category && (
          <span className="project-card-category">{project.category}</span>
        )}
        {project.description && (
          <p className="project-card-description">{project.description}</p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="project-card-tags">
            {project.tags.map((tag, index) => (
              <span key={index} className="project-card-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        .project-card {
          display: block;
          position: relative;
          background: #ffffff;
          border: 1px solid #e0e0e0;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .project-card:hover {
          border-color: #000000;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-4px);
        }

        .project-card-image-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 66.67%;
          background: #f5f5f5;
          overflow: hidden;
        }

        .project-card:hover .project-card-image-wrapper img {
          transform: scale(1.05);
        }

        .project-card-image-wrapper img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cccccc;
          background: #fafafa;
        }

        .project-card-content {
          padding: 24px;
          position: relative;
        }

        .project-card-line {
          width: 40px;
          height: 1px;
          background: #000000;
          margin-bottom: 16px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card:hover .project-card-line {
          width: 60px;
        }

        .project-card-title {
          font-size: 20px;
          font-weight: 500;
          line-height: 1.3;
          margin: 0 0 8px 0;
          color: #000000;
          letter-spacing: -0.02em;
        }

        .project-card-category {
          display: inline-block;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #666666;
          margin-bottom: 12px;
        }

        .project-card-description {
          font-size: 14px;
          line-height: 1.6;
          color: #666666;
          margin: 12px 0 0 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }

        .project-card-tag {
          font-size: 11px;
          padding: 4px 10px;
          background: #f5f5f5;
          color: #666666;
          border: 1px solid #e0e0e0;
          transition: all 0.2s ease;
        }

        .project-card:hover .project-card-tag {
          background: #ffffff;
          border-color: #cccccc;
        }

        @media (max-width: 768px) {
          .project-card-content {
            padding: 20px;
          }

          .project-card-title {
            font-size: 18px;
          }

          .project-card-description {
            font-size: 13px;
            -webkit-line-clamp: 2;
          }
        }
      `}</style>
    </Link>
  );
}