"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ProductForm from '@/components/ProductForm';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const id = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);

  const fetchProductDetail = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized. You must sign in to view this product details.');
        }
        throw new Error('Product not found');
      }
      const data = await res.json();
      setProduct(data.product);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetail();
    }
  }, [id, session]);

  const handleDelete = async () => {
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
      router.push('/products');
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleEditSuccess = () => {
    setIsEditing(false);
    fetchProductDetail();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-white">
        <div className="spinner-border text-dark spinner-border-sm" role="status"></div>
        <span className="ms-2 text-muted small">Loading details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center p-4 rounded-3" role="alert">
          <h5 className="fw-bold mb-2">Access Restricted</h5>
          <p className="mb-3 small">{error}</p>
          <div className="d-flex justify-content-center gap-2">
            <Link href="/products" className="btn btn-dark btn-sm rounded-pill px-3">
              ← Back to Catalog
            </Link>
            {!session && (
              <button onClick={() => router.push('/auth/signin')} className="btn btn-outline-dark btn-sm rounded-pill px-3">
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const discountedPrice = product.discountPercentage > 0
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="container py-4" style={{ maxWidth: '800px' }}>
      {/* Action panel */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link href="/products" className="btn btn-outline-dark btn-sm rounded-pill px-3">
          ← Back to Catalog
        </Link>

        {session && (
          <div className="d-flex gap-1">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-dark btn-sm rounded-pill px-3"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-outline-danger btn-sm rounded-pill px-3"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing && session ? (
        <div className="mb-4">
          <ProductForm
            product={product}
            onSuccess={handleEditSuccess}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      ) : (
        /* Minimal Details view */
        <div className="card border shadow-sm rounded-3 p-4 bg-white mb-4">
          <div className="row g-4 align-items-center">
            {/* Left: Product Image */}
            <div className="col-md-5 text-center bg-light rounded p-3">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="img-fluid object-fit-contain"
                style={{ maxHeight: '250px' }}
              />
            </div>

            {/* Right: Product Info */}
            <div className="col-md-7">
              <span className="text-uppercase text-muted fw-bold small">{product.category}</span>
              <h2 className="fw-bold text-dark mt-1 mb-2">{product.title}</h2>
              
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="text-warning">★ {product.rating}</span>
                {product.brand && <span className="text-muted small">| Brand: {product.brand}</span>}
              </div>

              {/* Price section */}
              <div className="mb-3">
                {product.discountPercentage > 0 ? (
                  <div>
                    <span className="text-decoration-line-through text-muted small me-2">${product.price}</span>
                    <span className="text-success fw-bold fs-4">${discountedPrice}</span>
                    <span className="badge bg-danger rounded-pill ms-2 small">-{Math.round(product.discountPercentage)}%</span>
                  </div>
                ) : (
                  <span className="text-dark fw-bold fs-4">${product.price}</span>
                )}
              </div>

              <p className="text-secondary small leading-relaxed">{product.description}</p>
              
              <div className="mt-3 text-muted small">
                <span className={product.stock > 0 ? 'text-success fw-bold' : 'text-danger'}>
                  {product.stock > 0 ? `In Stock: ${product.stock} units` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Reviews Section */}
      <div className="mb-4">
        <h5 className="fw-bold text-dark mb-3">Reviews</h5>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="d-flex flex-column gap-2">
            {product.reviews.map((review, idx) => (
              <div key={idx} className="card border p-3 rounded-3 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <strong className="text-dark small">{review.reviewerName || 'Customer'}</strong>
                  <span className="text-warning small">★ {review.rating}</span>
                </div>
                <p className="text-muted small mb-0">"{review.comment}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted small">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
