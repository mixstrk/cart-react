
export async function removeProductFromCart(productId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/items/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product from cart");
    }
  } catch (error) {
    throw error;
  }
}
