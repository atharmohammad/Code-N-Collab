import React, { useState } from "react";
import Editor from "@uiw/react-md-editor";
import { Grid, Box } from "@material-ui/core";
import Snacker from "../Snacker/Snaker";
import axios from "../../Axios/axios";
import BlogSpinner from "../Spinner/BlogSpinner";

function TextEditor(props) {
  const [value, setValue] = useState(props.initialValue);
  const [msg, setMsg] = useState(null);
  const [requesting, setRequesting] = useState(false);

  const { closeTextEditor, showUpdateBtn } = { ...props };

  const postHandler = async () => {
    if (!value || !value.trim()) return setMsg("Blog can't be empty");
    setRequesting(true);
    try {
      await axios({
        method: props.method,
        url: props.Api,
        data: { Body: value },
      });
      props.fetchBlog();
      props.postBtnClick(true);
    } catch (e) {
      setMsg("Oops something went wrong try again later!");
    }
    setRequesting(false);
  };

  if (requesting) return <BlogSpinner />;
  return (
    <Grid style={{ width: "100%", marginTop: "0px" }}>
      {!showUpdateBtn ? (
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            marginTop: "-10px",
            marginBottom: "5px",
          }}
        >
          <Box
            style={{
              width: "80px",
              background: "#900606",
              borderRadius: "10px",
              padding: "0 5px 0 5px",
              textAlign: "center",
              height: "40px",
              color: "#fff",
              cursor: "pointer",
              margin: "3px",
            }}
            onClick={closeTextEditor}
          >
            Cancel
          </Box>
          <Box
            style={{
              width: "80px",
              height: "40px",
              background: "#4169E1",
              borderRadius: "10px",
              padding: "0 5px 0 5px",
              textAlign: "center",
              color: "#fff",
              cursor: "pointer",
              margin: "3px",
            }}
            onClick={postHandler}
          >
            Update
          </Box>
        </Grid>
      ) : (
        <div style={{display:'flex',justifyContent:'flex-end'}}>
          <Box
            style={{
              width: "20px",
              height: "20px",
              background: "#d82828",
              borderRadius: "5px",
              padding: "0 5px 0 5px",
              textAlign: "center",
              color: "#fff",
              float: "right",
              cursor: "pointer",
              textAlign: "center",
              fontSize: "15px",
              border: "2px solid #fff",
              marginBottom:'20px'
            }}
            onClick={props.clickingX}
          >
            X
          </Box>
        </div>
      )}
      <Editor
        height={300}
        value={value}
        onChange={setValue}
        style={{ padding: "5px" }}
      />
      {showUpdateBtn ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box
            style={{
              width: "100%",
              backgroundColor: "#4169E1",
              borderRadius: "10px",
              height: "35px",
              textAlign: "center",

              color: "#fff",
              marginTop: "10px",
              float: "right",
              cursor: "pointer",
              alignItems: "center",
              fontSize: "20px",
              boxSizing: "border-box",
              border: "2px solid #fff",
            }}
            onClick={postHandler}
          >
            Post
          </Box>
        </div>
      ) : null}
      <Snacker
        open={msg !== null}
        severity="error"
        timer={6000}
        message={msg}
        onClose={() => setMsg(null)}
      />
    </Grid>
  );
}

export default TextEditor;
