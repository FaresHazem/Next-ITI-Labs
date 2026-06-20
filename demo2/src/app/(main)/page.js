import React from "react";
import HomeComponent from "@/components/HomeComponent";

export const metadata = {
  title: "Next.js Masterclass Portal",
  description: "A premium demo application showing Next.js layouts, credentials authorization, and data fetching.",
};

export default function Home() {
  return (
    <div className="container py-5" style={{ maxWidth: "800px" }}>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-dark mb-2">Next.js Demo Portal</h1>
        <p className="text-secondary fs-5">
          Explore layouts, credentials authorization, dynamic data fetching, and responsive search modules.
        </p>
      </div>

      <main>
        <HomeComponent />
      </main>
    </div>
  );
}
