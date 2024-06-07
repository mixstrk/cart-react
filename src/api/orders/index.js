export async function fetchOrders() {
  try {
    const response = await fetch("http://localhost:3000/api/orders");
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching orders: ${error.message}`);
  }
}
