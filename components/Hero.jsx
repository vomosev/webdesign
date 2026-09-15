'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (lineRef.current) {
      setTimeout(() => {
        lineRef.current.classList.add('expand');
      }, 300);
    }
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-text">Web Design Excellence</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Clean Lines.</span>
            <span className="title-line">Bold Vision.</span>
            <span className="title-line">Modern Design.</span>
          </h1>

          <div className="hero-line" ref={lineRef}></div>

          <p className="hero-description">
            We craft digital experiences that combine minimalist aesthetics with powerful functionality. 
            Every pixel, every line, every interaction designed with intention.
          </p>

          <div className="hero-actions">
            <Link href="/portfolio" className="btn btn-primary">
              View Our Work
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Start a Project
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-grid">
            <div className="grid-line grid-line-1"></div>
            <div className="grid-line grid-line-2"></div>
            <div className="grid-line grid-line-3"></div>
            <div className="grid-line grid-line-4"></div>
          </div>
          <div className="visual-shape"></div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
          padding: 2rem;
        }

        .hero-container {
          max-width: 1400px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s ease, transform 1s ease;
        }

        .hero.animate-in .hero-container {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-content {
          z-index: 2;
        }

        .hero-eyebrow {
          margin-bottom: 1.5rem;
          overflow: hidden;
        }

        .eyebrow-text {
          display: inline-block;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #666;
          position: relative;
          padding-bottom: 0.5rem;
          transform: translateY(100%);
          animation: slideUp 0.8s ease forwards;
          animation-delay: 0.2s;
        }

        .eyebrow-text::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 1px;
          background: #000;
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 300;
          line-height: 1.1;
          margin: 0 0 2rem 0;
          color: #000;
        }

        .title-line {
          display: block;
          overflow: hidden;
        }

        .title-line:nth-child(1) {
          animation: slideUp 1s ease forwards;
          animation-delay: 0.4s;
          transform: translateY(100%);
        }

        .title-line:nth-child(2) {
          animation: slideUp 1s ease forwards;
          animation-delay: 0.6s;
          transform: translateY(100%);
          font-weight: 400;
        }

        .title-line:nth-child(3) {
          animation: slideUp 1s ease forwards;
          animation-delay: 0.8s;
          transform: translateY(100%);
        }

        .hero-line {
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #000 0%, #666 100%);
          margin: 2rem 0;
          transition: width 1.2s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .hero-line.expand {
          width: 120px;
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #444;
          margin: 2rem 0 3rem 0;
          max-width: 540px;
          opacity: 0;
          animation: fadeIn 1s ease forwards;
          animation-delay: 1s;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeIn 1s ease forwards;
          animation-delay: 1.2s;
        }

        .btn {
          padding: 1rem 2.5rem;
          font-size: 1rem;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid #000;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: inline-block;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #000;
          transition: left 0.4s ease;
          z-index: -1;
        }

        .btn:hover::before {
          left: 0;
        }

        .btn-primary {
          background: #000;
          color: #fff;
          border-color: #000;
        }

        .btn-primary::before {
          background: #fff;
        }

        .btn-primary:hover {
          color: #000;
        }

        .btn-secondary {
          background: transparent;
          color: #000;
          border-color: #000;
        }

        .btn-secondary:hover {
          color: #fff;
        }

        .hero-visual {
          position: relative;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-grid {
          position: absolute;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .grid-line {
          width: 1px;
          height: 0;
          background: linear-gradient(180deg, transparent 0%, #ddd 50%, transparent 100%);
          margin: 0 auto;
          animation: growLine 1.5s ease forwards;
        }

        .grid-line-1 {
          animation-delay: 0.5s;
        }

        .grid-line-2 {
          animation-delay: 0.7s;
        }

        .grid-line-3 {
          animation-delay: 0.9s;
        }

        .grid-line-4 {
          animation-delay: 1.1s;
        }

        .visual-shape {
          width: 400px;
          height: 400px;
          border: 2px solid #000;
          position: relative;
          transform: rotate(45deg);
          opacity: 0;
          animation: fadeInRotate 1.5s ease forwards;
          animation-delay: 1.3s;
        }

        .visual-shape::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 70%;
          border: 1px solid #666;
        }

        .visual-shape::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40%;
          height: 40%;
          border: 1px solid #999;
        }

        @keyframes slideUp {
          to {
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes growLine {
          to {
            height: 100%;
          }
        }

        @keyframes fadeInRotate {
          from {
            opacity: 0;
            transform: rotate(45deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: rotate(45deg) scale(1);
          }
        }

        @media (max-width: 968px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .hero-visual {
            height: 400px;
          }

          .visual-shape {
            width: 300px;
            height: 300px;
          }

          .hero-title {
            font-size: clamp(2rem, 8vw, 3.5rem);
          }

          .hero-description {
            font-size: 1rem;
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: 1rem;
            min-height: 90vh;
          }

          .hero-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            text-align: center;
          }

          .visual-shape {
            width: 250px;
            height: 250px;
          }

          .hero-visual {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}