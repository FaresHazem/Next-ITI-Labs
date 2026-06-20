import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Course Blog | Next.js Course Portal",
  description: "Browse Next.js articles and coursework updates.",
};

export default function BlogIndexPage() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 p-5 bg-white rounded-4">
        <h1 className="fw-bold text-dark mb-4">Blog Home</h1>
        <p className="text-secondary leading-relaxed mb-4">
          Read articles on React Server Components, hydration schemas, and routing:
        </p>
        <ul className="list-group list-group-flush" style={{ maxWidth: '400px' }}>
          <li className="list-group-item px-0 border-0">
            <Link href="/blog/first" className="text-primary fw-semibold fs-5 text-decoration-none">
              👉 First Blog Post
            </Link>
          </li>
          <li className="list-group-item px-0 border-0">
            <Link href="/blog/second" className="text-primary fw-semibold fs-5 text-decoration-none">
              👉 Second Blog Post
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
