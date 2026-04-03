import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/cartSlice";
import { FALLBACK_IMG } from "../utils/Fallback";

const Grocery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const groceryItems = [
    {
      id: "g1",
      name: "Fresh Tomatoes",
      price: 60,
      category: "Vegetables",
      img: "https://images.unsplash.com/photo-1592924357615-bc4c2d1fef6e?w=300",
      quantity: 1,
    },
    {
      id: "g2",
      name: "Organic Spinach",
      price: 45,
      category: "Vegetables",
      img: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300",
      quantity: 1,
    },
    {
      id: "g3",
      name: "Fresh Milk (1L)",
      price: 55,
      category: "Dairy",
      img: "https://images.unsplash.com/photo-1585073659910-bee65f0b50c2?w=300",
      quantity: 1,
    },
    {
      id: "g4",
      name: "Cheddar Cheese",
      price: 250,
      category: "Dairy",
      img: "https://images.unsplash.com/photo-1618164436241-92473afd03e0?w=300",
      quantity: 1,
    },
    {
      id: "g5",
      name: "Whole Wheat Bread",
      price: 75,
      category: "Bakery",
      img: "https://images.unsplash.com/photo-1589985643862-8633ae675b69?w=300",
      quantity: 1,
    },
    {
      id: "g6",
      name: "Brown Eggs (12pcs)",
      price: 120,
      category: "Eggs",
      img: "https://images.unsplash.com/photo-1569718212847-f8b335efb9f8?w=300",
      quantity: 1,
    },
    {
      id: "g7",
      name: "Organic Apples",
      price: 150,
      category: "Fruits",
      img: "https://images.unsplash.com/photo-1560806887-1295db8edd8e?w=300",
      quantity: 1,
    },
    {
      id: "g8",
      name: "Banana Bunch",
      price: 50,
      category: "Fruits",
      img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300",
      quantity: 1,
    },
    {
      id: "g9",
      name: "Extra Virgin Olive Oil",
      price: 320,
      category: "Oils",
      img: "https://images.unsplash.com/photo-1601459315038-ba631a270e44?w=300",
      quantity: 1,
    },
    {
      id: "g10",
      name: "Basmati Rice (2kg)",
      price: 180,
      category: "Grains",
      img: "https://images.unsplash.com/photo-1586040896844-3d08dd3e43e0?w=300",
      quantity: 1,
    },
    {
      id: "g11",
      name: "Black Dal (1kg)",
      price: 140,
      category: "Legumes",
      img: "https://images.unsplash.com/photo-1585707033910-b8c47e42925b?w=300",
      quantity: 1,
    },
    {
      id: "g12",
      name: "Himalayan Salt",
      price: 80,
      category: "Spices",
      img: "https://images.unsplash.com/photo-1599599810694-b5ac4dd57f53?w=300",
      quantity: 1,
    },
  ];

  const filteredItems = groceryItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ["All", ...new Set(groceryItems.map((item) => item.category))];

  return (
    <div className="grocery-page">
      <div className="grocery-header">
        <h1>🛒 Fresh Grocery Store</h1>
        <p>Get fresh items delivered to your door</p>
      </div>

      <div className="grocery-search">
        <input
          type="text"
          placeholder="Search groceries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="grocery-search-input"
        />
      </div>

      <div className="grocery-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="grocery-card">
              <div className="grocery-img-container">
                <img
                  src={item.img}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_IMG;
                  }}
                />
                <span className="category-badge">{item.category}</span>
              </div>
              <div className="grocery-info">
                <h3>{item.name}</h3>
                <p className="grocery-price">₹{item.price}</p>
                {(() => {
                  const foundItem = cartItems.find((cartItem) => cartItem.id === item.id);
                  const quantity = foundItem ? foundItem.quantity : 0;

                  return quantity === 0 ? (
                    <button
                      className="add-to-cart-btn"
                      onClick={() => dispatch(addItem(item))}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="grocery-qty-counter">
                      <button
                        className="grocery-qty-btn minus"
                        onClick={() => dispatch(removeItem(item.id))}
                      >
                        −
                      </button>
                      <span className="grocery-qty-display">{quantity}</span>
                      <button
                        className="grocery-qty-btn plus"
                        onClick={() => dispatch(addItem(item))}
                      >
                        +
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          ))
        ) : (
          <div className="no-items">
            <p>No items found for "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Grocery;
