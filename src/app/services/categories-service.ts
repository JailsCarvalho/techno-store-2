import Medusa from "@medusajs/medusa-js";

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!;
const MEDUSA_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_API_KEY;

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

export const getCategories = async (): Promise<any[]> => {
  try {
    const response = await fetch("/api/collections");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
};
