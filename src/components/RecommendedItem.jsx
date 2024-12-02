import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
const RecommendedItem = ({
  id,
  name,
  price,
  title,
  subTitle,
  rating,
  ratingCountV2,
  description,
  imageId,
  MENU_IMG_URL,
  item,
}) => {
  const initialSrc = `${MENU_IMG_URL}${imageId}`;
  const [imageSrc, setImageSrc] = useState(initialSrc);

  const handleError = () => {
    setImageSrc(imageSrc);
  };

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    //dispatch an action
    dispatch(addItem(item));
    console.log(item);
  };
  return (
    <div key={id} className="recommended-item">
      <div className="menuItem py-3 flex justify-center items-center">
        <div className="menu-item-info w-3/4">
          <div className="menuItemTitle text-gray-800 font-bold">
            {name ? `${name}` : ""}
          </div>
          <>
            <div className="offer flex gap-1 items-center font-bold">
              <span className="itemPrice">
                {price ? `₹${price / 100}` : ""}
              </span>
              <span className="text-xs">{title ? `${title}` : ""}</span>
              <span className="text-xs text-gray-800">
                {subTitle ? `${subTitle}` : ""}
              </span>
            </div>
            <div className="ratings font-bold">
              <span className="avgRating text-green-800">
                {rating ? `${rating}` : ""}
              </span>
              <span className="totalRating text-slate-700">
                {ratingCountV2 ? `(${ratingCountV2})` : ""}
              </span>
            </div>
          </>
          <p className="menuItemDescription text-base text-gray-700 leading-tight w-11/12">
            {description ? `${description}` : ""}
          </p>
        </div>
        <div className="w-1/4 relative">
          <img
            loading="lazy"
            height="144"
            width="256"
            src={imageSrc}
            alt={name}
            onError={handleError}
            className="rounded-2xl"
          />
          <div className="flex flex-col items-center justify-center absolute bottom-0 left-0 w-full ">
            <button
              className="atcButton -bottom-2 text-center text-white bg-black shadow-lg rounded-lg w-1/2 font-bold p-1"
              // onClick={handleAddItem}
              onClick={() => handleAddItem(item)}
            >
              Add +
            </button>
            <span className="customizeText text-xs text-green-600">
              Customisable
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
RecommendedItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  rating: PropTypes.string,
  ratingCountV2: PropTypes.string,
  description: PropTypes.string,
  imageId: PropTypes.string.isRequired,
  MENU_IMG_URL: PropTypes.string.isRequired,
  item: PropTypes.shape({
    info: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      price: PropTypes.number,
      defaultPrice: PropTypes.number,
      description: PropTypes.string,
      imageId: PropTypes.string,
    }),
  }),
};
export default RecommendedItem;
