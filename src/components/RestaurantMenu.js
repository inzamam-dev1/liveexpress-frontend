import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import MenuItem from "../utils/MenuItem";
import { BASE_URL } from "../utils/Fallback";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  useEffect(() => {
    fetch(`${BASE_URL}/menus`)
      .then((res) => res.json())
      .then((data) => {
        const selectedRes = data.find((item) => item.id === Number(id));
        setRestaurant(selectedRes);
      });
  }, [id]);

  if (!restaurant) return <h2>Loading...</h2>;

  return (
    <div className="restaurat-page">
      <h1>{restaurant.resName}</h1>

      <div className="menu-container">
        {restaurant.menu.map((item) => (
          <MenuItem
            key={item.name} // unique & stable
            item={{
              id: item.name, // cart-safe unique id
              name: item.name,
              price: item.price,
              img: item.img,
            }}
            onAdd={handleAddItem}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
