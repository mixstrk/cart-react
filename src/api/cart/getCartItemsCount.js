export async function fetchCartItemsCount() {
  try {
    const response = await fetch("http://localhost:3000/api/cart/items/items_count");
    if (!response.ok) {
      throw new Error("Failed to fetch items count");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching items count: ${error.message}`);
  }
}
