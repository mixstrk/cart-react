export async function fetchProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error.message}`);
  }
}
