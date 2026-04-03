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
        <button className="continue-shopping-btn" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  // TOTAL CALCULATION
  const itemTotal = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 40;
  const gst = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + deliveryFee + gst;

  return (
    <div className="cart-page">
      {/* LEFT SIDE - CART ITEMS */}
      <div className="cart-left">
        <div className="cart-header">
          <h2>Your Cart ({cartItem.length})</h2>
          <button
            className="clear-btn"
            onClick={() => dispatch(clearCart())}
            title="Clear all items"
          >
            🗑️ Clear
          </button>
        </div>

        <div className="cart-items-list">
          {cartItem.map((item) => (
            <div className="cart-item-card" key={item.id}>
              <div className="cart-item-image">
                <img
                  src={item.img}
                  onError={(e)=>{
                     e.currentTarget.onerror=null
                     e.currentTarget.src=FALLBACK_IMG;
                  }}
                  alt={item.name}
                />
              </div>

              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button 
                    className="qty-btn" 
                    onClick={() => dispatch(removeItem(item.id))}
                    title="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => dispatch(addItem(item))}
                    title="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <div className="item-subtotal">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE - BILL DETAILS */}
      <div className="cart-right">
        <div className="bill-card">
          <h3>💰 Bill Details</h3>

          <div className="bill-section">
            <div className="bill-row">
              <span className="bill-label">Item Total</span>
              <span className="bill-value">₹{itemTotal}</span>
            </div>
            <div className="bill-row">
              <span className="bill-label">GST (5%)</span>
              <span className="bill-value">+₹{gst}</span>
            </div>
            <div className="bill-row">
              <span className="bill-label">Delivery Fee</span>
              <span className="bill-value">+₹{deliveryFee}</span>
            </div>
          </div>

          <div className="bill-divider"></div>

          <div className="bill-row bill-total">
            <span className="bill-label">To Pay</span>
            <span className="bill-value-total">₹{grandTotal}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <p className="bill-info">
            <small>Taxes calculated at checkout</small>
          </p>
        </div>

        {/* OFFERS SECTION */}
        <div className="offers-card">
          <h3>🎉 Offers for you</h3>
          <div className="offer-item">
            <span>🎫 Use code: FOOD20</span>
            <p>Get 20% off on orders above ₹500</p>
          </div>
          <div className="offer-item">
            <span>🚚 FREE delivery</span>
            <p>On orders above ₹1000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
