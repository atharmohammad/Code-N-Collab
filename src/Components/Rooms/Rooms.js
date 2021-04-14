import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  Button,
  InputLabel
} from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as TYPE from "../../store/Action/action";
import classes from '../../Assets/css/style.module.css'
import styles from './RoomsInput.module.css'


function Rooms(props) {
  const history = useHistory();

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const changeHandler = (type, event) => {
    if (type == "room") setRoom(event.target.value);
    if (type == "name") setName(event.target.value);
  };

  const createRoomHandler = async (e) => {
    try {
      await props.createRoom(room,name);
      history.push("/collaborate?room=" + room + "&name=" + name);
    } catch (err) {
      console.log(err);
    }
  };

  const backHandler = ()=>{
    history.push('/homepage')
  }
  return (
    <Grid
      container
      alignItems="center"
      style={{ minHeight: "100vh", background: "radial-gradient(ellipse, #1B2735 0%, #090A0F 100%)"}}
    >
     <div className={classes.stars} ></div>
     <img style={{margin:'3vh 1vh 1vh 4vh',cursor:'pointer',position:'absolute',top:'0'}}  onClick={backHandler}
     src="data:image/png;base64,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"/>
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        style={{
          backgroundColor: "transparent",
          minHeight: "75vh",
          width: "70vh",
          borderRadius: "20px",
          padding: "8vh",
          border:'5px double #fff',
          margin:"auto"
        }}
      >
        <Grid>
          <InputLabel
            style={{ marginBottom: "2vh", color: "#fff", fontWeight: "bold" }} >
            Username
          </InputLabel>
          <input
            onChange={(event) =>changeHandler('name',event)}
            className={styles.input}
          />
        </Grid>


        <Grid>
          <InputLabel
            style={{ margin: "2vh 0 0 0", color: "#fff", fontWeight: "bold" }}
          >
            Room
          </InputLabel>
          <input
            onChange={(event) =>changeHandler('room',event)}
            className={styles.input}
          />
        </Grid>

        <Grid>
          <InputLabel
            style={{ margin: "2vh 0 0 0", color: "#fff", fontWeight: "bold" }}
          >
            Password
          </InputLabel>
          <input
            className={styles.input}
          />
        </Grid>


        <Button
          variant="contained"
          style={{
            border:'3px solid white',
            borderRadius:'5px',
            background: name == "" || room == "" ? "#7d7574" : "transparent",
            color: "#fff",
            marginTop: "2vh",
            padding: "2vh",
            width: "30vh",
          }}
          onClick={createRoomHandler}
        >
          Join / Create
        </Button>
      </Grid>

    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRoom: (roomName, userName) =>
      dispatch({ type: TYPE.CREATE_ROOM, data: { roomName, userName } }),
  };
};

export default connect(null, mapDispatchToProps)(Rooms);
