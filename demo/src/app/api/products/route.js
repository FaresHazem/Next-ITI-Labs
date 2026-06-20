import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  try {
    await connectToDatabase();

    // Check if seeding is needed
    const count = await Product.countDocuments();
    if (count === 0) {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=20");
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          const formatted = data.products.map(p => ({
            title: p.title,
            price: p.price,
            category: p.category,
            brand: p.brand || "",
            description: p.description || "",
            thumbnail: p.thumbnail || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
            rating: p.rating || 4.5,
            discountPercentage: p.discountPercentage || 0,
            stock: p.stock || 10,
            reviews: p.reviews || []
          }));
          await Product.insertMany(formatted);
        }
      } catch (err) {
        console.error("Failed to seed products during GET request:", err);
      }
    }

    // Check authentication session
    const session = await getServerSession(authOptions);

    let products;
    if (session) {
      // Return all products
      products = await Product.find({}).sort({ createdAt: -1 });
    } else {
      // Limit to 3 products
      // Retrieve the first 3 products
      products = await Product.find({}).sort({ createdAt: -1 }).limit(3);
    }

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error in products GET api:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    // Check session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized. Please sign in to create products." }, { status: 401 });
    }

    const body = await request.json();
    const { title, price, category, brand, description, thumbnail, stock, discountPercentage } = body;

    if (!title || price === undefined) {
      return NextResponse.json({ message: "Title and Price are required fields." }, { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      price: Number(price),
      category: category || "general",
      brand: brand || "",
      description: description || "",
      thumbnail: thumbnail || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      stock: stock !== undefined ? Number(stock) : 10,
      discountPercentage: discountPercentage !== undefined ? Number(discountPercentage) : 0,
      rating: 4.5, // default initial rating
      reviews: []
    });

    return NextResponse.json({ message: "Product created successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error in products POST api:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
