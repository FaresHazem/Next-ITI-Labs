import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params; // await params in Next.js 15/16

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Mock product detail for external ID" }, { status: 404 });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Check session
    const session = await getServerSession(authOptions);
    if (!session) {
      // Guest view: only the first 3 products are viewable.
      // Get the IDs of the first 3 products
      const firstThree = await Product.find({}).sort({ createdAt: -1 }).limit(3).select("_id");
      const firstThreeIds = firstThree.map(p => p._id.toString());

      if (!firstThreeIds.includes(product._id.toString())) {
        return NextResponse.json({ message: "Unauthorized. You must sign in to view this product." }, { status: 401 });
      }
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error in GET product by ID:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    // Check session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const body = await request.json();
      return NextResponse.json({
        message: "Product updated successfully (Mocked)",
        product: { _id: id, id: id, ...body }
      });
    }

    const body = await request.json();
    const { title, price, category, brand, description, thumbnail, stock, discountPercentage } = body;

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Update fields
    if (title !== undefined) product.title = title;
    if (price !== undefined) product.price = Number(price);
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (description !== undefined) product.description = description;
    if (thumbnail !== undefined) product.thumbnail = thumbnail;
    if (stock !== undefined) product.stock = Number(stock);
    if (discountPercentage !== undefined) product.discountPercentage = Number(discountPercentage);

    const updatedProduct = await product.save();
    return NextResponse.json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error in PUT product by ID:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    // Check session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Product deleted successfully (Mocked)" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE product by ID:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
