"use client";

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ProductForm from '@/components/ProductForm';

export default function ProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Search & Filter state
  const [searchInput, setSearchInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('all');
  const [sortInput, setSortInput] = useState('none');

  // Deferred values using useTransition
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [isPending, startTransition] = useTransition();

  // Fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load products. Please check database connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [session]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    startTransition(() => {
      setSearchQuery(val);
    });
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategoryInput(val);
    startTransition(() => {
      setSelectedCategory(val);
    });
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortInput(val);
    startTransition(() => {
      setSortBy(val);
    });
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  // Extract unique categories
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filtration & sorting
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.rating - a.rating;
    if (sortBy === 'rating-asc') return a.rating - b.rating;
    return 0;
  });

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container py-4">
      {/* Header section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-0">Products Catalog</h2>
          <p className="text-muted small mb-0">
            {session 
              ? "All products visible (Administrator Mode)" 
              : "Guest view: showing first 3 products. Sign in to view all."}
          </p>
        </div>

        {session && (
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowForm(!showForm);
            }}
            className="btn btn-dark rounded-pill px-3 py-2 fw-semibold btn-sm"
          >
            {showForm && !editingProduct ? "Close Form" : "Add Product"}
          </button>
        )}
      </div>

      {/* Product Form Display */}
      {session && showForm && (
        <div className="mb-4">
          <ProductForm
            product={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(null);
            }}
          />
        </div>
      )}

      {/* Search and Filters */}
      <div className="card shadow-sm border p-3 mb-4 bg-light">
        <div className="row g-2">
          {/* Search bar */}
          <div className="col-md-6">
            <input
              type="text"
              className="form-control border shadow-sm-hover"
              placeholder="Search products..."
              value={searchInput}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Dropdown */}
          <div className="col-md-3">
            <select
              className="form-select border"
              value={categoryInput}
              onChange={handleCategoryChange}
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="col-md-3">
            <select
              className="form-select border"
              value={sortInput}
              onChange={handleSortChange}
            >
              <option value="none">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading / Error States */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-dark spinner-border-sm" role="status"></div>
          <span className="ms-2 text-muted small">Loading products...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center p-4 rounded-3" role="alert">
          <div>{error}</div>
          <button className="btn btn-sm btn-outline-danger mt-2 rounded-pill px-3" onClick={fetchProducts}>
            Retry
          </button>
        </div>
      ) : (
        /* Products Grid */
        <div className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
          {sortedProducts.length > 0 ? (
            sortedProducts.map((p) => {
              const discountedPrice = p.discountPercentage > 0
                ? (p.price * (1 - p.discountPercentage / 100)).toFixed(2)
                : p.price.toFixed(2);

              return (
                <div key={p._id} className="col">
                  <div className="card h-100 border shadow-sm rounded-3 overflow-hidden product-card bg-white">
                    {/* Thumbnail */}
                    <div className="bg-light text-center py-3 position-relative" style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="img-fluid object-fit-contain"
                        style={{ maxHeight: '150px', width: 'auto' }}
                      />
                      {p.discountPercentage > 0 && (
                        <span className="badge bg-danger position-absolute top-0 end-0 m-2 px-2 py-1 small rounded-pill">
                          -{Math.round(p.discountPercentage)}%
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="card-body d-flex flex-column p-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="text-uppercase text-muted fw-semibold small" style={{ fontSize: '0.75rem' }}>{p.category}</span>
                        <span className="text-warning small">★ {p.rating}</span>
                      </div>
                      
                      <h6 className="card-title fw-bold text-dark mb-1 line-clamp-1">{p.title}</h6>
                      <p className="card-text text-muted mb-3 small flex-grow-1 line-clamp-2">{p.description}</p>
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div>
                          {p.discountPercentage > 0 ? (
                            <>
                              <span className="text-decoration-line-through text-muted small me-1">${p.price}</span>
                              <span className="text-success fw-bold">${discountedPrice}</span>
                            </>
                          ) : (
                            <span className="text-dark fw-bold">${p.price}</span>
                          )}
                        </div>
                        
                        <div className="d-flex gap-1">
                          <Link href={`/products/${p._id}`} className="btn btn-dark btn-xs rounded-pill px-2.5 py-1 text-xs fw-semibold small" style={{ fontSize: '0.8rem' }}>
                            Details
                          </Link>

                          {session && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleEditClick(p)}
                                className="btn btn-outline-secondary btn-xs rounded-pill px-2 py-1 small"
                                style={{ fontSize: '0.8rem' }}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(p._id)}
                                className="btn btn-outline-danger btn-xs rounded-pill px-2 py-1 small"
                                style={{ fontSize: '0.8rem' }}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <div className="text-muted">No products found</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
