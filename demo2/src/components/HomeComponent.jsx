"use client";

import React from 'react';
import Link from 'next/link';

const HomeComponent = () => {
    const modules = [
        {
            title: "Products Catalog",
            description: "Explore our collection of items. Search, filter, and manage products in real time.",
            link: "/products",
        },
        {
            title: "Daily Quotes",
            description: "Browse daily quotes of wisdom, delivered with custom alerts.",
            link: "/quotes",
        },
        {
            title: "Recipes Book",
            description: "View dynamic, high-quality recipes with preparation guides.",
            link: "/recipes",
        },
        {
            title: "About & Blog",
            description: "Learn more about this system and browse development articles.",
            link: "/about",
        }
    ];

    return (
        <div className="py-2">
            <div className="row g-4">
                {modules.map((mod, idx) => (
                    <div key={idx} className="col-md-6">
                        <div className="card h-100 border shadow-sm p-4 rounded-3 bg-white hover-lift">
                            <h4 className="fw-bold text-dark mb-2">{mod.title}</h4>
                            <p className="text-muted mb-4 small">{mod.description}</p>
                            <div>
                                <Link href={mod.link} className="btn btn-dark btn-sm rounded-pill px-3 fw-semibold">
                                    Explore →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeComponent;