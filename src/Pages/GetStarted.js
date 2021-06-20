import React from "react";
import Title from "../Assets/images/Title.png";
import GetStartedImg from "../Assets/images/GetStarted.png";
import { useHistory } from "react-router-dom";
import Stars from "../Components/Stars/Stars";
import { Grid, Box } from "@material-ui/core";


function GetStarted() {
  const history = useHistory();

  const homeHandler = () => {
    history.push("/homepage");
  };

  return (
    <div
      style={{
        height: "100vh",
        boxSizing: "border-box",
        background: "radial-gradient(ellipse, #1b2735 0%, #090a0f 100%)",
      }}
    >
      <Stars color="#fff" />
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ marginTop: "35vh" }}
      >
        <img src={Title} style={{ width: "65vw" }} alt="Code-N-Collab" />

        <Box
          style={{
            minHeight: "50px",
            width: "25vh",
            color: "#fff",
            margin: "10vh auto",
            border: "2px solid #fff",
            textAlign: "center",
            paddingTop: "5px",
            cursor: "pointer",
          }}
          onClick={homeHandler}
        >
          <img src={GetStartedImg} style={{ width: "55%" }} alt="GetStarted" />
        </Box>
      </Grid>
    </div>
  );
}

export default GetStarted;
