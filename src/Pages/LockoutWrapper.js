import { useEffect, useContext, useState } from "react";
import socketio from "socket.io-client";
import LockoutPage from "./LockoutPage";
import { useHistory, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

export default function LockoutWrapper(props) {
  const socket = socketio.connect(process.env.REACT_APP_BASE_URL);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [valid, setValid] = useState(false);
  const location = useLocation();

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (!searchParams.get("room") || searchParams.get("room").trim === "") {
      return history.push({
        pathname: "/homepage",
      });
    }

    if (!auth.token) {
      return history.push({
        pathname: "/homepage",
        state: { error: "Login required !" },
      });
    }
    
    if (auth.user.CodeforcesHandle == null) {
      return history.push({
        pathname: "/homepage",
        state: { error: "codeforces handle required (Update Profile) !" },
      });
    }

    try {
      if (!searchParams.get("room").toLowerCase().endsWith("contest")) {
        return history.push({
          pathname: "/homepage",
          state: { error: "Invalid room" },
        });
      }
    
    } catch (e) {
      return history.push({
        pathname: "/homepage",
        state: { error: "Invalid request" },
      });
    }

    setValid(true);
  }, []);

  if (!valid) {
    return <></>;
  }

  return <LockoutPage socket={socket} />;
}
