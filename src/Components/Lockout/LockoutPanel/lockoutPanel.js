import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Problem from "./Problem.js";
import LeaderBoard from './LeaderBoard'

const LockoutPanel = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        style={{ margin: "5px 5 100px 5px", boxSizing: "border-box" }}
      >
        <Grid
          style={{
            margin: "10px",
            background: "#313332",
            border: "2px solid black",
            borderRadius: "10px",
            boxShadow: "0 5px 15px 0px rgba(0,0,0,0.6)",
            boxSizing: "border-box",
          }}
        >
          <Grid
            style={{
              height: "40vh",
              margin: "5px",
              border:'10px 10px 10px 10px #fff',
            }}
          >
            <Problem />
          </Grid>
          <Grid
            style={{
              height: "40vh",
              margin: "5px",
              boxSizing: "border-box",
            }}
           >
           
            <LeaderBoard/>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default LockoutPanel;
