import Hero from '@/components/Hero';
import PortfolioGrid from '@/components/PortfolioGrid';
import CTASection from '@/components/CTASection';

export const metadata = {
  title: 'Clean Lines Web Design | Modern Minimalist Design Agency',
  description: 'We create stunning, minimal web experiences with clean lines and modern aesthetics. Explore our portfolio of beautiful, functional designs.',
};

async function getFeaturedProjects() {
  try {
    const backendPort = process.env.BACKEND_PORT || '4000';
    const backendHost = process.env.BACKEND_HOST || 'localhost';
    
    const res = await fetch(`https://${backendHost}:${backendPort}/api/portfolio?featured=true&limit=6`, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!res.ok) {
      console.error('Failed to fetch featured projects:', res.status);
      return [];
    }
    
    const data = await res.json();
    return data.projects || [];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <main className="homepage">
      <Hero />
      
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Work</h2>
          <div className="title-line"></div>
          <p className="section-description">
            A curated selection of our finest projects, each crafted with precision and an unwavering commitment to clean design principles.
          </p>
        </div>
        
        <PortfolioGrid projects={featuredProjects} featured={true} />
        
        <div className="view-all-container">
          <a href="/portfolio" className="view-all-link">
            View All Projects
            <span className="arrow">→</span>
          </a>
        </div>
      </section>

      <section className="philosophy-section">
        <div className="philosophy-content">
          <div className="philosophy-text">
            <h2 className="philosophy-title">Our Design Philosophy</h2>
            <div className="vertical-line"></div>
            <p className="philosophy-description">
              We believe that great design is invisible. It guides users naturally, communicates clearly, and elevates content without distraction. Every pixel serves a purpose. Every line has meaning.
            </p>
            <p className="philosophy-description">
              Clean lines aren't just an aesthetic choice—they're a commitment to clarity, simplicity, and timeless design that withstands fleeting trends.
            </p>
            <a href="/about" className="philosophy-link">
              Learn More About Us
            </a>
          </div>
          <div className="philosophy-visual">
            <div className="clean-lines-grid">
              <div className="grid-line horizontal"></div>
              <div className="grid-line horizontal"></div>
              <div className="grid-line horizontal"></div>
              <div className="grid-line vertical"></div>
              <div className="grid-line vertical"></div>
              <div className="grid-line vertical"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="section-header centered">
          <h2 className="section-title">What We Do</h2>
          <div className="title-line centered"></div>
        </div>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="2"/>
                <line x1="8" y1="16" x2="40" y2="16" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="service-title">Web Design</h3>
            <div className="service-line"></div>
            <p className="service-description">
              Custom websites that blend minimal aesthetics with maximum impact, crafted pixel-perfect for every device.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 8 L24 24 L32 32" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="service-title">Brand Identity</h3>
            <div className="service-line"></div>
            <p className="service-description">
              Cohesive visual identities that communicate your values through refined typography and strategic simplicity.
            </p>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="12" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="36" x2="24" y2="36" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="service-title">User Experience</h3>
            <div className="service-line"></div>
            <p className="service-description">
              Intuitive interfaces designed around user needs, removing friction and creating delightful digital experiences.
            </p>
          </div>
        </div>
      </section>

      <CTASection 
        title="Ready to elevate your digital presence?"
        description="Let's create something beautiful together. Clean, minimal, and uniquely yours."
        buttonText="Start a Project"
        buttonLink="/contact"
      />

      <style>{`
        .homepage {
          min-height: 100vh;
        }

        .featured-section {
          padding: 120px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-header.centered {
          text-align: center;
        }

        .section-title {
          font-size: 48px;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
          color: #000;
        }

        .title-line {
          width: 80px;
          height: 1px;
          background: #000;
          margin: 0 auto 32px;
        }

        .title-line.centered {
          margin: 0 auto 32px;
        }

        .section-description {
          font-size: 18px;
          line-height: 1.8;
          color: #333;
          max-width: 720px;
          margin: 0 auto;
        }

        .view-all-container {
          text-align: center;
          margin-top: 80px;
        }

        .view-all-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #000;
          text-decoration: none;
          padding: 16px 32px;
          border: 1px solid #000;
          transition: all 0.3s ease;
        }

        .view-all-link:hover {
          background: #000;
          color: #fff;
        }

        .view-all-link .arrow {
          transition: transform 0.3s ease;
        }

        .view-all-link:hover .arrow {
          transform: translateX(4px);
        }

        .philosophy-section {
          background: #fafafa;
          padding: 120px 24px;
        }

        .philosophy-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 120px;
          align-items: center;
        }

        .philosophy-title {
          font-size: 42px;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: 32px;
          color: #000;
        }

        .vertical-line {
          width: 1px;
          height: 60px;
          background: #000;
          margin-bottom: 32px;
        }

        .philosophy-description {
          font-size: 18px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 24px;
        }

        .philosophy-link {
          display: inline-block;
          margin-top: 16px;
          font-size: 16px;
          font-weight: 500;
          color: #000;
          text-decoration: none;
          border-bottom: 1px solid #000;
          padding-bottom: 4px;
          transition: opacity 0.3s ease;
        }

        .philosophy-link:hover {
          opacity: 0.6;
        }

        .philosophy-visual {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .clean-lines-grid {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .grid-line {
          position: absolute;
          background: #d0d0d0;
        }

        .grid-line.horizontal {
          width: 100%;
          height: 1px;
          left: 0;
        }

        .grid-line.horizontal:nth-child(1) {
          top: 25%;
        }

        .grid-line.horizontal:nth-child(2) {
          top: 50%;
        }

        .grid-line.horizontal:nth-child(3) {
          top: 75%;
        }

        .grid-line.vertical {
          height: 100%;
          width: 1px;
          top: 0;
        }

        .grid-line.vertical:nth-child(4) {
          left: 25%;
        }

        .grid-line.vertical:nth-child(5) {
          left: 50%;
        }

        .grid-line.vertical:nth-child(6) {
          left: 75%;
        }

        .services-section {
          padding: 120px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 60px;
          margin-top: 80px;
        }

        .service-card {
          text-align: center;
          padding: 40px 32px;
          transition: transform 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-8px);
        }

        .service-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 24px;
          color: #000;
        }

        .service-title {
          font-size: 24px;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
          color: #000;
        }

        .service-line {
          width: 40px;
          height: 1px;
          background: #000;
          margin: 0 auto 20px;
        }

        .service-description {
          font-size: 16px;
          line-height: 1.7;
          color: #555;
        }

        @media (max-width: 1024px) {
          .philosophy-content {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .philosophy-visual {
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .featured-section,
          .philosophy-section,
          .services-section {
            padding: 80px 24px;
          }

          .section-title {
            font-size: 36px;
          }

          .philosophy-title {
            font-size: 32px;
          }

          .section-description,
          .philosophy-description {
            font-size: 16px;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .section-header {
            margin-bottom: 60px;
          }

          .view-all-container {
            margin-top: 60px;
          }
        }
      `}</style>
    </main>
  );
}