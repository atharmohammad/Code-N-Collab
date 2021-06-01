import Collaboration from "../../Assets/images/Collaboration.jpg";
import CodeNCollab from "../../Assets/images/HomePageImg.png";
import { Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Back from "../Back/Back";

export default function BlogHead(props) {
  const history = useHistory();

  const backHandler = () => {
    history.push(props.back);
  };

  return (
    <Grid
      container
      justify="space-around"
      direction="row"
      style={{
        minHeight: "35vh",
        backgroundColor: "black",
        width: "100%",
        textAlign: "center",
        border:"2px solid black"
      }}
    >
    <div>
      <Back clicked={backHandler} />
    </div>
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: "50%", marginLeft: "15vh" }}
      >
        <img
          src={CodeNCollab}
          style={{ height: "10vh", width: "60vh" }}
          alt="CodeNCollab"
        />
        <Typography style={{ color:'#fff', marginTop: "5vh", width: "60vh" , fontWeight:"bold" }}>
          {" "}
          Official Page for Community Interaction and Announcements
        </Typography>
      </Grid>
      <img src={Collaboration} alt="Collaboration" style={{ height: "35vh" }} />
    </Grid>
  );
}
