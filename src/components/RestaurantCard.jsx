import { Link } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import PropTypes from "prop-types";

const RestaurantCard = (props) => {
  const { resData = {} } = props;
  const {
    id,
    cloudinaryImageId,
    name,
    cuisines = [],
    avgRating = "N/A",
    costForTwo = "N/A",
    deliveryTime = "N/A",
  } = resData?.info || {};

  return (
    <div
      className="w-[260px] p-4 m-4 rounded-lg bg-slate-100 hover:bg-slate-200"
      id={"restaurantCard-" + id}
    >
      <Link to={`/restaurants/${id}`}>
        <img
          className="w-full h-36 rounded-lg"
          src={CDN_URL + cloudinaryImageId}
          alt={`Image of ${name}`}
        />
        <h3 className="py-4 text-xl font-bold">{name}</h3>
      </Link>
      <h4 className="m-0 min-h-12">{cuisines.join(", ")}</h4>
      <p className="flex justify-between m-0">
        <span>{avgRating}</span>
        <span>{costForTwo}</span>
        <span>{deliveryTime}</span>
      </p>
    </div>
  );
};

RestaurantCard.propTypes = {
  resData: PropTypes.shape({
    info: PropTypes.shape({
      id: PropTypes.string.isRequired,
      cloudinaryImageId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      cuisines: PropTypes.arrayOf(PropTypes.string),
      avgRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      costForTwo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      deliveryTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
  }).isRequired,
};

export default RestaurantCard;
