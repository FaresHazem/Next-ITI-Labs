import React from 'react';
import Link from 'next/link';

export const revalidate = 0; // SSR details mode

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`https://dummyjson.com/quotes/${id}`);
    const quote = await res.json();
    return {
      title: `Quote #${quote.id} Details | NextJS Wisdom`,
      description: `"${quote.quote}" - A quote by ${quote.author}`,
    };
  } catch (err) {
    return {
      title: "Quote Details",
    };
  }
}

export default async function QuoteDetailPage({ params }) {
  const { id } = await params;
  let quote = null;
  try {
    const res = await fetch(`https://dummyjson.com/quotes/${id}`, { cache: "no-store" });
    if (res.status === 404) {
      return (
        <div className="container py-5 text-center">
          <div className="alert alert-warning rounded-4 shadow-sm p-4">Quote Details Not Found</div>
        </div>
      );
    }
    quote = await res.json();
  } catch (error) {
    console.error("Error fetching quote details:", error);
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger rounded-4 shadow-sm p-4">Failed to load quote details.</div>
      </div>
    );
  }

  if (!quote) return null;

  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link href="/quotes" className="btn btn-outline-dark rounded-pill px-4 hover-lift">
          ← Back to Quotes
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden quote-detail-card position-relative p-5 text-center bg-white">
            <span className="giant-quote-mark position-absolute">“</span>
            
            <div className="position-relative z-index-2 py-4">
              <span className="badge bg-primary px-3 py-2 rounded-pill text-uppercase mb-4 shadow-sm" style={{ letterSpacing: '1px' }}>
                Quote #{quote.id}
              </span>
              
              <h2 className="quote-phrase fs-2 fw-medium text-dark lh-base mb-4 italic-text">
                "{quote.quote}"
              </h2>
              
              <div className="h4 text-primary fw-bold">— {quote.author}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
