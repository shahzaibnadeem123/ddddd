import "./App.css";
import useCartStore from "./store/cartstore";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 80000,
  },
  {
    id: 2,
    name: "Mouse",
    price: 1500,
  },
  {
    id: 3,
    name: "Keyboard",
    price: 2500,
  },
  {
    id: 4,
    name: "Headphones",
    price: 4000,
  },
];

function App() {
  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      <h1>🛒 My Shopping Cart</h1>

      <h2>Products</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            width: "300px",
          }}
        >
          <h3>{product.name}</h3>

          <p>Price: Rs. {product.price}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}

      <hr />

      <h2>🛒 Cart</h2>

      <h3>Total Items: {totalItems}</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid green",
                padding: "15px",
                marginBottom: "10px",
                width: "400px",
              }}
            >
              <h3>{item.name}</h3>

              <p>Price: Rs. {item.price}</p>

              <p>Quantity: {item.quantity}</p>

              <button
                onClick={() => decreaseQuantity(item.id)}
              >
                -
              </button>

              <button
                onClick={() => increaseQuantity(item.id)}
              >
                +
              </button>

              <button
                onClick={() => removeFromCart(item.id)}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total Price: Rs. {totalPrice}</h2>
        </>
      )}
    </div>
  );
}

export default App;