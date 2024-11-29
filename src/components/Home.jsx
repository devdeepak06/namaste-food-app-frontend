import { useEffect, useState } from "react";
import { RestaurantCardShimmer } from "../utils/Shimmer";
import {
  HOME_IMG_URL,
  CDN_URL,
  // RES_CARD_API,
  SWIGGY_API_URL,
} from "../utils/constants";
import Slider from "react-slick";
import SampleArrow from "./SampleArrow";
import { Link } from "react-router-dom";
// import resList from "../utils/MOCK_DATA";

const Home = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <SampleArrow direction="next" />,
    prevArrow: <SampleArrow direction="prev" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  const settings1 = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleArrow direction="next" />,
    prevArrow: <SampleArrow direction="prev" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  useEffect(() => {
    fetchResList();
  }, []);
  const fetchResList = async () => {
    try {
      // const response = await fetch(RES_CARD_API);
      const response = await fetch(SWIGGY_API_URL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
      });
      const json = await response.json();
      const data = json?.data?.cards;
      // const data = resList;
      if (data) {
        setCardsData(data);
      } else {
        console.error("Unexpected data structure", data);
      }
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(cardsData[0]?.card?.card);
  const info = cardsData[0]?.card?.card?.gridElements?.infoWithStyle?.info;
  const topResInfo =
    cardsData[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  const topResTitle = cardsData[2]?.card?.card?.title;
  // console.log(cardsData);

  return (
    <div className="w-5/6 m-auto">
      {/* What's on your mind? */}
      <div className="m-auto border-b border-solid">
        <h3 className="text-2xl font-bold my-4">
          {cardsData[0]?.card?.card?.header?.title}
        </h3>
        <Slider {...settings}>
          {loading
            ? // Show shimmer placeholders while loading
              Array(10)
                .fill("")
                .map((_, index) => <RestaurantCardShimmer key={index} />)
            : info?.map((restaurant) => (
                <div className="m-auto" key={restaurant?.id}>
                  <img
                    className="m-auto"
                    width={180}
                    height={180}
                    src={`${HOME_IMG_URL}${restaurant?.imageId}`}
                  />
                </div>
              ))}
        </Slider>
      </div>
      {/* Top restaurant chains in Noida 1 */}
      <div className="m-auto border-b border-solid">
        <h3 className="text-2xl font-bold my-4">
          {cardsData[1]?.card?.card?.header?.title}
        </h3>
        <Slider {...settings1}>
          {loading
            ? // Show shimmer placeholders while loading
              Array(10)
                .fill("")
                .map((_, index) => <RestaurantCardShimmer key={index} />)
            : topResInfo?.map((restaurant) => (
                <div className="" key={restaurant?.info?.id}>
                  <div className="m-auto mx-4 relative">
                    <Link to={`/restaurants/${restaurant?.info?.id}`}>
                      <img
                        className="m-auto relative rounded-2xl h-[182px] w-full object-cover"
                        src={`${CDN_URL}${restaurant?.info?.cloudinaryImageId}`}
                        alt="Restaurant"
                      />
                    </Link>
                    <p className="absolute text-white bottom-0 left-0 right-0 h-16 px-3 pb-3 grid items-end bg-text-bg rounded-bl-2xl rounded-br-2xl font-bold text-xl">
                      {`${restaurant?.info?.aggregatedDiscountInfoV3?.header} ${restaurant?.info?.aggregatedDiscountInfoV3?.subHeader}`}
                    </p>
                  </div>
                  <div className="mx-4 my-2">
                    <Link to={`/restaurants/${restaurant?.info?.id}`}>
                      <p className="font-bold text-xl">
                        {restaurant?.info?.name}
                      </p>
                    </Link>
                    <p className="font-bold text-lg">
                      {restaurant?.info?.avgRatingString}
                      <span className="mx-2 text-gray-500">•</span>
                      <span>{restaurant?.info?.sla?.slaString}</span>
                    </p>
                    <p className="text-gray-600 flex flex-wrap">
                      {restaurant?.info?.cuisines.join(", ")}
                    </p>
                    <p className="text-gray-600">
                      {restaurant?.info?.areaName}
                    </p>
                  </div>
                </div>
              ))}
        </Slider>
      </div>

      {/* "popular_restaurants_title" */}
      <div className="m-auto border-b border-solid">
        <h3 className="text-2xl font-bold my-4">{topResTitle}</h3>
      </div>
    </div>
  );
};

export default Home;
