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

const getCategories = async (): Promise<Category[]> => {
  const { product_categories } = await medusa.productCategories.list();
  return product_categories as Category[];
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  const { product_category } = await medusa.productCategories.retrieve(id);
  return product_category as Category;
};

const getCategoryByHandle = async (
  handle: string
): Promise<Category | null> => {
  const { product_categories } = await medusa.productCategories.list({
    handle: handle,
  });
  return (product_categories[0] as Category) || null;
};

// Handle different HTTP methods (GET, etc.)
export async function GET(req: NextRequest) {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse("Error fetching categories", { status: 500 });
  }
}
