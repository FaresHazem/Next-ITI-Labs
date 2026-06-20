"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
      <div className="text-center px-4" style={{ maxWidth: '550px' }}>
        <div className="error-icon-wrapper mb-4">
          <span className="error-emoji display-1 fw-bold text-danger">!</span>
        </div>
        
        <h1 className="fw-extrabold text-dark mb-3 display-3" style={{ letterSpacing: '-1px' }}>
          404 Error
        </h1>
        <p className="text-secondary fs-5 mb-4 leading-relaxed">
          Oops, something went wrong! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
          <Link href="/" className="btn btn-primary btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm hover-lift">
            Back To Home
          </Link>
          <button 
            type="button" 
            className="btn btn-dark btn-lg rounded-pill px-4 py-3 fw-bold shadow-sm hover-lift" 
            onClick={() => router.replace("/products")}
          >
            Back To Products
          </button>
        </div>
      </div>
    </div>
  );
}
