export const updateCartItemQuantity = async (itemId, quantity) => {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quantity })
    });

    if (!response.ok) {
      throw new Error("Failed to update cart item quantity");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    throw error;
  }
};
