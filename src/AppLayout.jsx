import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <div className="body">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
