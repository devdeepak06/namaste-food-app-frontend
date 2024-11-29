import { useEffect, useState } from "react";
import { SWIGGY_MENU_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchResMenu = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${SWIGGY_MENU_URL}${resId}`);
        const data = await response.json();
        // console.log(data);
        if (isMounted) {
          setResInfo(data?.data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError("Failed to fetch restaurant menu");
        }
        console.error("Failed to fetch restaurant menu:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (resId) {
      fetchResMenu();
    }

    return () => {
      isMounted = false;
    };
  }, [resId]);

  return { resInfo, loading, error };
};

export default useRestaurantMenu;
