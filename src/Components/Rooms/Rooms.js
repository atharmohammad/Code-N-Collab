import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useHistory, useLocation } from "react-router-dom";
import { Grid, Button, InputLabel } from "@material-ui/core";


import Snacker from '../Snacker/Snaker'
import Stars from "../Stars/Stars";
import styles from "./RoomsInput.module.css";
import CreateRoom from "../../Assets/images/create_room.png";
import JoinRoom from "../../Assets/images/JoinRoom.png";
import Back from "../Back/Back";
import HomeIcon from "../Home/Home"
import Nav from "../Nav/Nav"

function Rooms(props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const history = useHistory();
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [roomHeadingType, setRoomHeadingType] = useState(1);

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
      setRoomHeadingType(2);
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
    if (!name || !name.trim()) {
      return setError("Invalid name");
    }

    try {
      history.push({
        pathname: "/collaborate",
        search: "?room=" + room + "&name=" + name,
        state: { password },
      });
    } catch (err) {
      setError("Oops something went wrong try again later!");
    }
  };

  return (
    <div className={styles.main}>
      <Stars color="#fff" />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", position: "sticky" }}>
          <Back />
          <HomeIcon />
        </div>
        <Nav />
      </div>
      <Grid container direction="column" justify="center" alignItems="center">
        {roomHeadingType === 1 ? (
          <img className={styles.img} src={CreateRoom} alt="create-room" />
        ) : (
          <img className={styles.img} src={JoinRoom} alt="join-room" />
        )}
        <div className={styles.inputContainer}>
          <div>
            <InputLabel style={{ color: "#fff", fontWeight: "bold" }}>
              * Choose a Unique Name
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
              Password {roomHeadingType == 1 ? "(Optional)" : null}
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
              background: name && room ? "transparent" : "#7d7574",
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
        </div>
      </Grid>
      <Snacker
        open={error !== null}
        severity="error"
        timer={6000}
        message={error}
        onClose={() => setError(null)}
      />
    </div>
  );
}

export default Rooms;
