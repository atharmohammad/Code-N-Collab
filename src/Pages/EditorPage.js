import React from "react";
import Chat from "../Components/Chat";
import Editor from "../Components/Editor";
import {
  Grid,
  makeStyles,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";

const EditorPage = () => {
  return (
    <Grid direction="row" container justify="center" alignItems="flex-end">
      <Grid
        lg={10}
        style={{ backgroundColor: "red", height: "650px" }}
        container
        justify="center"
      >
        <Editor />
      </Grid>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="stretch"
        lg={2}
        style={{ backgroundColor: "#3b362a", height: "500px" }}
      >
        <Chat />
      </Grid>
    </Grid>
  );
};

export default EditorPage;
