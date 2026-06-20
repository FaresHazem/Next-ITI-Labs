import React from 'react';

export const metadata = {
  title: "About Us | Next.js Course Portal",
  description: "Learn more about the ITI Next.js Course Portal.",
};

export default function AboutPage() {
  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 p-5 bg-white rounded-4">
        <h1 className="fw-bold text-dark mb-3">About Component</h1>
        <p className="text-secondary fs-5 leading-relaxed">
          Welcome to the ITI Next.js Demonstration Portal. This project was developed to showcase advanced routing architectures, credentials authorization schemas, database integrations with MongoDB and Mongoose, and dynamic pre-rendering strategies (ISR and SSR) using Next.js.
        </p>
      </div>
    </div>
  );
}
