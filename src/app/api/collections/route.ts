// app/api/collections/route.ts

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

const getCollections = async (): Promise<any[]> => {
  const { collections } = await medusa.collections.list({ limit: 30 });
  return collections;
};

// Handle different HTTP methods (GET, etc.)
export async function GET(req: NextRequest) {
  try {
    const collections = await getCollections();
    return NextResponse.json(collections);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return new NextResponse("Error fetching categories", { status: 500 });
  }
}
