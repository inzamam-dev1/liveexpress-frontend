import { FALLBACK_IMG } from "./Fallback";
const MenuItem = ({ item, onAdd }) => {

 
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
        {onAdd && (
          <button className="add-btn" onClick={() => onAdd(item)}>
            ADD
          </button>
        )}
        <img src={item.img} onError={(e)=>{e.currentTarget.onerror = null;
          e.currentTarget.src = FALLBACK_IMG;
        }} alt={item.name} />
      </div>
    </div>
  );
};

export default MenuItem;
