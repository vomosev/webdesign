'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm from '@/components/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fields = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      placeholder: 'Enter your email',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      required: true,
    },
  ];

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <div className="line-divider"></div>
          <p>Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="error-message">
            <span>{error}</span>
          </div>
        )}

        <AuthForm
          fields={fields}
          onSubmit={handleSubmit}
          submitLabel={loading ? 'Signing in...' : 'Sign In'}
          disabled={loading}
        />

        <div className="login-footer">
          <div className="line-divider"></div>
          <p>
            Don't have an account?{' '}
            <Link href="/signup">Create one</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
        }

        .login-container {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          padding: 3rem 2.5rem;
          border: 1px solid #e0e0e0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .login-header h1 {
          font-size: 2rem;
          font-weight: 300;
          margin: 0 0 1rem 0;
          color: #1a1a1a;
          letter-spacing: -0.5px;
        }

        .login-header p {
          font-size: 0.95rem;
          color: #666;
          margin: 1rem 0 0 0;
          font-weight: 300;
        }

        .line-divider {
          width: 60px;
          height: 1px;
          background: #1a1a1a;
          margin: 0 auto;
        }

        .error-message {
          background: #fff5f5;
          border: 1px solid #ff4444;
          padding: 1rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .error-message span {
          color: #cc0000;
          font-size: 0.9rem;
          font-weight: 400;
        }

        .login-footer {
          margin-top: 2rem;
          text-align: center;
        }

        .login-footer p {
          margin: 1rem 0 0 0;
          font-size: 0.9rem;
          color: #666;
        }

        .login-footer a {
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid #1a1a1a;
          transition: opacity 0.2s ease;
        }

        .login-footer a:hover {
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .login-container {
            padding: 2rem 1.5rem;
          }

          .login-header h1 {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .login-page {
            padding: 1rem;
          }

          .login-container {
            padding: 1.5rem 1rem;
          }

          .login-header h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}