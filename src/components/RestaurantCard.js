const RestaurantCard = (props) => {
  const { resName, star, img, promoted } = props;
  
  return (
    <div className="res-card">
      <img
        alt=""
        style={{ width: "200px", borderRadius: "10px" }}
        src={img}
      ></img>
      <h3>{resName}</h3>
      <h3>⭐{star}</h3>
      <h3>30 min</h3>
    </div>
  );
};

// create a higher order function
// input reacturant card => resturantcardpromoted
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="Promoted_label">Promoted</label>
        <RestaurantCard {...props}/>
      </div>
    )
  };
};
export default RestaurantCard;
