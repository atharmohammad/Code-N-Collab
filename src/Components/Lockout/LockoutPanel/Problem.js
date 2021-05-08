import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import classes from "./lockout.module.css";
const Problem = () => {
  return (
    <>
      <Grid
        className={classes.anchorContainer}
      >
        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question1"
          target="_blank"
        >
          1500
        </a>

        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question2"
          target="_blank"
        >
          1700
        </a>
        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question3"
          target="_blank"
        >
          1500
        </a>
        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question4"
          target="_blank"
        >
          1600
        </a>
        <a
          className={classes.anchorTag}
          href="https://codeforces.com/problemset/problem/1516/B"
          title="Question5"
          target="_blank"
        >
          1700
        </a>
      </Grid>
    </>
  );
};
export default Problem;
