export async function fetchOrder(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/orders/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching order: ${error.message}`);
  }
}
