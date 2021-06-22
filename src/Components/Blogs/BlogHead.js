import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Collaboration from "../../Assets/images/Collaboration.jpg";
import CodeNCollab from "../../Assets/images/HomePageImg.png";
import classes from "./blogs.module.css";
import Back from "../Back/Back";

export default function BlogHead(props) {
  const history = useHistory();

  const backHandler = () => {
    history.push(props.back);
  };

  return (
    <Grid
      container
      justify="space-between"
      direction="row"
      style={{
        minHeight: "3vw",
        marginTop: "-20px",
        backgroundColor: "black",
        width: "95vw",
        textAlign: "center",
      }}
    >
      <div>
        <Back clicked={backHandler} />
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
              height: "10vw",
              width: "30vw",
              minWidth: "120px",
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
          style={{ width: "35%", height: "15vw", justifySelf: "flex-end" }}
        />
      </Grid>
    </Grid>
  );
}
