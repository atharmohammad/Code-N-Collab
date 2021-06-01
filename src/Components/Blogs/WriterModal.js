import { useEffect, useState } from "react";
import { Grid, Typography, Tooltip, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";

const WriterModal = (props) => {
  const { cancelHandler, submitHandler } = { ...props };
  return (
    <>
      <Grid
        onClick={props.cancelHandler}
        style={{
          display: "block",
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          background: "rgba(0, 0, 0, 0.3)",
          zIndex: "100",
          cursor: "pointer",
        }}
      ></Grid>
      <Grid
        style={{
          display: "block",
          position: "fixed",
          zIndex: "200",
          top: "63%",
          left: "15%",
          width: "68%",
          height: "35%",
          background: "white",
          boxShadow: "1px 1px 6px rgba(0, 0, 0, 0.4)",
          padding: "1rem",
          borderRadius: "10px",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ height: "100%", width: "100%" }}>
          <textarea
            style={{
              height: "80%",
              width: "99%",
              resize: "none",
              borderRadius: "10px",
              fontSize: "18px",
              Bottom: "10px",
            }}
          ></textarea>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              background: "black",
              borderRadius: "5px",
              height: "15%",
              border: "2px solid grey",
            }}
          >
            <Tooltip title="cancel" onClick={props.cancelHandler}>
              <IconButton>
                <CancelIcon style={{ cursor: "pointer", color: "#fff" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Post">
              <IconButton>
                <SendIcon style={{ cursor: "pointer", color: "#fff" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default WriterModal;
