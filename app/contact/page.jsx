'use client';

import { useState } from 'react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit contact form');
      }

      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <div className="title-line"></div>
          <p className="contact-subtitle">
            Have a project in mind? Let's discuss how we can bring your vision to life with clean, modern design.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <h2 className="section-title">Send us a message</h2>
            <div className="section-line"></div>
            {submitSuccess && (
              <div className="success-message">
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}
            <ContactForm onSubmit={handleFormSubmit} />
          </div>

          <div className="contact-info-section">
            <div className="info-block">
              <h2 className="section-title">Contact Information</h2>
              <div className="section-line"></div>
              <div className="info-items">
                <div className="info-item">
                  <h3 className="info-label">Email</h3>
                  <p className="info-value">hello@cleanlines.design</p>
                </div>
                <div className="info-divider"></div>
                <div className="info-item">
                  <h3 className="info-label">Phone</h3>
                  <p className="info-value">+1 (555) 123-4567</p>
                </div>
                <div className="info-divider"></div>
                <div className="info-item">
                  <h3 className="info-label">Office</h3>
                  <p className="info-value">
                    123 Design Street<br />
                    Creative District<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>

            <div className="info-block">
              <h2 className="section-title">Business Hours</h2>
              <div className="section-line"></div>
              <div className="info-items">
                <div className="info-item">
                  <h3 className="info-label">Monday - Friday</h3>
                  <p className="info-value">9:00 AM - 6:00 PM EST</p>
                </div>
                <div className="info-divider"></div>
                <div className="info-item">
                  <h3 className="info-label">Saturday</h3>
                  <p className="info-value">10:00 AM - 4:00 PM EST</p>
                </div>
                <div className="info-divider"></div>
                <div className="info-item">
                  <h3 className="info-label">Sunday</h3>
                  <p className="info-value">Closed</p>
                </div>
              </div>
            </div>

            <div className="info-block">
              <h2 className="section-title">Follow Us</h2>
              <div className="section-line"></div>
              <div className="social-links">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  Twitter
                </a>
                <div className="social-divider"></div>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  Instagram
                </a>
                <div className="social-divider"></div>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  LinkedIn
                </a>
                <div className="social-divider"></div>
                <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  Dribbble
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-cta">
          <div className="cta-line"></div>
          <p className="cta-text">
            Ready to start your project? We typically respond within 24 hours.
          </p>
        </div>
      </div>

      <style jsx>{`
        .contact-page {
          min-height: 100vh;
          padding: 8rem 2rem 4rem;
        }

        .contact-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 6rem;
        }

        .contact-title {
          font-size: 3.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          color: #000;
        }

        .title-line {
          width: 80px;
          height: 1px;
          background: #000;
          margin: 0 auto 2rem;
        }

        .contact-subtitle {
          font-size: 1.125rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          margin-bottom: 6rem;
        }

        .contact-form-section,
        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.01em;
          margin-bottom: 1rem;
          color: #000;
        }

        .section-line {
          width: 40px;
          height: 1px;
          background: #000;
          margin-bottom: 2rem;
        }

        .success-message {
          padding: 1.5rem;
          background: #f0f9f0;
          border-left: 2px solid #4caf50;
          margin-bottom: 2rem;
        }

        .success-message p {
          color: #2e7d32;
          font-size: 0.95rem;
        }

        .info-block {
          padding: 2rem;
          border: 1px solid #e0e0e0;
          transition: border-color 0.3s ease;
        }

        .info-block:hover {
          border-color: #000;
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .info-label {
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #999;
        }

        .info-value {
          font-size: 1rem;
          color: #333;
          line-height: 1.6;
        }

        .info-divider {
          width: 100%;
          height: 1px;
          background: #e0e0e0;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1rem;
        }

        .social-link {
          font-size: 0.95rem;
          color: #333;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .social-link:hover {
          color: #000;
        }

        .social-divider {
          width: 1px;
          height: 16px;
          background: #e0e0e0;
        }

        .bottom-cta {
          text-align: center;
          padding-top: 4rem;
          border-top: 1px solid #e0e0e0;
        }

        .cta-line {
          width: 60px;
          height: 1px;
          background: #000;
          margin: 0 auto 1.5rem;
        }

        .cta-text {
          font-size: 1rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .contact-page {
            padding: 6rem 1.5rem 3rem;
          }

          .contact-title {
            font-size: 2.5rem;
          }

          .contact-subtitle {
            font-size: 1rem;
          }

          .contact-content {
            grid-template-columns: 1fr;
            gap: 4rem;
          }

          .info-block {
            padding: 1.5rem;
          }

          .social-links {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .social-divider {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .contact-title {
            font-size: 2rem;
          }

          .section-title {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </main>
  );
}