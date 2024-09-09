export const getProducts = async (categoryId: string): Promise<any[]> => {
  try {
    const response = await fetch(`/api/products?category-id=${categoryId}`);
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
