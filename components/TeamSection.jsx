'use client';

import { useState } from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Creative Director',
    bio: 'Leading design vision with over 10 years of experience in minimalist web design.',
    image: '/images/team/sarah.jpg'
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Lead Developer',
    bio: 'Crafting clean, performant code that brings elegant designs to life.',
    image: '/images/team/david.jpg'
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'UX Designer',
    bio: 'Creating intuitive user experiences through thoughtful, minimal design.',
    image: '/images/team/emma.jpg'
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    role: 'Brand Strategist',
    bio: 'Aligning visual identity with business goals through strategic thinking.',
    image: '/images/team/michael.jpg'
  }
];

export default function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState(null);

  return (
    <section className="team-section">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-title">Our Team</h2>
          <div className="title-line"></div>
          <p className="team-subtitle">
            A collective of passionate designers and developers dedicated to clean, functional design.
          </p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`team-member ${hoveredMember === member.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="member-image-container">
                <div className="member-image-placeholder">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="40" cy="30" r="12" stroke="currentColor" strokeWidth="1" />
                    <path
                      d="M20 60C20 50 28 44 40 44C52 44 60 50 60 60"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="member-overlay"></div>
              </div>

              <div className="member-divider"></div>

              <div className="member-info">
                <h3 className="member-name">{member.name}</h3>
                <div className="role-line"></div>
                <p className="member-role">{member.role}</p>
                <p className="member-bio">{member.bio}</p>
              </div>

              <div className="member-border-top"></div>
              <div className="member-border-right"></div>
              <div className="member-border-bottom"></div>
              <div className="member-border-left"></div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .team-section {
          padding: 120px 0;
          background-color: #ffffff;
          position: relative;
        }

        .team-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .team-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .team-title {
          font-size: 3rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin: 0 0 20px 0;
          color: #000000;
        }

        .title-line {
          width: 60px;
          height: 1px;
          background-color: #000000;
          margin: 0 auto 30px auto;
        }

        .team-subtitle {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #666666;
          max-width: 600px;
          margin: 0 auto;
          font-weight: 300;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
        }

        .team-member {
          background-color: #ffffff;
          padding: 40px 30px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          cursor: pointer;
        }

        .team-member::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid #e5e5e5;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .team-member.hovered::before {
          border-color: #000000;
        }

        .team-member.hovered {
          transform: translateY(-8px);
        }

        .member-border-top,
        .member-border-right,
        .member-border-bottom,
        .member-border-left {
          position: absolute;
          background-color: #000000;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .member-border-top,
        .member-border-bottom {
          left: 0;
          right: 0;
          height: 1px;
        }

        .member-border-top {
          top: 0;
          transform: scaleX(0);
          transform-origin: left;
        }

        .member-border-bottom {
          bottom: 0;
          transform: scaleX(0);
          transform-origin: right;
        }

        .member-border-left,
        .member-border-right {
          top: 0;
          bottom: 0;
          width: 1px;
        }

        .member-border-left {
          left: 0;
          transform: scaleY(0);
          transform-origin: top;
        }

        .member-border-right {
          right: 0;
          transform: scaleY(0);
          transform-origin: bottom;
        }

        .team-member.hovered .member-border-top,
        .team-member.hovered .member-border-bottom {
          opacity: 1;
          transform: scaleX(1);
        }

        .team-member.hovered .member-border-left,
        .team-member.hovered .member-border-right {
          opacity: 1;
          transform: scaleY(1);
        }

        .member-image-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 30px auto;
          border-radius: 50%;
          overflow: hidden;
          border: 1px solid #e5e5e5;
          transition: border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-member.hovered .member-image-container {
          border-color: #000000;
        }

        .member-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fafafa;
          color: #cccccc;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-member.hovered .member-image-placeholder {
          color: #000000;
        }

        .member-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0);
          transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-member.hovered .member-overlay {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .member-divider {
          width: 40px;
          height: 1px;
          background-color: #e5e5e5;
          margin: 0 auto 25px auto;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-member.hovered .member-divider {
          width: 60px;
          background-color: #000000;
        }

        .member-info {
          text-align: center;
        }

        .member-name {
          font-size: 1.5rem;
          font-weight: 400;
          margin: 0 0 15px 0;
          color: #000000;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .role-line {
          width: 30px;
          height: 1px;
          background-color: #cccccc;
          margin: 0 auto 12px auto;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .team-member.hovered .role-line {
          width: 40px;
          background-color: #000000;
        }

        .member-role {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #999999;
          margin: 0 0 20px 0;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .team-member.hovered .member-role {
          color: #000000;
        }

        .member-bio {
          font-size: 0.9375rem;
          line-height: 1.7;
          color: #666666;
          margin: 0;
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .team-section {
            padding: 80px 0;
          }

          .team-header {
            margin-bottom: 60px;
          }

          .team-title {
            font-size: 2rem;
          }

          .team-subtitle {
            font-size: 1rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .team-member {
            padding: 30px 20px;
          }
        }

        @media (max-width: 480px) {
          .team-section {
            padding: 60px 0;
          }

          .team-title {
            font-size: 1.75rem;
          }

          .member-name {
            font-size: 1.25rem;
          }

          .member-image-container {
            width: 100px;
            height: 100px;
          }

          .member-image-placeholder svg {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </section>
  );
}