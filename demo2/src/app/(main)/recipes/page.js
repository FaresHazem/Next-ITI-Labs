import React from 'react';
import RecipesComponent from '@/components/RecipesComponent';

export const revalidate = 5; // Enable Incremental Static Regeneration (ISR) with a 5s revalidation window

export const metadata = {
  title: "Premium Recipes Book | Next.js ISR",
  description: "Browse delicious recipes loaded dynamically with Incremental Static Regeneration.",
};

export default async function RecipesPage() {
  let recipesData = { recipes: [] };
  try {
    const res = await fetch("https://dummyjson.com/recipes");
    recipesData = await res.json();
  } catch (error) {
    console.error("Error fetching recipes in App Router:", error);
  }

  return (
    <div className="container py-5">
      <RecipesComponent {...recipesData} />
    </div>
  );
}
