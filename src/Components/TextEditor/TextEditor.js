import React, { useState } from "react";
import Editor from "@uiw/react-md-editor";
import { Grid, Box } from "@material-ui/core";

import axios from "../../Axios/axios";

function TextEditor(props) {
  const [value, setValue] = useState(props.initialValue);

  const { closeTextEditor, showUpdateBtn } = { ...props };
  const postHandler = async () => {
    try {
      props.postBtnClick();

      await axios({
        method: props.method,
        url: props.Api,
        data: { Body: value },
      });
      props.fetchBlog();
    } catch (e) {
      alert("Fetch blog error! try again!")
    }
  };

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
      ) : null}
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
    </Grid>
  );
}

export default TextEditor;
