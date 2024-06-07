export async function fetchCartItems() {
  try {
    const response = await fetch("http://localhost:3000/api/cart/items");
    if (!response.ok) {
      throw new Error("Failed to fetch cart items");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching cart items: ${error.message}`);
  }
}
