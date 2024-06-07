import { handleApiError } from "../../utils";

export async function addProductToCart(productId) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/api/cart/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: productId }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to add product to cart: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        resolve(data.cart_item);
      })
      .catch(error => {
        reject(error);
      })
  })
}
