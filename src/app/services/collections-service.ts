export const getCollections = async (): Promise<any[]> => {
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
