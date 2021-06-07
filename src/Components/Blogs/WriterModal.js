import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";
import classes from "./blogs.module.css";
import axios from "../../Axios/axios";
import Spinner from "../Spinner/BlogSpinner";

const WriterModal = (props) => {
  const { cancelHandler, parentId } = { ...props };
  const [body, setBody] = useState("");
  const [spinner, setSpinner] = useState(false);

  const submitHandler = async () => {
    try {
      setSpinner(true);
      await axios.post(`${props.Api}${parentId}`, { Body: body });
    } catch (e) {
      alert("error Posting!");
      console.log(e);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <>
      <Grid onClick={props.cancelHandler} className={classes.backdrop}></Grid>
      <Grid className={classes.modal}>
        {spinner ? (
          <Spinner />
        ) : (
          <div style={{ height: "100%", width: "100%" }}>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className={classes.textArea}
            ></textarea>
            <div className={classes.toolTipGrid}>
              <Tooltip title="cancel" onClick={props.cancelHandler}>
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
