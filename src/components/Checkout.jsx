import { useSelector } from "react-redux";
import { useState } from "react";

const Checkout = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("");

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = 40;
  const grandTotal = itemTotal + deliveryFee;

  const handlePlaceOrder = () => {
    alert("Order placed successfully (Demo)");
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {/* ADDRESS */}
      <div className="checkout-section">
        <h3>Delivery Address</h3>
        <p><strong>Home</strong></p>
        <p>123, ABC Street</p>
        <p>Lucknow, Uttar Pradesh</p>
        <button className="link-btn">Change Address</button>
      </div>

      {/* ORDER SUMMARY */}
      <div className="checkout-section">
        <h3>Order Summary</h3>

        {cartItems.map((item) => (
          <div className="summary-row" key={item.id}>
            <span>{item.name} × {item.quantity}</span>
            <span>₹ {item.price * item.quantity}</span>
          </div>
        ))}

        <div className="summary-row">
          <span>Item Total</span>
          <span>₹ {itemTotal}</span>
        </div>

        <div className="summary-row">
          <span>Delivery Fee</span>
          <span>₹ {deliveryFee}</span>
        </div>

        <div className="summary-row total">
          <span>To Pay</span>
          <span>₹ {grandTotal}</span>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="checkout-section">
        <h3>Payment Method</h3>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="cod"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          Cash on Delivery
        </label>

        <label className="payment-option">
          <input
            type="radio"
            name="payment"
            value="upi"
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          UPI
        </label>

        <label className="payment-option disabled">
          <input type="radio" disabled />
          Card (Coming Soon)
        </label>

        {/* 🔥 SHOW QR ONLY IF UPI SELECTED */}
        {paymentMethod === "upi" && (
          <div className="upi-box">
            <p>Scan QR to pay</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=demo@upi"
              alt="UPI QR"
            />
            <p className="upi-note">
              This is a demo QR (no real payment)
            </p>
          </div>
        )}
      </div>

      <button
        className="place-order-btn"
        onClick={handlePlaceOrder}
        disabled={!paymentMethod}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
