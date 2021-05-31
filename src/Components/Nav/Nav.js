import { useContext } from "react";
import NavItem from "./NavItems";
import "./NavItem.css";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

export default function () {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const signUpHandler = () => {
    history.push("/signup");
  };
  const loginHandler = () => {
    history.push("/login");
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
          <NavItem Name="sign-up" clicked={signUpHandler} />
        </>
      ) : (
        <NavItem Name="logout" clicked={logoutHandler} />
      )}
      <NavItem Name="about" clicked={aboutHandler} />
    </div>
  );
}
