import React from "react";
import Chat from "../Components/Chat";
import Editor from "../Components/Editor/Editor";
import IO from "../Components/IO/IO";
import Problem from '../Components/Problem/Problem';

import {
  Grid,
  makeStyles,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";

const EditorPage = () => {
  return (
   <Grid style={{display:'flex',minHeight:'100vh',overflow:'hidden'}}>
        <Problem/>
        <Grid style={{display:'flex' , flexFlow:'column-reverse',width:'100%',overflow:'hidden',backgroundColor:'#1f273d'}}>
          <IO/>
          <Editor />
        </Grid>
        <Chat />
    </Grid>
  );
};

export default EditorPage;
