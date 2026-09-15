'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About', href: '/about' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    social: [
      { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
      { name: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
      { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
      { name: 'Dribbble', href: 'https://dribbble.com', icon: 'dribbble' },
    ],
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-section">
            <h3 className="footer-heading">Company</h3>
            <nav className="footer-nav">
              {footerLinks.company.map((link) => (
                <a key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Legal</h3>
            <nav className="footer-nav">
              {footerLinks.legal.map((link) => (
                <a key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-section">
            <h3 className="footer-heading">Follow Us</h3>
            <div className="footer-social">
              {footerLinks.social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section footer-newsletter">
            <h3 className="footer-heading">Stay Updated</h3>
            <p className="footer-newsletter-text">
              Subscribe to our newsletter for design insights and updates.
            </p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="footer-newsletter-input"
                aria-label="Email for newsletter"
              />
              <button type="submit" className="footer-newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Clean Lines Design. All rights reserved.
          </p>
          <p className="footer-tagline">
            Where simplicity meets sophistication
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background-color: #000;
          color: #fff;
          padding: 4rem 2rem 2rem;
          margin-top: 6rem;
          position: relative;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #fff 50%,
            transparent 100%
          );
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-heading {
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 1rem 0;
          position: relative;
          padding-bottom: 0.75rem;
        }

        .footer-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 2rem;
          height: 1px;
          background-color: #fff;
        }

        .footer-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          color: #999;
          text-decoration: none;
          font-size: 0.9375rem;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
          width: fit-content;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #fff;
          transition: width 0.3s ease;
        }

        .footer-link:hover {
          color: #fff;
        }

        .footer-link:hover::before {
          width: 100%;
        }

        .footer-social {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-social-link {
          color: #999;
          text-decoration: none;
          font-size: 0.9375rem;
          transition: all 0.3s ease;
          display: inline-block;
          width: fit-content;
        }

        .footer-social-link:hover {
          color: #fff;
          transform: translateX(4px);
        }

        .footer-newsletter {
          max-width: 350px;
        }

        .footer-newsletter-text {
          color: #999;
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0;
        }

        .footer-newsletter-form {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .footer-newsletter-input {
          flex: 1;
          padding: 0.75rem 1rem;
          background-color: transparent;
          border: 1px solid #333;
          color: #fff;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .footer-newsletter-input::placeholder {
          color: #666;
        }

        .footer-newsletter-input:focus {
          border-color: #fff;
        }

        .footer-newsletter-button {
          padding: 0.75rem 1.5rem;
          background-color: #fff;
          color: #000;
          border: 1px solid #fff;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .footer-newsletter-button:hover {
          background-color: transparent;
          color: #fff;
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background-color: #222;
          margin: 2rem 0;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copyright,
        .footer-tagline {
          color: #666;
          font-size: 0.875rem;
          margin: 0;
        }

        .footer-tagline {
          font-style: italic;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 3rem 1.5rem 1.5rem;
            margin-top: 4rem;
          }

          .footer-top {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .footer-newsletter-form {
            flex-direction: column;
          }

          .footer-newsletter-button {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}