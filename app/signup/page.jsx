'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function SignupPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fields = [
    {
      name: 'fullName',
      type: 'text',
      placeholder: 'Full Name',
      required: true,
      autoComplete: 'name'
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email Address',
      required: true,
      autoComplete: 'email'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      autoComplete: 'new-password',
      minLength: 8
    },
    {
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      required: true,
      autoComplete: 'new-password',
      minLength: 8
    }
  ];

  const validateForm = (formData) => {
    const fullName = formData.fullName?.trim();
    const email = formData.email?.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!fullName || fullName.length < 2) {
      setError('Please enter your full name');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumber) {
      setError('Password must contain uppercase, lowercase, and numbers');
      return false;
    }

    return true;
  };

  const handleSubmit = async (formData) => {
    setError('');
    
    if (!validateForm(formData)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create Account</h1>
          <div className="header-line"></div>
          <p>Join us to showcase your designs</p>
        </div>

        <AuthForm 
          fields={fields}
          onSubmit={handleSubmit}
          error={error}
          submitText={loading ? 'Creating Account...' : 'Sign Up'}
          disabled={loading}
        />

        <div className="signup-footer">
          <div className="footer-line"></div>
          <p>
            Already have an account?{' '}
            <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .signup-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
        }

        .signup-container {
          width: 100%;
          max-width: 480px;
          background: white;
          padding: 3rem 2.5rem;
          border: 1px solid #e0e0e0;
          position: relative;
        }

        .signup-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: black;
        }

        .signup-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .signup-header h1 {
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin: 0 0 1rem 0;
          color: black;
        }

        .header-line {
          width: 60px;
          height: 1px;
          background: black;
          margin: 0 auto 1rem auto;
        }

        .signup-header p {
          font-size: 0.95rem;
          color: #666;
          margin: 0;
          font-weight: 300;
        }

        .signup-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .footer-line {
          width: 40px;
          height: 1px;
          background: #ddd;
          margin: 0 auto 1.5rem auto;
        }

        .signup-footer p {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }

        .signup-footer a {
          color: black;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease;
        }

        .signup-footer a:hover {
          border-bottom-color: black;
        }

        @media (max-width: 640px) {
          .signup-container {
            padding: 2rem 1.5rem;
          }

          .signup-header h1 {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}