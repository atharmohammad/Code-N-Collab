import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import axios from "../../Axios/axios";
import NavItem from "./NavItems";
import "./NavItem.css";

export default function () {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const loginHandler = async () => {
    try {
      const req = await axios.get("/Oauth/googleOauth");
      window.location.href = req.data;
    } catch (e) {
      alert("Oops something went wrong try again later")
    }
  };
  const logoutHandler = () => {
    history.push("/logout");
  };

  const aboutHandler = () => {
    history.push("/about");
  };

  return (
    <div className="headerss">
      {auth.isLoggedIn === false ? (
        <>
          <NavItem Name="login" clicked={loginHandler} />
        </>
      ) : (
        <>
          <NavItem Name="logout" clicked={logoutHandler} />
        </>
      )}
      <NavItem Name="about" clicked={aboutHandler} />
    </div>
  );
}
