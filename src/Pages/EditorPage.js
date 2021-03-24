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
        lg={1}
        style={{ backgroundColor: "#7b298f", height: "650px" }}
        container
        justify="center"
      ></Grid>
      <Grid
        lg={9}
        style={{ backgroundColor: "#262629", height: "650px" }}
        container
        justify="center"
      >
        <Editor />
        <Grid direction="row" container justify="center" alignItems="flex-end">
          <Grid lg={6} style={{ backgroundColor: "#298f3f",height:'120px' }} />
          <Grid lg={6} style={{ backgroundColor: "#a31f23",height:'120px' }} />
        </Grid>
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
