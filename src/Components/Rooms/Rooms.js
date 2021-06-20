import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { Grid, Button, InputLabel } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Stars from "../Stars/Stars";
import styles from "./RoomsInput.module.css";
import roundStart from "../../Assets/sound-effects/RoundStart.mp3";
import CreateRoom from "../../Assets/images/create_room.png";
import Back from "../Back/Back";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Rooms(props) {
  const history = useHistory();
  const [play] = useSound(roundStart);
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
    if (searchParams.has("room") && searchParams.get("room")) {
      setRoom(searchParams.get("room").trim());
    } else {
      const roomId = uuidv4();
      setRoom(roomId);
    }
  }, [location]);

  const changeHandler = (type, event) => {
    if (type == "room") setRoom(event.target.value);
    if (type == "name") setName(event.target.value);
    if (type == "password") setPassword(event.target.value);
  };

  const createRoomHandler = async (e) => {
    try {
      play();
      history.push({
        pathname: "/collaborate",
        search: "?room=" + room + "&name=" + name,
        state: { password },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const backHandler = () => {
    history.push("/homepage");
  };
  return (
    <Grid
      container
      style={{
        height: "100vh",
        background: "radial-gradient(ellipse, #1B2735 0%, #090A0F 100%)",
        overflow: "hidden",
      }}
    >
      <Stars color="#fff" />
      <Back clicked={backHandler} />
      <Grid container direction="column" justify="center" alignItems="center">
        <img src={CreateRoom} alt="create-room" />

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
            border: "5px double #fff",
            margin: "4vh auto",
          }}
        >
          <Grid>
            <InputLabel
              style={{ marginBottom: "2vh", color: "#fff", fontWeight: "bold" }}
            >
              Username
            </InputLabel>
            <input
              onChange={(event) => changeHandler("name", event)}
              className={styles.input}
            />
          </Grid>

          <Grid>
            <input
              value={room}
              type="hidden"
              onChange={(event) => changeHandler("room", event)}
              className={styles.input}
            />
          </Grid>

          <Grid>
            <InputLabel style={{ color: "#fff", fontWeight: "bold" }}>
              Password
            </InputLabel>
            <input
              type="password"
              className={styles.input}
              onChange={(event) => changeHandler("password", event)}
            />
          </Grid>

          <Button
            variant="contained"
            style={{
              border: "3px solid white",
              borderRadius: "5px",
              background: name == "" || room == "" ? "#7d7574" : "transparent",
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
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Rooms;
