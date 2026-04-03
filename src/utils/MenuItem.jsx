import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../components/../utils/cartSlice";
import { FALLBACK_IMG } from "./Fallback";

const MenuItem = ({ item, onAdd }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  
  const cartItem = cartItems.find((cartItem) => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (onAdd) {
      onAdd(item);
    } else {
      dispatch(addItem(item));
    }
  };

  const handleIncrease = () => {
    dispatch(addItem(item));
  };

  const handleDecrease = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <div className="menu-row">
      {/* LEFT SIDE */}
      <div className="menu-left">
        <h3>{item.name}</h3>
        <p className="rating">⭐ 4.5</p>
        <p className="price">₹{item.price}</p>
      </div>

      {/* RIGHT SIDE */}
      <div className="menu-right">
        {quantity === 0 ? (
          <button className="add-btn" onClick={handleAdd}>
            ADD
          </button>
        ) : (
          <div className="quantity-counter">
            <button 
              className="qty-minus-btn"
              onClick={handleDecrease}
              title="Decrease quantity"
            >
              −
            </button>
            <span className="qty-count">{quantity}</span>
            <button 
              className="qty-plus-btn"
              onClick={handleIncrease}
              title="Increase quantity"
            >
              +
            </button>
          </div>
        )}
        <img src={item.img} onError={(e)=>{e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMG;
        }} alt={item.name} />
      </div>
    </div>
  );
};

export default MenuItem;
