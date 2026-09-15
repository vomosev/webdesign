'use client';

import { useState } from 'react';
import styles from './AuthForm.module.css';

export default function AuthForm({ fields, onSubmit, submitText = 'Submit', error }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    fields.forEach(field => {
      const value = formData[field.name];

      if (field.required && !value.trim()) {
        errors[field.name] = `${field.label} is required`;
        return;
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[field.name] = 'Please enter a valid email address';
        }
      }

      if (field.type === 'password' && value && field.minLength) {
        if (value.length < field.minLength) {
          errors[field.name] = `Password must be at least ${field.minLength} characters`;
        }
      }

      if (field.validate) {
        const customError = field.validate(value, formData);
        if (customError) {
          errors[field.name] = customError;
        }
      }
    });

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}

      {fields.map(field => (
        <div key={field.name} className={styles.fieldGroup}>
          <label htmlFor={field.name} className={styles.label}>
            {field.label}
            {field.required && <span className={styles.required}>*</span>}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              rows={field.rows || 4}
              className={`${styles.input} ${styles.textarea} ${
                validationErrors[field.name] ? styles.inputError : ''
              }`}
              disabled={isSubmitting}
            />
          ) : (
            <input
              id={field.name}
              type={field.type || 'text'}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              autoComplete={field.autoComplete}
              className={`${styles.input} ${
                validationErrors[field.name] ? styles.inputError : ''
              }`}
              disabled={isSubmitting}
            />
          )}

          {validationErrors[field.name] && (
            <span className={styles.fieldError} role="alert">
              {validationErrors[field.name]}
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : submitText}
      </button>
    </form>
  );
}