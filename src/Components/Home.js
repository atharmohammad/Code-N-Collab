import React from "react";
import { Grid, makeStyles, TextField, Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh", backgroundColor: "#3b362a" }}
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          backgroundColor: "#f2f2f2",
          minHeight: "30vh",
          width: "50vh",
          border: "5px solid black",
          borderRadius: "20px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          style={{
            backgroundColor: "#f2f2f2",
            boxShadow: "0 5px 15px 0px rgba(0,0,0,0.7)",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
          style={{
            backgroundColor: "#f2f2f2",
            boxShadow: "0 5px 15px 0px rgba(0,0,0,0.7)",
            marginTop: "2vh",
          }}
        />
      </Grid>
      <Button
        variant="contained"
        style={{
          backgroundColor: "white",
          color: "#3b362a",
          boxShadow: "0 5px 15px 0px rgba(0,0,0,0.7)",
          marginTop: "2vh",
        }}
      >
        Create Room
      </Button>
    </Grid>
  );
}
