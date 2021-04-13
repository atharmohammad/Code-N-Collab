import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  TextField,
  Button,
  InputLabel,
} from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as TYPE from "../store/Action/action";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Rooms(props) {
  const classes = useStyles();
  const history = useHistory();

  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const changeHandler = (event, type) => {
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
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh", backgroundColor: "#1f273d" }}
    >
      <Grid
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        style={{
          backgroundColor: "#f2f2f2",
          minHeight: "65vh",
          width: "60vh",
          borderRadius: "20px",
          padding: "10vh",
        }}
      >
        <Grid>
          <InputLabel
            style={{ marginBottom: "2vh", color: "black", fontWeight: "bold" }}
          >
            Username
          </InputLabel>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            style={{
              backgroundColor: "#f2f2f2",
            }}
            onChange={(event) => changeHandler(event, "name")}
          />
        </Grid>
        <Grid>
          <InputLabel
            style={{ margin: "2vh 0 0 0", color: "black", fontWeight: "bold" }}
          >
            Room
          </InputLabel>
          <TextField
            id="outlined-basic"
            label="Room Name"
            variant="outlined"
            style={{
              backgroundColor: "#f2f2f2",
              marginTop: "2vh",
            }}
            onChange={(event) => changeHandler(event, "room")}
          />
        </Grid>

        <Button
          variant="contained"
          style={{
            backgroundColor: name == "" || room == "" ? "#7d7574" : "#1f273d",
            color: "#fff",
            marginTop: "2vh",
            padding: "2vh",
            width: "30vh",
          }}
          disabled={name == "" || room == ""}
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
