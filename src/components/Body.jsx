import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { RestaurantCardShimmer } from "../utils/Shimmer";
import { SWIGGY_API_URL } from "../utils/constants";
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResList();
  }, []);
  // console.log("Body rendered");

  const fetchResList = async () => {
    try {
      const response = await fetch(SWIGGY_API_URL);
      const data = await response.json();
      const restaurants =
        data?.data?.cards[4].card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      // console.log(data);
      if (restaurants) {
        setListOfRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
      } else {
        console.error("Unexpected data structure", data);
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const searchFiltered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurants(searchFiltered);
  };

  const getFilteredList = () => {
    const topRated = listOfRestaurants.filter(
      (res) => res.info.avgRating >= 4.2
    );
    setFilteredRestaurants(topRated);
  };

  return (
    <>
      <div className="flex items-center px-5 bg-pink-200 text-white">
        <div className="flex gap-2">
          <input
            type="text"
            className="px-2 text-black"
            placeholder="Search Restaurant..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyUp={handleSearch}
          />
          <button className="search-button hidden" onClick={handleSearch}>
            Search Restaurant
          </button>
        </div>
        <button className="m-3 rounded-lg bg-pink-400 px-4 py-1" onClick={getFilteredList}>
          Top Rated Restaurant
        </button>
      </div>

      <div className="flex flex-wrap">
        {loading
          ? // Show shimmer placeholders while loading
            Array(10)
              .fill("")
              .map((_, index) => <RestaurantCardShimmer key={index} />)
          : filteredRestaurants?.map((restaurant) => (
              <RestaurantCard key={restaurant?.info?.id} resData={restaurant} />
            ))}
      </div>
    </>
  );
};

export default Body;
