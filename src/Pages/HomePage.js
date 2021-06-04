import React, { useEffect, useContext } from "react";
import HomePageImg from "../Assets/images/HomePageImg.png";
import { useHistory, useLocation } from "react-router-dom";
import classes from "../Assets/css/wrapstyle.module.css";
import Button from "../Components/HomePageButtons/Buttons";
import { Grid } from "@material-ui/core";
import Stars from "../Components/Stars/Stars";
import { v1 as uuidv1 } from "uuid";
import Nav from "../Components/Nav/Nav";
import Back from "../Components/Back/Back";
import axios from "../Axios/axios";
import { AuthContext } from "../context/auth-context";
function HomePage() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const auth = useContext(AuthContext);

  useEffect(async () => {
    if (searchParams.get("code")) {
      const code = searchParams.get("code");

      let data;

      try {
        data = await axios.post("/Oauth/authenticated", { code: code });
        auth.login(data.data.user, data.data.token);
      } catch (e) {
        console.log("error", e);
      }
    }
    // if(location.state){
    //   alert(location.state.error);
    // }
  }, []);

  const roomHandler = () => {
    history.push("/rooms");
  };

  const homePageHandler = () => {
    history.push("/");
  };

  const blogHandler = () => {
    history.push("/blogs");
  };

  const profileHandler = () => {
    if (!auth.token) {
      return history.push("/me");
    }
    history.push("/login");
  };

  const contestHandler = () => {
    const room = uuidv1();
    history.push({
      pathname: "/newContest",
      search: "?room=" + room,
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
      }}
    >
      <Stars color="#fff" />
      <Back clicked={homePageHandler} />
      <Nav />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <img
          src={HomePageImg}
          alt="Code-N-Collab"
          style={{ marginBottom: "5vh" }}
        />
        <Button name="Code - Editor" clicked={roomHandler} />
        <Button name="LockOut - Championship" clicked={contestHandler} />
        <Button name="Blogs" clicked={blogHandler} />
        <Button name="Profile" clicked={profileHandler} />
      </Grid>
    </div>
  );
}

export default HomePage;
