import { Link, NavLink } from "react-router-dom";
import { useOnlineStatus } from "../utils/useOnlineStatus";
import { useState } from "react";
const Header = () => {
  const [login, setLogIn] = useState("Login");
  const isOnline = useOnlineStatus();
  const handleLoginButton = () => {
    setLogIn((prevLogin) => (prevLogin === "Login" ? "Logout" : "Login"));
  };

  return (
    <div className="z-10 flex items-center justify-between px-2 sticky top-0 gap-5 bg-pink-100 text-gray-800 shadow-lg mb-2 font-bold">
      <Link to="/" className="logo" aria-label="Bhojan Bazaar Logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-40"
          viewBox="0 0 100 100"
          width="100"
          height="100"
          fill="currentColor"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#5fad82"
            strokeWidth="3"
            fill="#4CAF50"
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill="currentColor"
            fontSize="20px"
            dy=".3em"
          >
            Bhojan Bazaar
          </text>
        </svg>
      </Link>

      <nav className="navItems">
        <ul className="flex justify-between gap-5 mx-5 list-none text-lg font-bold items-center">
          <li>
            <h2>Online Status: {isOnline ? "✅" : "❌"}</h2>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/restaurants">Restaurants</NavLink>
          </li>
          <li>
            <NavLink to="/about">About us</NavLink>
          </li>
          <li>
            <NavLink to="/grocery">Grocery</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li>
            <button onClick={handleLoginButton}>{login}</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
