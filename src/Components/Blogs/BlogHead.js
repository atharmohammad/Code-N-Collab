import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Collaboration from "../../Assets/images/Collaboration.jpg";
import CodeNCollab from "../../Assets/images/HomePageImg.png";
import classes from "./blogs.module.css";
import Back from "../Back/Back";

export default function BlogHead(props) {

  return (
    <Grid
      container
      justify="space-between"
      direction="row"
      style={{
        minHeight: "7vh",
        backgroundColor: "black",
        width: "100%",
        textAlign: "center",
        paddingBottom: "3%",
      }}
    >
      <div>
        <Back/>
      </div>

      <Grid container direction="row" justify="space-between">
        <Grid
          container
          direction="column"
          justify="center"
          style={{ width: "40%", marginLeft: "15vw" }}
        >
          <img
            src={CodeNCollab}
            style={{
              height: "8vw",
              width: "35vw",
              minWidth: "170px",
              minHeight: "40px",
            }}
            alt="CodeNCollab"
          />
          <Typography className={classes.blogHead_interaction_text}>
            Official Page for Community Interaction and Announcements
          </Typography>
        </Grid>

        <img
          src={Collaboration}
          alt="Collaboration"
          style={{ width: "26%", height: "13vw", marginRight: "3vw" }}
        />
      </Grid>
    </Grid>
  );
}
