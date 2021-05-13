import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Problem from "./Problem.js";
import LeaderBoard from "./LeaderBoard";
import Countdown from '../../Coundown/Coundown'


const LockoutPanel = (props) => {
  return (
    <>
    <Countdown initialMinute ={30} initialSeconds ={0} />
      <Grid
        container
        direction="column"
        style={{ margin: "5px 5 100px 5px", boxSizing: "border-box" }}
      >
        
          <Grid
            style={{
              height: "35vh",
              margin: "2px",
              maxHeight:'240px',
              boxSizing:'border_box',
              border: "10px 10px 10px 10px #fff",
            }}
          >
            <Problem />
          </Grid>
          <Grid
            style={{
              height: "33vh",
              margin: "5px",
              boxSizing: "border-box",
            }}
          >
            <LeaderBoard />
          </Grid>
        </Grid>
    </>
  );
};
export default LockoutPanel;
