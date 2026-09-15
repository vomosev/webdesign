import TeamSection from '@/components/TeamSection';

export const metadata = {
  title: 'About | Clean Lines Design',
  description: 'Learn about our design philosophy focused on clean lines, minimalism, and modern aesthetics.',
};

export default function AboutPage() {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="hero-title">Design Philosophy</h1>
          <div className="line-divider"></div>
          <p className="hero-subtitle">
            Where simplicity meets sophistication through clean lines and purposeful design
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section">
        <div className="container">
          <div className="content-grid">
            <div className="content-block">
              <h2 className="section-title">Clean Lines</h2>
              <div className="line-accent"></div>
              <p className="section-text">
                Every element serves a purpose. We believe in the power of restraint, 
                where each line, space, and form contributes to a cohesive whole. 
                Clean lines guide the eye and create visual harmony.
              </p>
            </div>

            <div className="content-block">
              <h2 className="section-title">Minimalism</h2>
              <div className="line-accent"></div>
              <p className="section-text">
                Less is more. By removing the unnecessary, we amplify what matters. 
                Our minimalist approach creates breathing room for content to shine 
                and users to focus on what truly matters.
              </p>
            </div>

            <div className="content-block">
              <h2 className="section-title">Modern Aesthetics</h2>
              <div className="line-accent"></div>
              <p className="section-text">
                Contemporary design requires timeless principles. We blend modern 
                trends with enduring design fundamentals to create experiences that 
                feel fresh today and remain elegant tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2 className="section-title-large">Our Mission</h2>
              <div className="line-divider-left"></div>
              <p className="mission-description">
                We craft digital experiences that embody clarity, precision, and elegance. 
                Our commitment to clean design principles ensures that every project we 
                undertake is a testament to thoughtful minimalism and user-centered thinking.
              </p>
              <p className="mission-description">
                Through careful attention to typography, spacing, and composition, we 
                create designs that communicate effectively while maintaining visual 
                sophistication. Our work speaks through its restraint and confidence.
              </p>
            </div>
            <div className="mission-visual">
              <div className="geometric-lines">
                <div className="line horizontal-line-1"></div>
                <div className="line horizontal-line-2"></div>
                <div className="line vertical-line-1"></div>
                <div className="line vertical-line-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title-center">Core Values</h2>
          <div className="line-divider-center"></div>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-number">01</div>
              <div className="value-line"></div>
              <h3 className="value-title">Clarity</h3>
              <p className="value-text">
                Design should communicate, not complicate. We prioritize clear 
                visual hierarchies and intuitive user experiences.
              </p>
            </div>

            <div className="value-item">
              <div className="value-number">02</div>
              <div className="value-line"></div>
              <h3 className="value-title">Precision</h3>
              <p className="value-text">
                Every pixel matters. Our attention to detail ensures that designs 
                are not just beautiful but meticulously crafted.
              </p>
            </div>

            <div className="value-item">
              <div className="value-number">03</div>
              <div className="value-line"></div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-text">
                We push boundaries while respecting fundamentals, finding new 
                ways to express timeless design principles.
              </p>
            </div>

            <div className="value-item">
              <div className="value-number">04</div>
              <div className="value-line"></div>
              <h3 className="value-title">Integrity</h3>
              <p className="value-text">
                Honest design that serves its purpose without pretense. We build 
                trust through transparency and authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title-center">Meet Our Team</h2>
          <div className="line-divider-center"></div>
          <p className="team-intro">
            A collective of designers, developers, and strategists united by a 
            passion for clean, purposeful design.
          </p>
          <TeamSection />
        </div>
      </section>

      {/* Approach Section */}
      <section className="approach-section">
        <div className="container">
          <h2 className="section-title-center">Our Approach</h2>
          <div className="line-divider-center"></div>
          <div className="approach-grid">
            <div className="approach-step">
              <div className="step-header">
                <span className="step-label">Step 1</span>
                <div className="step-line"></div>
              </div>
              <h3 className="approach-title">Discovery</h3>
              <p className="approach-text">
                We begin by understanding your vision, goals, and audience. 
                Through research and collaboration, we establish a foundation 
                for meaningful design solutions.
              </p>
            </div>

            <div className="approach-step">
              <div className="step-header">
                <span className="step-label">Step 2</span>
                <div className="step-line"></div>
              </div>
              <h3 className="approach-title">Strategy</h3>
              <p className="approach-text">
                We develop a clear strategy that aligns design decisions with 
                business objectives, ensuring every choice serves a purpose.
              </p>
            </div>

            <div className="approach-step">
              <div className="step-header">
                <span className="step-label">Step 3</span>
                <div className="step-line"></div>
              </div>
              <h3 className="approach-title">Execution</h3>
              <p className="approach-text">
                With precision and care, we bring the vision to life through 
                clean, modern design that exceeds expectations.
              </p>
            </div>

            <div className="approach-step">
              <div className="step-header">
                <span className="step-label">Step 4</span>
                <div className="step-line"></div>
              </div>
              <h3 className="approach-title">Refinement</h3>
              <p className="approach-text">
                We iterate and polish until every detail is perfect, ensuring 
                the final product embodies our commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-page {
          min-height: 100vh;
          background: var(--color-bg);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero Section */
        .about-hero {
          padding: 8rem 0 6rem;
          text-align: center;
          border-bottom: 1px solid var(--color-border);
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          color: var(--color-text);
        }

        .line-divider {
          width: 80px;
          height: 1px;
          background: var(--color-text);
          margin: 0 auto 2rem;
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--color-text-light);
          font-weight: 300;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Philosophy Section */
        .philosophy-section {
          padding: 6rem 0;
          border-bottom: 1px solid var(--color-border);
        }

        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 4rem;
        }

        .content-block {
          position: relative;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 300;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .line-accent {
          width: 60px;
          height: 1px;
          background: var(--color-text);
          margin-bottom: 1.5rem;
        }

        .section-text {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--color-text-light);
        }

        /* Mission Section */
        .mission-section {
          padding: 6rem 0;
          border-bottom: 1px solid var(--color-border);
        }

        .mission-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .section-title-large {
          font-size: 3rem;
          font-weight: 300;
          margin-bottom: 2rem;
          color: var(--color-text);
        }

        .line-divider-left {
          width: 80px;
          height: 1px;
          background: var(--color-text);
          margin-bottom: 2rem;
        }

        .mission-description {
          font-size: 1.125rem;
          line-height: 1.8;
          color: var(--color-text-light);
          margin-bottom: 1.5rem;
        }

        .mission-visual {
          position: relative;
          height: 400px;
        }

        .geometric-lines {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .line {
          position: absolute;
          background: var(--color-text);
        }

        .horizontal-line-1 {
          width: 80%;
          height: 1px;
          top: 20%;
          left: 10%;
        }

        .horizontal-line-2 {
          width: 60%;
          height: 1px;
          top: 60%;
          left: 20%;
        }

        .vertical-line-1 {
          width: 1px;
          height: 70%;
          left: 30%;
          top: 15%;
        }

        .vertical-line-2 {
          width: 1px;
          height: 50%;
          left: 70%;
          top: 25%;
        }

        /* Values Section */
        .values-section {
          padding: 6rem 0;
          border-bottom: 1px solid var(--color-border);
        }

        .section-title-center {
          font-size: 3rem;
          font-weight: 300;
          text-align: center;
          margin-bottom: 1.5rem;
          color: var(--color-text);
        }

        .line-divider-center {
          width: 80px;
          height: 1px;
          background: var(--color-text);
          margin: 0 auto 3rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 4rem;
          margin-top: 4rem;
        }

        .value-item {
          text-align: center;
        }

        .value-number {
          font-size: 3rem;
          font-weight: 200;
          color: var(--color-text-light);
          margin-bottom: 1rem;
        }

        .value-line {
          width: 40px;
          height: 1px;
          background: var(--color-text);
          margin: 0 auto 1.5rem;
        }

        .value-title {
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .value-text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-text-light);
        }

        /* Team Section */
        .team-section {
          padding: 6rem 0;
          border-bottom: 1px solid var(--color-border);
        }

        .team-intro {
          text-align: center;
          font-size: 1.25rem;
          color: var(--color-text-light);
          max-width: 600px;
          margin: 0 auto 4rem;
          line-height: 1.7;
        }

        /* Approach Section */
        .approach-section {
          padding: 6rem 0;
        }

        .approach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .approach-step {
          position: relative;
        }

        .step-header {
          margin-bottom: 1.5rem;
        }

        .step-label {
          font-size: 0.875rem;
          color: var(--color-text-light);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: block;
          margin-bottom: 0.75rem;
        }

        .step-line {
          width: 60px;
          height: 1px;
          background: var(--color-text);
        }

        .approach-title {
          font-size: 1.75rem;
          font-weight: 400;
          margin-bottom: 1rem;
          color: var(--color-text);
        }

        .approach-text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-text-light);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.125rem;
          }

          .mission-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .mission-visual {
            height: 300px;
          }

          .section-title-large {
            font-size: 2rem;
          }

          .content-grid,
          .values-grid,
          .approach-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .about-hero {
            padding: 6rem 0 4rem;
          }

          .philosophy-section,
          .mission-section,
          .values-section,
          .team-section,
          .approach-section {
            padding: 4rem 0;
          }
        }
      `}</style>
    </main>
  );
}