import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";
import classes from "./blogs.module.css";
import axios from "../../Axios/axios";
import Spinner from "../Spinner/BlogSpinner";

const WriterModal = (props) => {
  const { cancelHandler, parentId, fetchData } = { ...props };
  const [body, setBody] = useState("");
  const [spinner, setSpinner] = useState(false);

  const submitHandler = async () => {
    if (!body.trim()) {
      return alert("cant be empty");
    }

    try {
      setSpinner(true);
      await axios.post(`${props.Api}${parentId}`, { Body: body });
      fetchData();
    } catch (e) {
      alert("error Posting!");
      console.log(e);
    }finally{
      setSpinner(false);
      cancelHandler();
    }

  };

  return (
    <>
      <Grid onClick={cancelHandler} className={classes.backdrop}></Grid>
      <Grid className={classes.modal}>
        {spinner ? (
          <Spinner
            headedStyle={{ background: "black" }}
            spinneredStyle={{ borderTop: "1em solid black" }}
          />
        ) : (
          <div style={{ height: "100%", width: "100%" }}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={classes.textArea}
              placeHolder="write something... (Markdown is supported)"
            ></textarea>
            <div className={classes.toolTipGrid}>
              <Tooltip title="cancel" onClick={cancelHandler}>
                <IconButton>
                  <CancelIcon style={{ cursor: "pointer", color: "#fff" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Post" onClick={submitHandler}>
                <IconButton>
                  <SendIcon style={{ cursor: "pointer", color: "#fff" }} />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </Grid>
    </>
  );
};

export default WriterModal;
