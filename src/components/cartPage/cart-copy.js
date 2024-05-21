import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import AppMinMax from "./minmax/minmax.js"
import OrderPage from "../orderPage/orderPage.js"
import { Button } from "react-bootstrap"

export default function Cart() {
  const [products, setProducts] = useState(getProducts())

  const navigate = useNavigate()

  const changeCnt = (i, cnt) => {
    const updatedProducts = [...products]
    updatedProducts[i] = {...updatedProducts[i], current: cnt}
    setProducts(updatedProducts)
  }

  const getTotalPrice = (products) =>  {
    return products.reduce((total, product) => {
      return total + (product.price * product.current)
     }, 0)
  }

  const getTotalProductsCount = (products) =>  {
   return products.reduce((total, product) => {
    return total + (product.current)
   }, 0)
  }

  const deleteProduct = (i) => {
    const updatedProducts = [...products]
    updatedProducts.splice(i, 1)
    setProducts(updatedProducts)
  }

  const proceedToCheckoutOrder = () => {
    navigate("/order", {
      state: { totalPrice: getTotalPrice(products), totalProductsCount: getTotalProductsCount(products) }
    })
  }

  const productsRows = products.map((product, i) => {
    return (
      <tr key={product.id}>
        <td className="delete-product-btn">
          <button onClick={() => deleteProduct(i)}>x</button>
        </td>
        <td>{product.title}</td>
        <td>{product.price}</td>
        <td>
          <AppMinMax min={1}
                      max={product.rest}
                      cnt={product.current}
                      onChange={(cnt) => changeCnt(i, cnt)}
            />
        </td>
        <td>{product.price * product.current}</td>
      </tr>
    )
  })

  const cartPage = (
    <div>
      <h2 style={{ textAlign: "center" }}>Cart</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <td style={{width: "30px"}}></td>
            <td>Title</td>
            <td>Price</td>
            <td style={{width: "100px"}}>Count</td>
            <td>Subtotal</td>
          </tr>
        </thead>
        <tbody>
          {productsRows}
        </tbody>
      </table>

      <div style={{ textAlign: "right" }}>
        <span>
          Total({getTotalProductsCount(products)}): <strong>{getTotalPrice(products)}₽</strong>
        </span>
        <div>
          <Button variant="dark" onClick={proceedToCheckoutOrder}>
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container">
      {cartPage}
      <hr />
    </div>
  )
}

function showCongrats(totalPrice) {
  return (
    <div>
      <h2>Thank you for the purchase!</h2>
      <span>The order cost is <strong>{totalPrice}₽</strong></span>
    </div>
  )
}

function getProducts(){
  return [
    { id: 100, title: "Iphone 200", price: 12000, rest: 10, current: 1 },
    { id: 101, title: "Samsung S200", price: 22000, rest: 5, current: 1 },
    { id: 102, title: "Poco X6", price: 2000, rest: 15, current: 2 },
    { id: 103, title: "One Plus", price: 10000, rest: 2, current: 1 },
    { id: 104, title: "Honor 2", price: 1000, rest: 15, current: 3 }
  ]
}
