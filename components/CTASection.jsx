'use client';

import { useRouter } from 'next/navigation';

export default function CTASection() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleViewPortfolio = () => {
    router.push('/portfolio');
  };

  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="line-separator top"></div>
        
        <div className="cta-content">
          <h2 className="cta-title">Ready to Elevate Your Digital Presence?</h2>
          <p className="cta-description">
            Experience the power of clean, purposeful design. Let us transform your vision into a stunning digital reality.
          </p>
          
          <div className="cta-buttons">
            <button 
              onClick={handleGetStarted}
              className="cta-button primary"
            >
              Get Started
            </button>
            <button 
              onClick={handleViewPortfolio}
              className="cta-button secondary"
            >
              View Our Work
            </button>
          </div>
        </div>

        <div className="line-separator bottom"></div>
      </div>

      <style jsx>{`
        .cta-section {
          width: 100%;
          padding: 120px 20px;
          background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%);
          position: relative;
          overflow: hidden;
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .line-separator {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #000000 50%,
            transparent 100%
          );
          position: absolute;
          left: 0;
        }

        .line-separator.top {
          top: 0;
        }

        .line-separator.bottom {
          bottom: 0;
        }

        .cta-content {
          text-align: center;
          padding: 60px 20px;
          position: relative;
        }

        .cta-title {
          font-size: 3.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0 0 24px 0;
          color: #000000;
          position: relative;
        }

        .cta-title::after {
          content: '';
          display: block;
          width: 80px;
          height: 2px;
          background: #000000;
          margin: 32px auto 0;
        }

        .cta-description {
          font-size: 1.25rem;
          line-height: 1.8;
          color: #4a4a4a;
          max-width: 700px;
          margin: 0 auto 48px;
          font-weight: 300;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 18px 48px;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid #000000;
          background: transparent;
          color: #000000;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-width: 200px;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #000000;
          transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .cta-button.primary {
          background: #000000;
          color: #ffffff;
        }

        .cta-button.primary::before {
          background: #ffffff;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .cta-button.secondary:hover::before {
          left: 0;
        }

        .cta-button.secondary:hover {
          color: #ffffff;
        }

        .cta-button.primary:hover {
          background: #1a1a1a;
          border-color: #1a1a1a;
        }

        .cta-button:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 80px 20px;
          }

          .cta-content {
            padding: 40px 0;
          }

          .cta-title {
            font-size: 2.5rem;
          }

          .cta-title::after {
            width: 60px;
            margin-top: 24px;
          }

          .cta-description {
            font-size: 1.1rem;
            margin-bottom: 36px;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 16px;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
            padding: 16px 36px;
          }
        }

        @media (max-width: 480px) {
          .cta-section {
            padding: 60px 16px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-description {
            font-size: 1rem;
          }

          .cta-button {
            font-size: 0.9rem;
            padding: 14px 32px;
          }
        }
      `}</style>
    </section>
  );
}