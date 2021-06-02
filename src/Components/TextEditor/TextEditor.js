import React, { useEffect, useState } from "react";
import Editor from "@uiw/react-md-editor";
import { Grid, Box } from "@material-ui/core";
import axios from "../../Axios/axios";
import { connect } from "react-redux";
import * as TYPES from "../../store/Action/action";

function TextEditor(props) {
  const [value, setValue] = useState(props.initialValue);

  const { closeTextEditor, showUpdateBtn } = { ...props };
  const postHandler = async () => {
    alert("posting");
    axios({ method: props.method, url: props.Api, data: { Body: value } })
      .then((res) => {
        try {
          props.blogPosted();
          setValue("");
        } catch (err) {
          console.log(err);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Grid style={{ width: "100%", marginTop: "0px" }}>
      {!showUpdateBtn ? (
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
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
        <Box
          style={{
            width: "40px",
            backgroundColor: "#4169E1",
            borderRadius: "10px",
            padding: "0 5px 0 5px",
            textAlign: "center",
            color: "#fff",
            marginTop: "10px",
            float: "right",
            cursor: "pointer",
          }}
          onClick={postHandler}
        >
          <p>Post</p>
        </Box>
      ) : null}
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    blogPosted: () => {
      dispatch({ type: TYPES.BLOGPOSTED });
    },
  };
};

export default connect(null, mapDispatchToProps)(TextEditor);
