export async function fetchProduct(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
}
