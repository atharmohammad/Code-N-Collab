import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Problem from "./Problem.js";
import LeaderBoard from "./LeaderBoard";

const LockoutPanel = (props) => {
  return (
    <>
      <Grid
        container
        direction="column"
        style={{ margin: "5px 5 100px 5px", boxSizing: "border-box" }}
      >
          <Grid
            style={{
              height: "40vh",
              margin: "5px",
              border: "10px 10px 10px 10px #fff",
            }}
          >
            <Problem />
          </Grid>
          <Grid
            style={{
              height: "40vh",
              margin: "5px",
              boxSizing: "border-box",
              boxShadow: "5px 3px 10px 0px black",
            }}
          >
            <LeaderBoard />
          </Grid>
        </Grid>
    </>
  );
};
export default LockoutPanel;
