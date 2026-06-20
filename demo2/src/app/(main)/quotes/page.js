import React from 'react';
import QuotesClient from '@/components/QuotesClient';

export const revalidate = 0; // Disable caching to fetch quotes dynamically on each request (SSR)

export const metadata = {
  title: "Daily Wisdom & Inspirational Quotes | NextJS Wisdom",
  description: "Read our collection of daily wisdom, motivational, and inspirational quotes, loaded dynamically with SSR.",
};

export default async function QuotesPage() {
  let quotes = [];
  try {
    const res = await fetch("https://dummyjson.com/quotes?limit=100", { cache: "no-store" });
    const data = await res.json();
    quotes = data.quotes || [];
  } catch (error) {
    console.error("Error fetching quotes in App Router:", error);
  }

  return (
    <div>
      <QuotesClient quotes={quotes} />
    </div>
  );
}
