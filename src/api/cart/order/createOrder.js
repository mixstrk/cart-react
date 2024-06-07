export async function createOrder(orderInformation) {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderInformation: orderInformation }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to create order: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      })
  })
}
