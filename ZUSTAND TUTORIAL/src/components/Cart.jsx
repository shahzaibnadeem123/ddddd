import { useCartStore } from "../store/cartstore";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );
  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );
  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
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
                background: "white",
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

export default Cart;