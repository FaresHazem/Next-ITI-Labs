import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Second Post | Course Blog",
};

export default function SecondBlogPost() {
  return (
    <div className="container py-5">
      <div className="mb-4">
        <Link href="/blog" className="btn btn-outline-dark rounded-pill px-4">
          ← Back to Blog
        </Link>
      </div>
      <div className="card shadow-sm border-0 p-5 bg-white rounded-4">
        <h1 className="fw-bold text-dark mb-3">Second Blog Post</h1>
        <p className="text-secondary leading-relaxed mb-0">
          This is the second dynamic sub-post for the blog router. All rendering operations are fully managed inside Next.js App Router.
        </p>
      </div>
    </div>
  );
}
