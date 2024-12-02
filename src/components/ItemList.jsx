import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL } from "../utils/constants";
import PropTypes from "prop-types";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  // Debugging: Log items to inspect their structure
  console.log("Items:", items);
  return (
    <div>
      {items && items.length > 0 ? (
        items.map((item) => {
          const info = item?.info; // Use optional chaining
          if (!info) {
            return null; // Skip rendering if info is missing
          }

          const { id, name, price, defaultPrice, description, imageId } = info;

          return (
            <div
              data-testid="foodItems"
              key={id}
              className="p-2 m-2 border-b-2 border-gray-200 text-left flex justify-between"
            >
              <div className="w-9/12">
                <div className="py-2">
                  <span>{name || "Unknown Item"}</span>
                  <span>
                    - ₹{price ? price / 100 : defaultPrice / 100 || "N/A"}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {description || "No description available"}
                </p>
              </div>
              <div className="w-3/12 p-4 flex flex-col items-center">
                <img
                  src={imageId ? CDN_URL + imageId : "/placeholder.png"}
                  alt={name || "Item Image"}
                  className="w-full mb-2"
                />
                <button
                  className="p-2 rounded-lg bg-black text-white shadow-lg"
                  onClick={() => handleAddItem(item)}
                >
                  Add +
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      card: PropTypes.shape({
        info: PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          name: PropTypes.string,
          price: PropTypes.number,
          defaultPrice: PropTypes.number,
          description: PropTypes.string,
          imageId: PropTypes.string,
        }),
      }),
    })
  ),
};

export default ItemList;
