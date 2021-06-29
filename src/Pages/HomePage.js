import React, { useEffect, useContext, useState } from "react";
import { v4 as uuid } from "uuid";
import { Grid } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import HomePageImg from "../Assets/images/HomePageImg.png";
import Button from "../Components/HomePageButtons/Buttons";
import Stars from "../Components/Stars/Stars";
import Nav from "../Components/Nav/Nav";
import Back from "../Components/Back/Back";
import axios from "../Axios/axios";
import Spinner from "../Components/Spinner/BlogSpinner";
import { AuthContext } from "../context/auth-context";
import Snacker from "../Components/Snacker/Snaker";

function HomePage() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const auth = useContext(AuthContext);
  const [startSpinner, setSpinner] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fn = async () => {
      if (searchParams.get("code")) {
        const code = searchParams.get("code");

        let data;

        try {
          setSpinner(true);
          data = await axios.post("/Oauth/authenticated", { code: code });
          auth.login(data.data.user, data.data.token);
          if (data.data.Way === "signup") {
            history.push("/updateUser");
          } else {
            history.push("/homepage");
          }
        } catch (e) {
          setError("Oops something went wrong try again later!");
        }
        setSpinner(false);
      }

      if (location.state && location.state.error) {
        setError(location.state.error);
      }
    };
    fn();
  }, []);

  const roomHandler = () => {
    history.push("/rooms");
  };

  const blogHandler = () => {
    history.push("/blogs");
  };

  const profileHandler = () => {
    if (auth.token) {
      return history.push("/me");
    }
    setError("Login Required !");
  };

  const contestHandler = () => {
    if (auth.token) {
      const room = uuid() + "contest";
      history.push({
        pathname: "/newContest",
        search: "?room=" + room,
      });
    }
    setError("Login Required !");
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
        }}
      >
        <Stars color="#fff" />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Back />
          <Nav />
        </div>
        {startSpinner ? (
          <Spinner />
        ) : (
          <>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{
                minHeight: "80vh",
                boxSizing: "border-box",
              }}
            >
              <img
                src={HomePageImg}
                style={{
                  marginBottom: "5vh",
                  width: "45vw",
                  maxWidth: "500px",
                  minWidth: "300px",
                }}
              />

              <Button name="Code - Editor" clicked={roomHandler} />
              <Button name="LockOut - Championship" clicked={contestHandler} />
              <Button name="Blogs" clicked={blogHandler} />
              <Button name="Profile" clicked={profileHandler} />
            </Grid>
          </>
        )}
      </div>
      <Snacker
        open={error !== null}
        severity="error"
        timer={6000}
        message={error}
        onClose={() => setError(null)}
      />
    </>
  );
}

export default HomePage;
