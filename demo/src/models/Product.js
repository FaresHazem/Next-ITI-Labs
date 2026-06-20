import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this product.'],
    maxlength: [100, 'Title cannot be more than 100 characters.'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price.'],
  },
  category: {
    type: String,
    default: 'general',
  },
  brand: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  thumbnail: {
    type: String,
    default: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  discountPercentage: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 10,
  },
  reviews: [
    {
      reviewerName: { type: String, default: 'Anonymous' },
      rating: { type: Number, default: 5 },
      comment: { type: String, default: '' },
      date: { type: Date, default: Date.now },
    }
  ]
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
