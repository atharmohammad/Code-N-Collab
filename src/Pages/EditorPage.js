import React from "react";
import Chat from "../Components/Chat";
import Editor from "../Components/Editor";
import Toolbar from '../Components/Toolbar';
import IO from "../Components/IO";
import Problem from '../Components/Problem';

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
        <Grid style={{display:'flex' , flexFlow:'column-reverse',width:'100%',overflow:'hidden'}}>
          <IO/>
          <Editor />
        </Grid>
        <Chat />
    </Grid>
  );
};

export default EditorPage;
