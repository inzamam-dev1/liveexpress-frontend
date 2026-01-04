import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { BASE_URL } from "../utils/Fallback";
const Body = () => {
  const [listofres, setlistofres] = useState([]);
  const [filterlist, setliterlist] = useState([]);
  const [seachText, setseachText] = useState("");

  const RestaurantCardPrommoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    const res = await fetch(`${BASE_URL}/restaurants`);
    const data = await res.json();
    setlistofres(data);
    setliterlist(data);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return <h1>No Internet ! Please fix the connnection</h1>;
  }
  if (listofres.length === 0) {
    return <Shimmer />;
  }
  
  return ( 
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={seachText}
            onChange={(e) => {
              setseachText(e.target.value);
            }}
          />
          <button
            className="searchButton"
            onClick={() => {
              const filterRestaurant = listofres.filter((res) =>
                res.resName
                  .toLowerCase()
                  .includes(seachText.toLocaleLowerCase())
              );
              setliterlist(filterRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filtered = listofres.filter((e) => e.star > 4);
            setliterlist(filtered);
          }}
        >
          Top-Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {filterlist.map((res) => (
         
          <Link
            key={res.id}
            to={`/restaurant/${res.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {res.promoted ? (
              <RestaurantCardPrommoted
                resName={res.resName}
                star={res.star}
                img={res.img}
              /> 
            ) : (
              <RestaurantCard
                resName={res.resName}
                star={res.star}
                img={res.img}
              />
            )}
           
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
