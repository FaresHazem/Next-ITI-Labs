"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function QuotesClient({ quotes }) {
  // Toast notification state
  const [activeToast, setActiveToast] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Setup interval to show quotes as toasts
  useEffect(() => {
    if (!quotes || quotes.length === 0) return;

    // Show first toast after 2 seconds
    const initialTimer = setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setActiveToast(randomQuote);
      setToastVisible(true);
    }, 2000);

    // Toast rotation interval
    const rotationInterval = setInterval(() => {
      // Trigger slide out
      setToastVisible(false);

      // Wait for slide-out transition before showing new quote
      setTimeout(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setActiveToast(randomQuote);
        setToastVisible(true);
      }, 500);
    }, 9000); // Cycles every 9 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(rotationInterval);
    };
  }, [quotes]);

  const handleCloseToast = () => {
    setToastVisible(false);
    setHasInteracted(true);
  };

  return (
    <>
      {/* Hero section */}
      <div className="quotes-hero text-center text-white py-5 mb-5 position-relative overflow-hidden">
        <div className="quotes-hero-overlay"></div>
        <div className="container position-relative z-index-2 py-4">
          <span className="badge bg-light text-primary mb-3 px-3 py-2 rounded-pill fw-semibold text-uppercase letter-spacing-2">Words of Wisdom</span>
          <h1 className="display-4 fw-bold mb-3">Daily Quotes & Inspiration</h1>
          <p className="lead text-white-50 max-w-600 mx-auto">
            Fuel your mind with thoughts from history's greatest thinkers, updated live.
          </p>
        </div>
      </div>

      <div className="container pb-5">
        {/* Quotes Grid */}
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {quotes.map((q) => (
            <div key={q.id} className="col">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 quote-card hover-glow d-flex flex-column justify-content-between position-relative">
                <span className="quote-mark position-absolute">“</span>
                <div className="z-index-2 mb-4">
                  <p className="quote-text fs-5 text-dark fw-medium leading-relaxed mb-0">
                    {q.quote}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-auto z-index-2 pt-3 border-top border-light">
                  <span className="text-primary fw-bold">— {q.author}</span>
                  <Link href={`/quotes/${q.id}`} className="btn btn-outline-primary btn-sm rounded-pill px-3 hover-lift small">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Persistent Animated Toast for Quotes Intervals */}
      {activeToast && !hasInteracted && (
        <div 
          className="toast-container position-fixed bottom-0 end-0 p-4 z-index-toast"
          style={{ transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)' }}
        >
          <div 
            className={`toast show border-0 shadow-lg rounded-4 overflow-hidden quote-toast-bubble ${
              toastVisible ? 'toast-slide-in' : 'toast-slide-out'
            }`}
            style={{ width: '350px', backgroundColor: '#fff' }}
          >
            {/* Top decorative gradient bar */}
            <div className="bg-gradient-primary" style={{ height: '4px', background: 'linear-gradient(90deg, #1e3c72, #2a5298)' }}></div>
            
            <div className="toast-header border-0 bg-white pt-3 px-3 pb-0 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <span className="fs-5">💡</span>
                <strong className="me-auto text-dark fw-bold">Wisdom of the Moment</strong>
              </div>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleCloseToast} 
                aria-label="Close"
                style={{ fontSize: '0.8rem' }}
              ></button>
            </div>
            
            <div className="toast-body px-3 pb-3 pt-2">
              <p className="text-secondary mb-2 italic-text" style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                "{activeToast.quote}"
              </p>
              <div className="text-end text-primary fw-semibold small">— {activeToast.author}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
