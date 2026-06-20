import React from 'react';
import RecipeDetails from '@/components/RecipeDetails';

export const dynamicParams = true; // equivalent to fallback: 'blocking'

export async function generateStaticParams() {
  // Pre-generate the first few pages at build time
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);
    const recipe = await res.json();
    return {
      title: `${recipe.name || 'Recipe Details'} | Premium Recipe Book`,
      description: `Learn how to make ${recipe.name}. Ingredients, cooking instructions, and preparation times included.`,
    };
  } catch (err) {
    return {
      title: "Recipe Details",
    };
  }
}

export default async function RecipeDetailPage({ params }) {
  const { id } = await params;
  let recipe = null;
  try {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);
    if (res.status === 404) {
      return (
        <div className="container py-5 text-center">
          <div className="alert alert-warning rounded-4 shadow-sm p-4">Recipe details not found.</div>
        </div>
      );
    }
    recipe = await res.json();
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger rounded-4 shadow-sm p-4">Failed to load recipe details.</div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="container py-5">
      <RecipeDetails {...recipe} />
    </div>
  );
}
