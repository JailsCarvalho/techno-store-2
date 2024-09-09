// app/api/categories/route.ts

import { NextRequest, NextResponse } from "next/server";
import Medusa from "@medusajs/medusa-js";

const MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL!;
const MEDUSA_API_KEY = process.env.MEDUSA_API_KEY;

const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3,
  publishableApiKey: MEDUSA_API_KEY,
});

export interface Category {
  id: string;
  name: string;
  handle: string;
  parent_category_id: string | null;
  // Add other properties as needed
}

const getProductsByCategory = async (categoryId: string): Promise<any[]> => {
  const { products } = await medusa.products.list({
    collection_id: [categoryId],
    region_id: "reg_01HY34BXGB49W4M81K5QY73QW1",
  });
  return products;
};

// Handle different HTTP methods (GET, etc.)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  try {
    const categoryId = searchParams.get("category-id");

    // Check if categoryId is provided
    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const products = await getProductsByCategory(categoryId);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse("Error fetching products", { status: 500 });
  }
}
