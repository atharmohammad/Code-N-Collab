import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import axios from "../Axios/axios";
import Spinner from "../Components/Spinner/BlogSpinner";
import Stars from "../Components/Stars/Stars";

const Logout = (props) => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  
  useEffect(async () => {
    try {
      await axios.get("/user/logout");
    } catch (e) {
      console.log(e);
    } finally {
      auth.logout();
      history.push("/homepage");
    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
      }}
    >
      <Stars />
      <Spinner />
    </div>
  );
};

export default Logout;
