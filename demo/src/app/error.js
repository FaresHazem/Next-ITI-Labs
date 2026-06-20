"use client";

import React from "react";
import Link from "next/link";

export default function RootError({ error, reset }) {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
      <div className="text-center px-4" style={{ maxWidth: '550px' }}>
        <div className="error-icon-wrapper mb-4">
          <span className="error-emoji display-1 fw-bold text-danger">!</span>
        </div>
        
        <h1 className="fw-extrabold text-dark mb-3 display-3" style={{ letterSpacing: '-1px' }}>
          Application Error
        </h1>
        <p className="text-secondary fs-5 mb-4 leading-relaxed">
          Oops, something went wrong inside the application! A system exception was captured.
        </p>

        {error && (
          <div className="alert alert-danger text-start text-break mb-4 p-3 font-monospace small">
            {error.message || error.toString()}
          </div>
        )}

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
          <button 
            type="button"
            onClick={() => reset()}
            className="btn btn-primary btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm hover-lift"
          >
            Try Again
          </button>
          <Link href="/" className="btn btn-dark btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm hover-lift">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
