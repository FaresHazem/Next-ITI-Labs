"use client";

import React, { useActionState } from 'react';

export default function ProductForm({ product, onSuccess, onCancel }) {
  const isEdit = !!product;

  // The form action handler passed to useActionState
  const handleFormSubmit = async (prevState, formData) => {
    const title = formData.get('title');
    const price = formData.get('price');
    const category = formData.get('category');
    const brand = formData.get('brand');
    const description = formData.get('description');
    const thumbnail = formData.get('thumbnail');
    const stock = formData.get('stock');
    const discountPercentage = formData.get('discountPercentage');

    // Basic Client-side Validation
    if (!title || !price) {
      return { success: false, error: "Title and Price are required." };
    }

    const payload = {
      title,
      price: Number(price),
      category: category || "general",
      brand: brand || "",
      description: description || "",
      thumbnail: thumbnail || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      stock: stock ? Number(stock) : 10,
      discountPercentage: discountPercentage ? Number(discountPercentage) : 0,
    };

    try {
      const url = isEdit ? `/api/products/${product._id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.message || "Something went wrong." };
      }

      // Trigger success callback
      if (onSuccess) {
        onSuccess(data.product);
      }

      return { success: true, message: isEdit ? "Product updated successfully!" : "Product created successfully!" };
    } catch (err) {
      console.error("Error submitting product form:", err);
      return { success: false, error: "Failed to connect to the server." };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, null);

  return (
    <div className="card shadow-lg border-0 rounded-4 p-4 bg-white">
      <h3 className="fw-bold text-dark mb-4">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h3>

      {state?.error && (
        <div className="alert alert-danger rounded-3" role="alert">
          Error: {state.error}
        </div>
      )}

      {state?.success && (
        <div className="alert alert-success rounded-3" role="alert">
          Success: {state.message}
        </div>
      )}

      <form action={formAction}>
        <div className="row g-3">
          {/* Title */}
          <div className="col-12">
            <label htmlFor="title" className="form-label fw-semibold text-secondary">Product Title <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control border-2"
              id="title"
              name="title"
              placeholder="e.g. Wireless Headset"
              defaultValue={product?.title || ''}
              required
            />
          </div>

          {/* Price & Discount */}
          <div className="col-md-6">
            <label htmlFor="price" className="form-label fw-semibold text-secondary">Price ($) <span className="text-danger">*</span></label>
            <input
              type="number"
              step="0.01"
              className="form-control border-2"
              id="price"
              name="price"
              placeholder="e.g. 99.99"
              defaultValue={product?.price || ''}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="discountPercentage" className="form-label fw-semibold text-secondary">Discount (%)</label>
            <input
              type="number"
              step="0.1"
              className="form-control border-2"
              id="discountPercentage"
              name="discountPercentage"
              placeholder="e.g. 15"
              defaultValue={product?.discountPercentage || 0}
            />
          </div>

          {/* Category & Brand */}
          <div className="col-md-6">
            <label htmlFor="category" className="form-label fw-semibold text-secondary">Category</label>
            <input
              type="text"
              className="form-control border-2"
              id="category"
              name="category"
              placeholder="e.g. electronics"
              defaultValue={product?.category || 'general'}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="brand" className="form-label fw-semibold text-secondary">Brand</label>
            <input
              type="text"
              className="form-control border-2"
              id="brand"
              name="brand"
              placeholder="e.g. Sony"
              defaultValue={product?.brand || ''}
            />
          </div>

          {/* Stock */}
          <div className="col-12">
            <label htmlFor="stock" className="form-label fw-semibold text-secondary">Stock Quantity</label>
            <input
              type="number"
              className="form-control border-2"
              id="stock"
              name="stock"
              placeholder="e.g. 50"
              defaultValue={product?.stock || 10}
            />
          </div>

          {/* Thumbnail URL */}
          <div className="col-12">
            <label htmlFor="thumbnail" className="form-label fw-semibold text-secondary">Thumbnail Image URL</label>
            <input
              type="url"
              className="form-control border-2"
              id="thumbnail"
              name="thumbnail"
              placeholder="https://example.com/image.jpg"
              defaultValue={product?.thumbnail || ''}
            />
            <div className="form-text text-muted">Leave empty to use a premium default placeholder.</div>
          </div>

          {/* Description */}
          <div className="col-12">
            <label htmlFor="description" className="form-label fw-semibold text-secondary">Description</label>
            <textarea
              className="form-control border-2"
              id="description"
              name="description"
              rows="3"
              placeholder="Write product specifications, dimensions, features..."
              defaultValue={product?.description || ''}
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          {onCancel && (
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4 fw-semibold"
              onClick={onCancel}
              disabled={isPending}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="btn btn-dark rounded-pill px-4 fw-semibold hover-lift d-flex align-items-center gap-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              isEdit ? "Update Product" : "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
