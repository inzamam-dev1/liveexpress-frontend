import { useState, useEffect } from "react";

const OrderTracking = () => {
  const [orderStatus, setOrderStatus] = useState("confirmed");
  const [deliveryTime, setDeliveryTime] = useState(23);
  const [deliveryPerson, setDeliveryPerson] = useState({
    name: "Raj Kumar",
    phone: "+91 98765 43210",
    rating: 4.8,
    vehicle: "Bike (KA-01-AB-1234)",
  });

  const statuses = ["confirmed", "preparing", "ontheway", "delivered"];
  const statusMessages = {
    confirmed: "Your order has been confirmed",
    preparing: "Your food is being prepared",
    ontheway: "Your order is on the way",
    delivered: "Your order has been delivered",
  };

  // Simulate status progression
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStatus((prev) => {
        const currentIndex = statuses.indexOf(prev);
        const nextIndex = (currentIndex + 1) % statuses.length;
        return statuses[nextIndex];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Simulate delivery time countdown
  useEffect(() => {
    if (orderStatus !== "delivered") {
      const timer = setInterval(() => {
        setDeliveryTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [orderStatus]);

  const currentStatusIndex = statuses.indexOf(orderStatus);

  return (
    <div className="tracking-page">
      <div className="tracking-container">
        {/* Header */}
        <div className="tracking-header">
          <h1>📦 Order #12345</h1>
          <p>Tracking your delivery</p>
        </div>

        {/* Map Demo */}
        <div className="map-container">
          <div className="map-demo">
            <svg viewBox="0 0 400 300" className="map-svg">
              {/* Road */}
              <rect x="0" y="130" width="400" height="40" fill="#e0e0e0" />
              <line
                x1="0"
                y1="150"
                x2="400"
                y2="150"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="10,10"
              />

              {/* Restaurant */}
              <circle cx="50" cy="150" r="20" fill="#fc8019" />
              <text
                x="50"
                y="155"
                textAnchor="middle"
                fill="white"
                fontSize="20"
              >
                🍕
              </text>
              <text x="50" y="190" textAnchor="middle" fontSize="12">
                Restaurant
              </text>

              {/* Delivery Person Moving */}
              <circle
                cx={50 + (currentStatusIndex / statuses.length) * 300}
                cy="150"
                r="15"
                fill="#4f46e5"
                className="delivery-marker"
              />
              <text
                x={50 + (currentStatusIndex / statuses.length) * 300}
                y="155"
                textAnchor="middle"
                fill="white"
                fontSize="18"
              >
                🏍️
              </text>

              {/* Destination */}
              <circle cx="350" cy="150" r="20" fill="#10b981" />
              <text
                x="350"
                y="155"
                textAnchor="middle"
                fill="white"
                fontSize="20"
              >
                📍
              </text>
              <text x="350" y="190" textAnchor="middle" fontSize="12">
                Your Location
              </text>
            </svg>
          </div>
          <p className="map-subtitle">
            Distance: ~{Math.max(0, (3 - currentStatusIndex * 0.7).toFixed(1))}
            km away
          </p>
        </div>

        {/* Status Timeline */}
        <div className="status-timeline">
          {statuses.map((status, index) => (
            <div
              key={status}
              className={`status-item ${
                index <= currentStatusIndex ? "completed" : ""
              } ${status === orderStatus ? "active" : ""}`}
            >
              <div className="status-dot"></div>
              <div className="status-label">
                {status === "confirmed" && "Confirmed"}
                {status === "preparing" && "Preparing"}
                {status === "ontheway" && "On the way"}
                {status === "delivered" && "Delivered"}
              </div>
            </div>
          ))}
        </div>

        {/* Current Status Message */}
        <div className={`status-message ${orderStatus}`}>
          <h3>{statusMessages[orderStatus]}</h3>
          {orderStatus !== "delivered" && (
            <p className="eta">
              Estimated delivery in{" "}
              <strong>
                {Math.floor(deliveryTime / 60)}:
                {String(deliveryTime % 60).padStart(2, "0")}
              </strong>
            </p>
          )}
          {orderStatus === "delivered" && (
            <p className="delivered-msg">✅ Thank you for ordering!</p>
          )}
        </div>

        {/* Delivery Partner Info */}
        {orderStatus !== "confirmed" && orderStatus !== "preparing" && (
          <div className="delivery-info">
            <div className="partner-card">
              <div className="partner-avatar">🧑‍💼</div>
              <div className="partner-details">
                <h4>{deliveryPerson.name}</h4>
                <p className="rating">⭐ {deliveryPerson.rating}</p>
                <p className="vehicle">{deliveryPerson.vehicle}</p>
              </div>
              <button className="contact-btn">📞 Call</button>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Paneer Tikka Masala</span>
            <span>₹450</span>
          </div>
          <div className="summary-item">
            <span>Garlic Naan x2</span>
            <span>₹120</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>₹40</span>
          </div>
          <hr />
          <div className="summary-item total">
            <span>Total</span>
            <span>₹610</span>
          </div>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <button className="help-btn">❓ Need Help?</button>
          {orderStatus === "delivered" && (
            <button className="review-btn">⭐ Rate Order</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
