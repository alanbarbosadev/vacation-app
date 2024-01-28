import Router from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootswatch/dist/lux/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import NavBar from "./pages/Layout/NavBar";
import Footer from "./pages/Layout/Footer";
import { useState, createContext } from "react";
import LoginContext from "./services/logincontext";
import { getUserAuthenticated } from "./services/auth";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(
    getUserAuthenticated() ? true : false
  );
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <>
      <LoginContext.Provider value={{ isLoggedIn, handleLoginSuccess }}>
        <NavBar />
        <div className="p-5">
          <Router />
        </div>
        <Footer />
      </LoginContext.Provider>
    </>
  );
}

export default App;
