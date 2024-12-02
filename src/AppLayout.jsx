import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { useEffect, useState } from "react";
import UserContext from "./utils/UserContext";
const AppLayout = () => {
  const [userName, setUserName] = useState();

  //authentication
  useEffect(() => {
    // Make an API call and send username and password
    const data = {
      name: "Deepak Kumar",
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <main>
            <div className="body">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

export default AppLayout;
