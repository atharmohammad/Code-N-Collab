import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { Grid, Button, InputLabel } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Stars from "../Stars/Stars";
import styles from "./RoomsInput.module.css";
import CreateRoom from "../../Assets/images/create_room.png";
import Back from "../Back/Back";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Rooms(props) {
  const history = useHistory();
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (location.state && location.state.error) {
      setError(location.state.error);
    }

    const searchParams = new URLSearchParams(location.search);
    if (
      searchParams.has("room") &&
      searchParams.get("room") &&
      searchParams.get("room").toLowerCase().endsWith("collab")
    ) {
      setRoom(searchParams.get("room").trim());
    } else {
      const roomId = uuidv4() + "collab";
      setRoom(roomId);
    }
  }, [location]);

  const changeHandler = (type, event) => {
    if (type == "room") setRoom(event.target.value);
    if (type == "name") setName(event.target.value.trim());
    if (type == "password") setPassword(event.target.value);
  };

  const createRoomHandler = async (e) => {
    if(!name || !name.trim()){
      return setError('Invalid name');
    }

    try {
      history.push({
        pathname: "/collaborate",
        search: "?room=" + room + "&name=" + name,
        state: { password },
      });
    } catch (err) {
      alert("History push error!  try again!")
    }
  };

  return (
    <div className={styles.main}>
      <Stars color="#fff" />
      <Back/>
      <Grid container direction="column" justify="center" alignItems="center">
        <img className={styles.img} src={CreateRoom} alt="create-room" />

        <div className={styles.inputContainer}>
          <div>
            <InputLabel style={{ color: "#fff", fontWeight: "bold" }}>
              Username
            </InputLabel>
            <input
              onChange={(event) => changeHandler("name", event)}
              className={styles.input}
            />
          </div>

          <div>
            <input
              value={room}
              type="hidden"
              onChange={(event) => changeHandler("room", event)}
              className={styles.input}
            />
          </div>

          <div>
            <InputLabel style={{ color: "#fff", fontWeight: "bold" }}>
              Password
            </InputLabel>
            <input
              type="password"
              className={styles.input}
              onChange={(event) => changeHandler("password", event)}
            />
          </div>

          <Button
            variant="contained"
            style={{
              alignSelf: "center",
              border: "3px solid white",
              borderRadius: "5px",
              background: name && room ?"transparent" : "#7d7574" ,
              color: "#fff",
              marginTop: "2vh",
              padding: "2vh",
              width: "12vw",
              minWidth: "120px",
            }}
            disabled={name == "" || room == ""}
            onClick={createRoomHandler}
          >
            Join / Create
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={error !== null}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert onClose={() => setError(null)} severity="error">
              {error}
            </Alert>
          </Snackbar>
        </div>
      </Grid>
    </div>
  );
}

export default Rooms;
