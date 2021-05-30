import React, { useEffect, useState } from "react";
import Editor from "@uiw/react-md-editor";
import { Grid, Box } from "@material-ui/core";
import axios from "../../Axios/axios";
import { connect } from "react-redux";
import * as TYPES from "../../store/Action/action";

function TextEditor(props) {
  const [value, setValue] = useState(props.initialValue);
  const postHandler = async () => {
    axios({ method : props.method , url : props.Api, data:{ Body: value } })
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
    <Grid style={{ width: "100vh", marginTop: "10vh" }}>
      <Editor height={300} value={value} onChange={setValue} />
      <Box
        style={{
          minWidth: "15px",
          backgroundColor: "#4169E1",
          borderRadius: "10px",
          padding: "0 5px 0 5px",
          textAlign: "center",
          color: "#fff",
          marginTop: "1vh",
          float: "right",
          cursor: "pointer",
        }}
        onClick={postHandler}
      >
        {props.method === "patch" ? <p>Update</p> : <p>Post</p>}
      </Box>
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
