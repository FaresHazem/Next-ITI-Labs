"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/products";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMessage("Invalid credentials. Try username: admin, password: admin");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5" style={{ maxWidth: "480px", width: "100%" }}>
        <div className="text-center mb-4">
          <span className="display-4">🔐</span>
          <h2 className="fw-bold text-dark mt-3">Sign In</h2>
          <p className="text-muted">Access all products and CRUD operations</p>
        </div>

        {errorMessage && (
          <div className="alert alert-danger rounded-3 small" role="alert">
            ⚠️ {errorMessage}
          </div>
        )}

        {error && !errorMessage && (
          <div className="alert alert-danger rounded-3 small" role="alert">
            ⚠️ Authentication failed. Please check your credentials.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold text-secondary">Username</label>
            <input
              type="text"
              className="form-control form-control-lg border-2"
              id="username"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-secondary">Password</label>
            <input
              type="password"
              className="form-control form-control-lg border-2"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg w-100 rounded-pill py-3 fw-bold shadow-sm hover-lift d-flex justify-content-center align-items-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-muted small border-top pt-3">
          <p className="mb-1">Demo Credentials:</p>
          <p className="mb-0">
            Username: <strong className="text-dark">admin</strong> | Password: <strong className="text-dark">admin</strong>
          </p>
        </div>
      </div>

      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
        }
      `}</style>
    </div>
  );
}

export default function SignInPageWithSuspense() {
  return (
    <Suspense fallback={
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    }>
      <SignInPage />
    </Suspense>
  );
}
