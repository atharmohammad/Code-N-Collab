import React,{useEffect} from "react";
import HomePageImg from "../Assets/images/HomePageImg.png";
import { useHistory,useLocation } from "react-router-dom";
import classes from "../Assets/css/style.module.css";
import Button from "../Components/HomePageButtons/Buttons";
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";

function HomePage() {
  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    if(location.state){
      alert(location.state.error);
    }
  },[])

  const roomHandler = () => {
    history.push("/rooms");
  };

  const homePageHandler = () => {
    history.push("/");
  };

  const blogHandler = () => {
    history.push("/blogs");
  };

  const contestHandler = ()=>{
    const room = uuidv4();
    history.push({
      pathname:"/newContest",
      search:"?room="+room,
      state:{Name:"Athar"}
    });
  }

  return (
    <div className={classes.wrap}>
      <div className={classes.stars} />
      <img
        style={{ margin: "3vh 1vh 1vh 4vh", cursor: "pointer" }}
        onClick={homePageHandler}
        src="data:image/png;base64,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"
      />
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
        <Button name="LockOut - Championship" clicked={contestHandler}/>
        <Button name="Blogs" clicked={blogHandler} />
        <Button name="Profile" />
      </Grid>
    </div>
  );
}

export default HomePage;
