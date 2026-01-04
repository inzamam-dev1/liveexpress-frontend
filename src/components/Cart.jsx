import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";
import { FALLBACK_IMG } from "../utils/Fallback";


const Cart = () => {
   
  const cartItem = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // EMPTY CART
  if (cartItem.length === 0) {
    return (
      <div className="empty-cart">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Empty cart"
        />
        <h2>Your cart is empty</h2>
        <p>Add items to see them here</p>
      </div>
    );
  }

  // TOTAL CALCULATION
  const itemTotal = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 40;
  const grandTotal = itemTotal + deliveryFee;

  return (
    <div className="cart-page">
      {/* LEFT SIDE - CART ITEMS */}
      <div className="cart-left">
        <div className="cart-header">
          <div className="cart-title-row">

            <button
              className="clear-btn inline"
              onClick={() => dispatch(clearCart())}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="cart-items">
          {cartItem.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                className="cart-item-img"
                src={item.img}
                onError={(e)=>{
                   e.currentTarget.onerror=null
                   e.currentTarget.src=FALLBACK_IMG;
                }}
                alt={item.name}
              />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>

                <div className="quantity-control">
                  <button onClick={() => dispatch(removeItem(item.id))}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addItem(item))}>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - BILL DETAILS */}
      <div className="cart-right">
        <div className="bill-box">
          <h3>Bill Details</h3>

          <div className="bill-row">
            <span>Item Total</span>
            <span>₹ {itemTotal}</span>
          </div>

          <div className="bill-row">
            <span>Delivery Fee</span>
            <span>₹ {deliveryFee}</span>
          </div>

          <hr />

          <div className="bill-row total">
            <span>To Pay</span>
            <span>₹ {grandTotal}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>


          {/* FAKE POLICY BUTTON */}
          <button className="policy-btn">
            Read company policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
