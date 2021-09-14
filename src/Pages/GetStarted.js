import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Box } from "@material-ui/core";
import Title from "../Assets/images/Title.png";
import GetStartedImg from "../Assets/images/GetStarted.png";
import Stars from "../Components/Stars/Stars";
import RoomCount from "../Components/RoomCounts/RoomCounts";

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
      <RoomCount/>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ marginTop: "30vh" }}
      >
        <img
          src={Title}
          style={{ width: "40%", minWidth: "300px" }}
          alt="Code-N-Collab"
        />

        <Box
          style={{
            width: "10%",
            color: "#fff",
            margin: "10vh auto",
            border: "2px solid #fff",
            textAlign: "center",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={homeHandler}
        >
          <img
            src={GetStartedImg}
            style={{ width: "55%", alignSelf: "center", minWidth: "60px" }}
            alt="GetStarted"
          />
        </Box>
      </Grid>
    </div>
  );
}

export default GetStarted;
