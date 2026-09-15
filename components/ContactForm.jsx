'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus(null);

    try {
      const backendPort = process.env.NEXT_PUBLIC_BACKEND_PORT || '3001';
      const response = await fetch(`https://${window.location.hostname}:${backendPort}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit contact form');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message. We will get back to you soon.'
      });
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            disabled={isSubmitting}
            placeholder="Your name"
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            disabled={isSubmitting}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
            disabled={isSubmitting}
            placeholder="Tell us about your project..."
            rows="6"
          />
          {errors.message && (
            <span className={styles.errorMessage}>{errors.message}</span>
          )}
        </div>

        {submitStatus && (
          <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}