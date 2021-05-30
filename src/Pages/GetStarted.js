import React from "react";
import Title from "../Assets/images/Title.png";
import GetStartedImg from "../Assets/images/GetStarted.png";
import { useHistory } from "react-router-dom";
import Stars from "../Components/Stars/Stars"
import { Grid, Box } from "@material-ui/core";
import classes from "../Assets/css/wrapstyle.module.css";


function GetStarted() {
  const history = useHistory();

  const homeHandler = () => {
    history.push("/homepage");
  };

  return (
    <div className={classes.wrap}>
      <Stars color="#fff"/>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <img src={Title} alt="Code-N-Collab" />

        <Box
          style={{
            height: "6vh",
            width: "25vh",
            color: "#fff",
            margin: "10vh auto",
            border: "2px solid #fff",
            textAlign: "center",
            paddingTop: "2vh",
            cursor: "pointer",
          }}
          onClick={homeHandler}
        >
          <img src={GetStartedImg} alt="GetStarted" />
        </Box>
      </Grid>
    </div>
  );
}

export default GetStarted;
